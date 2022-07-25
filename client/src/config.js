import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'https://blog-it-ariane.herokuapp.com/',
})
