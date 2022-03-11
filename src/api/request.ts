import { Message } from '@element-plus/icons-vue/dist/types'
import axios from 'axios'
import router from '../router'

// 响应拦截器
axios.interceptors.response.use(
  (success) => {
    if (success.status && success.status === 200) {
      if (
        success.data.code === 500 ||
        success.data.code === 403 ||
        success.data.code === 401
      ) {
        Message.error({ message: success.data.message })
        return
      }
      if (success.data.message) {
        Message.success({ message: success.data.message })
      }
    }
    return success.data
  },
  (error) => {
    if (error.response.code === 504 || error.response.code === 404) {
      Message.error({ message: '服务器去火星了!' })
    } else if (error.response.code === 405) {
      Message.error({ message: '权限不足!' })
    } else if (error.response.code === 401) {
      Message.error({ message: '尚未登录，请登录' })
      router.replace('/')
    } else {
      if (error.response.data.message) {
        Message.error({ message: error.response.data.message })
      } else {
        Message.error({ message: '未知错误' })
      }
    }
    return
  }
)

let base = ''

export const postRequest = (url: string, params: string) => {
  return axios({
    method: 'post',
    url: `${base}${url}`
  })
}
