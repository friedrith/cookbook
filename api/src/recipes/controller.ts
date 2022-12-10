import { Request, Response } from 'express'
import * as admin from 'firebase-admin'
import { omit } from 'lodash'
import { v4 as uuidv4 } from 'uuid'

import * as db from './database'
import { parseRecipe } from '../utils/parser'
import nodeFetch from '../utils/nodeFetch'

const COLLECTION_PATH = 'server/saving-data/cookbook/recipes/byUsers'

const handleError = (res: Response, err: any) => {
  return res.status(500).send({ message: `${err.code} - ${err.message}` })
}

const convert = (recipe: any) => ({
  ...recipe,
  createdAt: new Date(recipe.createdAt),
  updatedAt: recipe.updatedAt ? new Date(recipe.updatedAt) : null,
})

const createRecipe = async (obj: any) => {
  const recipe = {
    ...obj,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  await db.insert(COLLECTION_PATH, recipe)

  return recipe
}

export async function create(req: Request, res: Response) {
  try {
    const { name, keywords, imageUrl, stats, ingredients, steps } = req.body

    const { uid } = res.locals

    const recipe = await createRecipe({
      name,
      keywords,
      imageUrl,
      stats,
      ingredients,
      steps,
      userId: uid,
    })

    return res.status(201).send({ recipe: convert(recipe) })
  } catch (err) {
    return handleError(res, err)
  }
}

const addImportLog = async (obj: any) => {
  const ref = admin
    .database()
    .ref('server/saving-data/cookbook/recipes/imports')

  const logId = uuidv4()

  const logRef = ref.child(logId)

  logRef.set({
    ...obj,
    createdAt: new Date().toISOString(),
  })
}

export async function importRecipe(req: Request, res: Response) {
  const { url } = req.body
  const { uid } = res.locals

  try {
    const dom = await nodeFetch(url.toString())

    const { name, keywords, imageUrl, stats, ingredients, steps, author } =
      await parseRecipe(url, dom)

    const recipe = await createRecipe({
      name,
      keywords,
      imageUrl,
      stats,
      ingredients,
      steps,
      originUrl: url,
      author,
      userId: uid,
    })

    await addImportLog({ url, status: 'ok', userId: uid })

    return res.status(200).send({
      recipe: convert(recipe),
    })
  } catch (err) {
    addImportLog({ url, status: 'error', error: err, userId: uid })

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

    const { uid } = res.locals

    const ref = admin.database().ref(COLLECTION_PATH)
    const userRef = ref.child(uid)
    const recipeRef = userRef.child(id)

    const recipe = omit({ ...req.body, updatedAt: new Date().toISOString() }, [
      'userId',
      'id',
      'createdAt',
      'author',
      'originUrl',
    ])

    recipeRef.update(recipe)

    recipeRef.once(
      'value',
      snapshot => {
        res.status(200).send({ recipe: convert(snapshot.val()) })
      },
      errorObject => {
        res.status(500).send({ error: errorObject.name })
      }
    )
  } catch (err) {
    handleError(res, err)
  }
}

// https://firebase.google.com/docs/database/admin/start#node.js
export async function all(req: Request, res: Response) {
  try {
    const { uid } = res.locals

    const ref = admin.database().ref(COLLECTION_PATH)
    const userRef = ref.child(uid)

    userRef.once(
      'value',
      snapshot => {
        let recipes = Object.values(snapshot.val() || {})

        res.status(200).send({ recipes: recipes.map(convert) })
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
    const { uid } = res.locals

    const ref = admin.database().ref(COLLECTION_PATH)

    const userRef = ref.child(uid)
    const recipeRef = userRef.child(id)

    recipeRef.set(null)
    res.status(200).send({})
  } catch (err) {
    handleError(res, err)
  }
}

export async function removeAll(req: Request, res: Response) {
  try {
    const { uid } = res.locals

    const ref = admin.database().ref(COLLECTION_PATH)

    const userRef = ref.child(uid)

    userRef.set(null)
    res.status(200).send({})
  } catch (err) {
    handleError(res, err)
  }
}
