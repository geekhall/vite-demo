<template>
  <ul>
    <li v-for="item in productsStore.all">
      {{ item.title }} - {{ item.price }} (库存：{{ item.inventory }})
      <br />
      <button
        :disabled="!item.inventory"
        @click="cartStore.addProductToCart(item)"
      >
        添加到购物车
      </button>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { useCartStore } from '../../store/cart'
import { useProductsStore } from '../../store/products'

const productsStore = useProductsStore()
const cartStore = useCartStore()

// 加载所有Products
productsStore.loadAllProducts()
// cartStore.addProductToCart()
</script>

<style lang="less" scoped></style>
