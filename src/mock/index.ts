import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/api/getList',
    method: 'get',
    response: () => {
      return {
          code: 200,
          message: 'ok',
          data: ['tom', 'jerry']
      };
    }
  },
  {
    url: '/api/getList',
    method: 'post',
    response: () => {
      return {
          code: 200,
          message: 'ok',
          data: ['eric', 'king']
      };
    }
  },
] as MockMethod[]