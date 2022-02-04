<template>
  <div class="login-container">
    <el-form ref="formRef" :model="form">
      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>
      <el-form-item>
        <el-icon :size="20" class="svg-container">
          <edit />
        </el-icon>
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-icon :size="20" class="svg-container">
          <edit />
        </el-icon>
        <el-input v-model="form.password"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Edit } from '@element-plus/icons-vue'
const form = ref({
  name: '',
  password: ''
})
</script>

<style lang="scss" scoped></style>
