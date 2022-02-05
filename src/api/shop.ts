import { wait } from "./utils"

export interface IProduct {
    id: number
    title: string
    price: number
    inventory: number //库存
}

const _products: IProduct[] = [
    {id: 1, title: 'ipapd 4 Mini', price: 500.01, inventory: 2},
    {id: 2, title: 'iPhone 13 Pro Max', price: 5000.02, inventory: 19},
    {id: 3, title: 'MacBookPro M1 Max', price: 10000.03, inventory: 32},
]

/**
 * 模拟获取商品列表
 */
export const getProducts = async () => {
    await wait(100)
    return _products
}

/**
 * 模拟购买商品
 */
export const buyProducts = async () => {
    await wait(100)
    return Math.random() > 0.5
}
