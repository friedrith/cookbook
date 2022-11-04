import * as admin from 'firebase-admin'

const COLLECTION_PATH = 'server/saving-data/cookbook/websites'

export const insert = async (id: string, obj: any) => {
  const ref = admin.database().ref(COLLECTION_PATH)

  const websiteRef = ref.child(id)

  websiteRef.set(obj)
}
