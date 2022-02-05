<template>
  <h1>Pinia - 购物车示例</h1>
  <hr />
  <h2>商品列表</h2>
  <ProductList />
  <hr />
  <ShoppingCart />
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue'
import ProductList from './ProductList.vue'
import ShoppingCart from './ShoppingCart.vue'
</script>

<style lang="less" scoped></style>
