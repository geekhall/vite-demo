import { wait } from './utils'

export interface IUser {
  id: number
  username: string
  password: string
}

const _users: IUser[] = [
  { id: 1, username: 'admin', password: '123456' },
  { id: 2, username: 'tom', password: '111111' },
  { id: 3, username: 'jerry', password: '222222' }
]

/**
 * 模拟获取用户列表
 */
export const getUsers = async () => {
  await wait(100)
  return _users
}

/**
 * 模拟用户登录
 */
export const userLogin = async (username: string, password: string) => {
  console.log('userLogin called')
  await wait(100)
  for (let user of _users) {
    console.log(user.username)
    if (user.username == username && user.password == password) {
      console.log('login ok')
      console.log(user.username)
      console.log(user.password)
      return true
    }
  }
  return false
}
