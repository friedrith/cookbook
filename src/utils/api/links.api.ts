import api from './api'

const baseURL = '/links'

export const create = async (recipeId: string) => {
  const response = await api().post(baseURL, { recipeId })
  return response?.data?.link
}
