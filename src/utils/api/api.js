import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

const getInstance = () => instance

export default getInstance

export const setToken = (token: string) => {
  console.log('setToken', token)
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
