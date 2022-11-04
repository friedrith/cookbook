import api from './api'

const baseURL = '/officialWebsites'

export const fetchAll = async (): Promise<string[]> => {
  const response = await api().get(baseURL)
  return response.data?.officialWebsites
}
