import { AxiosRequestConfig } from 'axios'
import { axiosBase } from '../axios'

export class BaseService {
  public static async fetch<T>(props: AxiosRequestConfig) {
    return await axiosBase.request<T>(props)
  }
}
