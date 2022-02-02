<template>
  <hr/><br/>
  <h2>v-if</h2>
  <p v-if="value===1">A</p>
  <p v-else-if="value===2">B</p>
  <p v-else-if="value===3">C</p>
  <p v-else>D</p>
  <hr/>
  <h1>{{value}}</h1>

  <a-radio-group v-model="value" @change="onChange" :default-value="1">
    <a-radio :style="radioStyle" :value="1">
      Option A
    </a-radio>
    <a-radio :style="radioStyle" :value="2">
      Option B
    </a-radio>
    <a-radio :style="radioStyle" :value="3">
      Option C
    </a-radio>
    <a-radio :style="radioStyle" :value="4">
      Option D
    </a-radio>
  </a-radio-group>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  // 已启用类型推断
  data () {
    return {
      value: 1,
      radioStyle: {
        display: 'block',
        color: 'brown',
        height: '30px',
        lineHeight: '30px',
      },
    }
  },
  methods :{
    onChange(e: PointerEvent) {
      console.log('radio checked', e.target.value);
      console.log(this.value)
    },
  }
})
</script>

<style lang="less" scoped>
.radioStyle {

}
</style>
