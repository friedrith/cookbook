import * as admin from 'firebase-admin'

export const insert = async (collection: string, recipe: any) => {
  const ref = admin.database().ref(collection)

  const userRef = ref.child(recipe.userId)

  const recipeRef = userRef.child(recipe.id)

  recipeRef.set(recipe)
}
