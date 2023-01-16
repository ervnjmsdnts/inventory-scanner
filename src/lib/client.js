import axios from 'axios'

export const API_URL = 'https://store-api-bsu.vercel.app/'
export const LOCAL_URL = 'http://localhost:8080/api'

const client = axios.create({
  baseURL: API_URL
})

client.interceptors.request.use(async config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

client.interceptors.response.use(
  async response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default client
