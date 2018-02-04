import axios from 'axios'
import _ from 'lodash'

const auth0BaseUrl = 'http://localhost:8080'

let api_key = !_.isEmpty(localStorage.getItem('api_key')) ? localStorage.getItem('api_key') : ''

let instance = axios.create({
  baseURL: auth0BaseUrl,
  timeout: 1000,
  headers:{'Content-Type': 'application/x-www-form-urlencoded'}
})



export const get = (path, config) => {
  return instance.get(path, config)
}

export const post = (path, config) => {
  return instance.post(path, config)
}
