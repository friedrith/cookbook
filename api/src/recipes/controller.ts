import { Request, Response } from 'express'
import * as admin from 'firebase-admin'
import { v4 as uuidv4 } from 'uuid'
import { omit } from 'lodash'

const COLLECTION_PATH = 'server/saving-data/cookbook/recipes'

const handleError = (res: Response, err: any) => {
  return res.status(500).send({ message: `${err.code} - ${err.message}` })
}

const convert = (recipe: any) => ({
  ...recipe,
  createdAt: new Date(recipe.createdAt),
  updatedAt: recipe.updatedAt ? new Date(recipe.updatedAt) : null,
})

export async function create(req: Request, res: Response) {
  try {
    const { name, keywords, imageUrl, stats, ingredients, steps } = req.body

    const ref = admin.database().ref(COLLECTION_PATH)

    const { uid } = res.locals

    const recipe = {
      id: uuidv4(),
      name,
      keywords,
      imageUrl,
      stats,
      ingredients,
      steps,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: uid,
    }
    const recipeRef = ref.child(recipe.id)

    recipeRef.set(recipe)

    return res.status(201).send({ recipe: convert(recipe) })
  } catch (err) {
    return handleError(res, err)
  }
}

export async function patch(req: Request, res: Response) {
  try {
    const { id } = req.params

    if (!id) {
      res.status(400).send({ message: 'Missing fields' })
      return
    }

    const ref = admin.database().ref(COLLECTION_PATH)
    const recipeRef = ref.child(id)

    const recipe = omit({ ...req.body, updatedAt: new Date().toISOString() }, [
      'userId',
      'id',
      'createdAt',
    ])
    recipeRef.update(recipe)

    recipeRef.once(
      'value',
      snapshot => {
        const updatedRecipe = snapshot.val()
        console.log('updatedRecipe', updatedRecipe)
        res.status(200).send({ recipe: convert(updatedRecipe) })
      },
      errorObject => {
        res.status(500).send({ error: errorObject.name })
      }
    )
  } catch (err) {
    handleError(res, err)
  }
}

const sortByDate = (recipeA: any, recipeB: any) =>
  recipeA?.createdAt?.localeCompare(recipeB?.createdAt) || 0

// https://firebase.google.com/docs/database/admin/start#node.js
export async function all(req: Request, res: Response) {
  try {
    const ref = admin.database().ref(COLLECTION_PATH)

    const { uid } = res.locals

    ref.once(
      'value',
      snapshot => {
        let recipes = Object.values(snapshot.val() || {})

        recipes = recipes
          .sort(sortByDate)
          .filter((r: any) => r.userId === uid)
          .map(convert)

        res.status(200).send({ recipes })
      },
      errorObject => {
        res.status(500).send({ error: errorObject.name })
      }
    )
  } catch (err) {
    handleError(res, err)
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const { id } = req.params
    const ref = admin.database().ref(COLLECTION_PATH)
    const recipeRef = ref.child(id)
    recipeRef.set(null)
    return res.status(204).send({})
  } catch (err) {
    return handleError(res, err)
  }
}
