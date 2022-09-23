import api from './api'

import Recipe from 'models/Recipe'
import Measure from 'models/Measure'

const baseURL = '/recipes'

const convertFromHttp = (httpRecipe: HttpRecipe): Recipe => ({
  keywords: [],
  stats: {},
  ingredients: '',
  steps: '',
  ...httpRecipe,
})

export const fetchAll = async () => {
  const response = await api().get(baseURL)
  return response.data?.recipes.map(convertFromHttp)
}

type HttpRecipe = {
  id: string
  name: string
  keywords?: string[]
  imageUrl: string
  stats?: { [id: string]: Measure }
  ingredients?: ''
  steps?: ''
  createdAt: Date | null
}

export const createOne = async (recipe: Recipe) => {
  await api().post(baseURL, recipe)
}

export const removeOne = async (recipe: Recipe) =>
  api().delete(`${baseURL}/${recipe.id}`)

export const updateOne = async (recipe: Recipe) => {
  const response = await api().patch(`${baseURL}/${recipe.id}`, recipe)
  return convertFromHttp(response?.data?.recipe)
}
