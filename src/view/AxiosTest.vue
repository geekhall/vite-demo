<template>
  <el-button @click="test">测试</el-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getList } from '../service/api/user'

export default defineComponent({
  setup() {
    const test = async () => {
      await getList().then((res: any) => {
        console.log(res.data)
      })
    }
    return { test }
  }
})
</script>

<style></style>
