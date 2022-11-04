import { Request, Response } from 'express'
import * as admin from 'firebase-admin'
import { omit } from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import * as db from './database'
import { parseRecipe } from '../utils/parser'
import * as websitesDb from '../officialWebsites/database'

const COLLECTION_PATH = 'server/saving-data/cookbook/recipes'

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

  await db.insert(COLLECTION_PATH, recipe.id, recipe)

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

export async function importRecipe(req: Request, res: Response) {
  const { url } = req.body

  try {
    const dom = await (await fetch(url.toString())).text()

    const { name, keywords, imageUrl, stats, ingredients, steps, author } =
      await parseRecipe(url, dom)

    const { uid } = res.locals

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

    await websitesDb.insert(uuidv4(), { url, status: 'ok' })

    return res.status(200).send({
      recipe: convert(recipe),
    })
  } catch (err) {
    await websitesDb.insert(uuidv4(), { url, status: 'error', error: err })
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
    const recipeRef = ref.child(id)

    recipeRef.once(
      'value',
      snapshotBefore => {
        if (snapshotBefore.val()?.userId === uid) {
          const recipe = omit(
            { ...req.body, updatedAt: new Date().toISOString() },
            ['userId', 'id', 'createdAt']
          )
          recipeRef.update(recipe)

          recipeRef.once(
            'value',
            snapshot => {
              const updatedRecipe = snapshot.val()
              res.status(200).send({ recipe: convert(updatedRecipe) })
            },
            errorObject => {
              res.status(500).send({ error: errorObject.name })
            }
          )
        } else {
          res.status(403).send({ error: 'not your recipe' })
        }
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
    const { uid } = res.locals

    recipeRef.once(
      'value',
      snapshot => {
        if (snapshot.val()?.userId === uid) {
          recipeRef.set(null)
          res.status(204).send({})
        } else {
          res.status(403).send({ error: 'not your recipe' })
        }
      },
      errorObject => {
        res.status(500).send({ error: errorObject.name })
      }
    )
  } catch (err) {
    handleError(res, err)
  }
}
