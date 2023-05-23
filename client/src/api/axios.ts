import axios from 'axios'
import { isEmpty } from 'lodash'
import Cookies from 'js-cookie'
import { PersistData } from 'src/enums'

export const axiosBase = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: `Bearer ${Cookies.get(PersistData.Token)}`,
  },
})

axiosBase.interceptors.request.use((config) => {
  const token = `Bearer ${Cookies.get(PersistData.Token)}`

  if (token) {
    config.headers.Authorization = token
    config.headers['Content-Type'] = 'application/json'
  }

  return config
})

axiosBase.defaults.transformRequest = function (data = {}) {
  const { isJson = true, key, ...body } = data

  if (isEmpty(body)) return

  if (!isJson) {
    const formData = new FormData()

    for (const el in body) {
      if (Array.isArray(body[el])) {
        for (const item of body[el]) {
          formData.append(key, item)
        }
      } else {
        formData.append(key, body[el])
      }
    }

    return formData
  }

  return JSON.stringify(body)
}
