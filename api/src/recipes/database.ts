import * as admin from 'firebase-admin'

import Recipe from '../models/Recipe'

export const insert = async (collection: string, recipe: Recipe) => {
  const ref = admin.database().ref(collection)

  const userRef = ref.child(recipe.userId)

  const recipeRef = userRef.child(recipe.id)

  recipeRef.set(recipe)
}
