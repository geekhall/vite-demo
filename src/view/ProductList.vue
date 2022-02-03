<template>
    <ul>
        <li v-for="item in productsStore.all">
            {{item.title}} - {{item.price}}
            <br/>
            <button>添加到购物车</button>
        </li>
    </ul>
</template>

<script lang="ts" setup>
// import { useProductsStore } from '../store/products'
import { useProductsStore } from '../store/products'
const productsStore = useProductsStore()

// 加载所有Products
productsStore.loadAllProducts()

</script>

<style lang="less" scoped>

</style>
