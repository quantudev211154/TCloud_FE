import axios, { AxiosInstance } from 'axios'
import { HOST } from '../constants/api.constant'

class Http {
  instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: HOST,
      timeout: 30000,
      withCredentials: true,
    })
  }
}

const http = new Http().instance

export default http
