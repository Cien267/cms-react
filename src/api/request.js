import axios from 'axios'
import { camelizeKeys, decamelizeKeys } from 'humps'

import responseCode from './responseCode'
import ServerError from './serverError'

const instance = axios.create({
  baseURL: import.meta.env.VITE_KFIN_BASE_URL,
})

instance.interceptors.request.use(
  function (config) {
    const newConfig = { ...config }
    if (newConfig.headers['Content-Type'] === 'multipart/form-data') {
      return newConfig
    }

    if (config.params) {
      newConfig.params = decamelizeKeys(config.params)
    }
    if (config.data) {
      newConfig.data = decamelizeKeys(config.data)
    }
    return newConfig
  },
  function (error) {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  function (response) {
    if (response.data.code === responseCode.Success) {
      return camelizeKeys(response.data.body)
    }
    const { message, code } = response.data

    throw new ServerError(message, code, response.status)
  },
  function (error) {
    if (error instanceof ServerError) {
      return Promise.reject(error)
    }

    if (error.response) {
      const message = error.response?.data?.message || 'Có lỗi xảy ra'
      const code = error.response?.data?.code || responseCode.ErrSystem

      return Promise.reject(
        new ServerError(message, code, error.response.status),
      )
    }
    return Promise.reject(error)
  },
)

function request(config, token) {
  const newConfig = { ...config }

  if (token) {
    if (newConfig.headers) {
      newConfig.headers['Authorization'] = token
    } else {
      newConfig.headers = {
        Authorization: token,
      }
    }
  }

  return instance(newConfig)
}

export default request
