import axios from 'axios'

export default axios.create({
  baseURL: import.meta.env.API_BASE_URL,
  timeout: 5000,
  withCredentials: false,
})
