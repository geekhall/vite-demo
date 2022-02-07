import { MockMethod } from 'vite-plugin-mock'
import * as fs from 'fs'

const appData = JSON.parse(fs.readFileSync('./src/mock/data.json', 'utf8'))
const seller = appData.seller
const goods = appData.goods
const ratings = appData.ratings

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
  {
    // http://localhost:3000/api/seller
    url: '/api/seller',
    method: 'get',
    response: () => {
      return {
          code: 200,
          message: 'ok',
          data: seller
      };
    }
  },
  {
    url: '/api/goods',
    method: 'get',
    response: () => {
      return {
          code: 200,
          message: 'ok',
          data: goods
      };
    }
  },
  {
    url: '/api/ratings',
    method: 'get',
    response: () => {
      return {
          code: 200,
          message: 'ok',
          data: ratings
      };
    }
  },
] as MockMethod[]