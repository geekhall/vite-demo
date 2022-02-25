import { request } from '../request'

// mock method
export function getUser() {
  return request({
    url: `/getUser`,
    method: 'get',
    data: {},
    params: {}
  })
}

// call spring boot 2 api
export function hello() {
  return request({
    url: '/hello',
    method: 'get',
    data: {},
    params: {}
  })
}
