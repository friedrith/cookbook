import PDFDocument from 'pdfkit'
import blobStream from 'blob-stream'

import Recipe from 'models/Recipe'

export const generatePdf = (recipe: Recipe) =>
  new Promise(resolve => {
    const doc = new PDFDocument()

    const stream = doc.pipe(blobStream())

    // add your content to the document here, as usual

    // get a blob when you're done
    doc.end()
    stream.on('finish', function () {
      // get a blob you can do whatever you like with
      const blob = stream.toBlob('application/pdf')

      resolve(blob)
    })
  })
