<template>
  <el-button @click="test">测试</el-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getUser } from '../service/api/user'

export default defineComponent({
  setup() {
    const test = async () => {
      await getUser().then((res: any) => {
        console.log(res.data)
      })
    }
    return { test }
  }
})
</script>

<style></style>
