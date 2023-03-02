import { Request, Response } from 'express'

import * as db from './database'

const handleError = (res: Response, err: any) => {
  return res.status(500).send({ message: `${err.code} - ${err.message}` })
}

const generateUrl = () => {
  let result = ''
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const createLink = async (recipeId: string, ownerId: string) => {
  const link = {
    recipeId,
    ownerId,
    id: generateUrl(),
    createdAt: new Date().toISOString(),
  }

  await db.insert(link)

  return link
}

export async function create(req: Request, res: Response) {
  try {
    const { recipeId } = req.body

    const { uid } = res.locals

    const link = await createLink(recipeId, uid)

    return res.status(201).send({ link: link.id })
  } catch (err) {
    return handleError(res, err)
  }
}
