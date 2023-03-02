import * as path from 'path'
import { tmpdir } from 'os'
import { spawn } from 'child-process-promise'
import { unlinkSync } from 'fs'

import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import express from 'express'
import cors from 'cors'
import * as bodyParser from 'body-parser'

import * as recipes from './recipes/routes-config'
import * as officialWebsites from './officialWebsites/routes-config'
import * as links from './links/routes-config'

admin.initializeApp()

const app = express()
app.use(bodyParser.json())
app.use(cors({ origin: true }))

recipes.routesConfig(app)
officialWebsites.routesConfig(app)
links.routesConfig(app)

export const api = functions.https.onRequest(app)

// https://firebase.google.com/docs/storage/extend-with-functions
export const generateThumbnail = functions.storage
  .object()
  .onFinalize(async object => {
    console.log('generating thumbnail...')
    const fileBucket = object.bucket // The Storage bucket that contains the file.
    const filePath = object.name || '' // File path in the bucket.
    const contentType = object.contentType || '' // File content type.

    // Exit if this is triggered on a file that is not an image.
    if (!contentType.startsWith('image/')) {
      return functions.logger.log('This is not an image.')
    }

    // Get the file name.
    const fileName = path.basename(filePath)
    // Exit if the image is already a thumbnail.
    if (fileName.startsWith('thumb_')) {
      return functions.logger.log('Already a Thumbnail.')
    }

    // Download file from bucket.
    const bucket = admin.storage().bucket(fileBucket)
    const tempFilePath = path.join(tmpdir(), fileName)
    const metadata = {
      contentType: contentType,
    }

    await bucket.file(filePath).download({ destination: tempFilePath })
    functions.logger.log('Image downloaded locally to', tempFilePath)
    // Generate a thumbnail using ImageMagick.
    await spawn('convert', [
      tempFilePath,
      '-thumbnail',
      '500x500>',
      tempFilePath,
    ])
    functions.logger.log('Thumbnail created at', tempFilePath)
    // We add a 'thumb_' prefix to thumbnails file name. That's where we'll upload the thumbnail.
    const thumbFileName = `thumb_${fileName}`
    const thumbFilePath = path.join(path.dirname(filePath), thumbFileName)
    // Uploading the thumbnail.
    await bucket.upload(tempFilePath, {
      destination: thumbFilePath,
      metadata: metadata,
    })
    // Once the thumbnail has been uploaded delete the local file to free up disk space.
    return unlinkSync(tempFilePath)
  })
