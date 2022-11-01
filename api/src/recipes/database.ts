import * as admin from 'firebase-admin'

export const insert = async (collection: string, id: string, obj: any) => {
  const ref = admin.database().ref(collection)

  const recipeRef = ref.child(id)

  recipeRef.set(obj)
}
