<template>
  <div class="demo">
    <ul>
      <li v-for="(p, index) in demoProducts" :key="p.id">
        {{ p.id }} : {{ p.name }} - {{ p.description }}
      </li>
    </ul>
  </div>
  <el-button @click="test">测试</el-button>
  <el-button @click="test2">Test Spring Boot 2 </el-button>
  <el-button @click="test3">Test Spring Boot 3 </el-button>

  <el-card shadow="hover" class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{ product.name }}</span>
        <el-button class="button" type="text">详细</el-button>
      </div>
    </template>
    <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
  </el-card>
</template>

<script lang="ts">
import { IProduct } from '../api/shop'
import { defineComponent, reactive } from 'vue'
import { getUser, hello } from '../service/api/user'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export default defineComponent({
  setup() {
    let demoProducts = [
      {
        id: 1,
        name: 'MacBookPro',
        description: 'Mac book pro',
        brand: 'Apple',
        price: 15000,
        isDeleted: false
      },
      {
        id: 2,
        name: 'MacBookAir',
        description: 'Mac book air',
        brand: 'Apple',
        price: 8000,
        isDeleted: false
      },
      {
        id: 3,
        name: 'iPhone13',
        description: 'iphone13 pro max',
        brand: 'Apple',
        price: 9800,
        isDeleted: false
      }
    ]
    let products = [] as IProduct[]
    let product = reactive({
      id: null,
      name: 'origin name',
      description: '',
      brand: '',
      price: 0,
      isDelete: false
    })
    const test = async () => {
      await getUser().then((res: any) => {
        console.log('###' + res.data)
      })
    }
    const test2 = async () => {
      const result = await axios({
        method: 'GET',
        url: '/api/product/all'
      })
        .then((res: any) => {
          console.log(res.data)
          products = res.data
          console.log('Test2:@@@' + JSON.stringify(products))
        })
        .catch((err: any) => {
          console.log(err.message)
        })
      // await hello().then((res: any) => {
      //   console.log(res.data)
      // })
    }
    // 自己public文件夹下已经有的内容，代理服务器不会转发至后台。
    const test3 = async () => {
      const result = await axios({
        method: 'GET',
        url: '/api/product/1'
      })
        .then((res: any) => {
          console.log('Test3:@@@: res.data=' + res.data)
          console.log('Test3:@@@: product=' + product)
          product = JSON.stringify(res.data)

          console.log('Test3:@@@' + JSON.stringify(product))
        })
        .catch((err: any) => {
          console.log(err.message)
        })
    }
    return { test, test2, test3, product, products, demoProducts }
  }
})
</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
.demo {
  background-color: skyblue;
  width: 480px;
  height: 480px;
}
</style>
