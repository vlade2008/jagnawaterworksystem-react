import axios from 'axios'
import _ from 'lodash'

export const baseURL = 'http://192.168.1.16:8080'



// headers:{'Authenticate': api_key}
// headers:{'Content-Type': 'application/x-www-form-urlencoded'}

export const instance = () =>{

  let api_key = localStorage.getItem('api_key')
  let instance = axios.create({
    baseURL: baseURL,
    timeout: 1000,
    headers:{
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': api_key ? api_key : ''
    }
  })
  return instance

}


export const instanceSMS = () =>{

  let api_key = localStorage.getItem('api_key')
  let instance = axios.create({
    baseURL: baseURL,
    timeout: 80000,
    headers:{
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': api_key ? api_key : ''
    }
  })
  return instance

}


export const get = (path, config) => {
  return instance().get(path, config)
}

export const post = (path,body, config) => {
  return instance().post(path, body || {}, config)
}

export const put = (path,body, config) => {
  return instance().put(path, body || {}, config)
}

export const destroy = (path, config) => {
  return instance().delete(path, config)
}

export const getTimeout = (path,config) =>{
  return instanceSMS().get(path,config)
}
