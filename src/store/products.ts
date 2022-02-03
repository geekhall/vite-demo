import { defineStore } from "pinia"
import { getProducts, IProduct} from "../api/shop"

export const useProductsStore =  defineStore('products', {
    state: () => {
        return {
            all: [] as IProduct[] // 所有商品列表
        }
    },

    getters: {},

    actions: {
        async loadAllProducts() {
            const ret = await getProducts()
            this.all = ret
        }
    }
})
