import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/api/getUser',
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
    url: '/api/getUser',
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