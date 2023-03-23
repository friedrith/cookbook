import { initializeApp, getApp } from 'firebase/app'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
}

export const init = () => initializeApp(firebaseConfig)

export const storeFile = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const app = getApp()
    const storage = getStorage(app)

    const ext = file.type.split('/')[1]

    const metadata = {
      contentType: file.type,
    }

    // https://firebase.google.com/docs/storage/web/create-reference
    const imagesRef = ref(storage, `images/banner/${uuidv4()}.${ext}`)

    uploadBytes(imagesRef, file, metadata).then(() => {
      getDownloadURL(imagesRef).then((downloadURL: string) => {
        resolve(downloadURL)
      })
    })
  })
}
