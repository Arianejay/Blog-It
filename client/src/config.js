import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'https://blog-it-mern.herokuapp.com/',
})
