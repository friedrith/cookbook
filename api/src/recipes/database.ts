import * as admin from 'firebase-admin'
import convert from './convert'
import Recipe from '../models/Recipe'

export const insert = async (collection: string, recipe: any) => {
  const ref = admin.database().ref(collection)

  const userRef = ref.child(recipe.userId)

  const recipeRef = userRef.child(recipe.id)

  recipeRef.set(recipe)
}

export const findOne = async (
  collection: string,
  ownerId: string,
  recipeId: string,
): Promise<Recipe> =>
  new Promise((resolve, reject) => {
    try {
      const ref = admin
        .database()
        .ref(collection)
        .child(ownerId)
        .child(recipeId)

      ref.once(
        'value',
        snapshot => {
          resolve(convert(snapshot.val()))
        },
        errorObject => {
          reject(errorObject)
        },
      )
    } catch (err) {
      reject(err)
    }
  })
