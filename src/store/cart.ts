import {defineStore} from "pinia";
import {buyProducts, IProduct} from "../api/shop";
import {useProductsStore} from './products'

type CartProduct = {
    quantity: number
} & Omit<IProduct, 'inventory'> // 去掉IProduct中的inventory属性，其余的保留

export const useCartStore = defineStore('cart',{
    state: () => {
        return {
            cartProducts: [] as CartProduct[], // 购物车商品列表
            checkoutStatus: null as null | string
        }
    },

    getters: {
        getTotalPrice(state) {
            return state.cartProducts.reduce((total, item) => {
                return total + item.price * item.quantity
            }, 0)
        }
    },

    actions: {
        addProductToCart(product: IProduct) {
            console.log('addProductToCart function called: ', product)
            // 看商品有没有库存
            if (product.inventory < 1) {
                return
            }
            // 查看购物车中是否已有该商品
            const cartItem = this.cartProducts.find(item => item.id === product.id)

            if (cartItem) { // 如果有，则商品数量+1
                cartItem.quantity++
            } else {
                // 如果没有，则添加该商品至购物车中。
                this.cartProducts.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    quantity: 1 // 第一次加载到购物车时，数量为1
                })
            }
            // 更新商品的库存
            const productStore = useProductsStore()
            productStore.decrementProduct(product)
        },

        async checkout() {
            const ret = await buyProducts()
            this.checkoutStatus = ret ? '成功' : '失败'
        }
    }
})
