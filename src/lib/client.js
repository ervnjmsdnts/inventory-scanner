import axios from 'axios'

export const API_URL = 'https://inventory-scanner-api.vercel.app/api'
export const LOCAL_URL = 'http://localhost:8080/api'

const client = axios.create({
  baseURL: LOCAL_URL
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
