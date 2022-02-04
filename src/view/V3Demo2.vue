<template>
  <h1>Composition API Sample 2 (Use computed)</h1>
  <input type="text" v-model="state.num1" />
  <span>+</span>
  <input type="text" v-model="state.num2" />
  <span>=</span>
  {{ state.result }}

  <hr />
  <button type="button" @click="clickEvent()">emit event</button>
</template>

<script lang="ts">
import { reactive, computed } from 'vue'

export default {
  name: 'CompositionAPISample',
  props: {
    msg: String
  },
  setup() {
    const state = reactive({
      num1: 0,
      num2: 0,
      result: computed(() => parseInt(state.num1) + parseInt(state.num2))
    })

    const clickEvent = () => {
      console.log('button clicked.')
    }

    return {
      state,
      clickEvent
    }
  }
}
</script>

<style lang="less" scoped></style>
