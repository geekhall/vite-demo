<template>
  <h1>Composition API Sample 1 (Use state)</h1>
  <input type="text" v-model="state.num1" @keyup="add()" />
  <span>+</span>
  <input type="text" v-model="state.num2" @keyup="add()" />
  <span>=</span>
  {{ state.result }}
</template>

<script lang="ts">
import { reactive } from 'vue'

const state = reactive({
  num1: 0,
  num2: 0,
  result: 0
})

function add() {
  state.result = parseInt(state.num1) + parseInt(state.num2)
}

export default {
  name: 'CompositionAPISample',
  props: {
    msg: String
  },
  setup() {
    // state 和 add 可以放在setup的外面或者里面
    // const state = reactive({
    //     num1: 0,
    //     num2: 0,
    //     result: 0
    // });
    //
    // function add() {
    //     state.result = parseInt(state.num1) + parseInt(state.num2)
    // }
    return {
      state,
      add
    }
  }
}
</script>

<style lang="less" scoped></style>
