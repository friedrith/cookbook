import * as admin from 'firebase-admin'

import Link from '../models/Link'

const COLLECTION_PATH = 'server/saving-data/cookbook/links'

export const insert = async (link: Link) => {
  const ref = admin.database().ref(COLLECTION_PATH).child(link.id)

  ref.set(link)
}

export const getOne = async (url: string): Promise<Link> =>
  new Promise((resolve, reject) => {
    try {
      const ref = admin.database().ref(COLLECTION_PATH).child(url)

      ref.once(
        'value',
        snapshot => {
          const link = snapshot.val()
          if (!link) {
            console.log('no link')
            reject('no link')
            return
          }
          resolve({
            id: link.id,
            ownerId: link.ownerId,
            recipeId: link.recipeId,
            createdAt: link.createdAt,
          })
        },
        errorObject => {
          reject(errorObject)
        },
      )
    } catch (err: any) {
      reject(err)
    }
  })
