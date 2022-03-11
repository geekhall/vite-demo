<template>
  <el-button @click="test">测试</el-button>
  <el-button @click="test2">Test Spring Boot 2 </el-button>

  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>{{ card_name }}</span>
        <el-button class="button" type="text">详细</el-button>
      </div>
    </template>
    <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getUser, hello } from '../service/api/user'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export default defineComponent({
  setup() {
    const test = async () => {
      await getUser().then((res: any) => {
        console.log(res.data)
      })
    }
    const test2 = async () => {
      const result = await axios({
        method: 'GET',
        url: '/api/product/all'
      })
        .then((res: any) => {
          console.log(res.data)
        })
        .catch((err: any) => {
          console.log(err)
        })
      // await hello().then((res: any) => {
      //   console.log(res.data)
      // })
    }
    return { test, test2 }
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
</style>
