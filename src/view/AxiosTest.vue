<template>
  <el-button @click="test">测试</el-button>
  <el-button @click="test2">Test Spring Boot 2 </el-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getUser, hello } from '../service/api/user'

export default defineComponent({
  setup() {
    const test = async () => {
      await getUser().then((res: any) => {
        console.log(res.data)
      })
    }
    const test2 = async () => {
      await hello().then((res: any) => {
        console.log(res.data)
      })
    }
    return { test, test2 }
  }
})
</script>

<style></style>
