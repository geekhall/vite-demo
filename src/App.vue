<template>
  <!-- <div class="box"></div> -->
  <router-view></router-view>
</template>

<script lang="ts" setup>
const boxWidth = '100px'
</script>

<style lang="less" scoped>
.box {
  width: v-bind(boxWidth);
  height: 100px;
  background-color: cyan;
}
</style>
