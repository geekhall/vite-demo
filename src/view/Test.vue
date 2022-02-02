<template>
  <div class="test_container">
    <h1>用于测试Vue3和Vue2的区别</h1>
    <h2 class="title">插值语法</h2>
    <h3> Hello , {{name}}</h3>
    <a v-bind:href="url">Home</a>
    <hr/><br/>
    <h2 class="title">单向数据绑定</h2>
    <input type="text" v-bind:value="name1"> <br/>
    <input type="text" :value="name1">
    <br/><br/>
    <h2 class="title">双向数据绑定</h2>
<!--    下面的写法在Vue3中会报错：-->
<!--    <input type="text" v-model:value="name2">-->
    <input type="text" v-model="name2"><br/>
    <input type="text" v-model="name2">
    <hr/><br/>
    <h2 class="title">Methods</h2>
    <h2>{{count}}</h2>
    <button @click="increment">点我++</button><br/>
    <!-- 简写形式 -->
    <button @click="showInfo1">点我显示提示信息</button><br/>
    <!-- 传递参数 -->
    <button @click="showInfo2(666)">点我显示提示信息2</button><br/>
    <!-- 传递参数, not working -->
<!--    <button @click="showInfo3($event,666)">点我弹出提示信息3</button><br/>-->

    <hr/><br/>
    <h2 class="title">计算属性</h2>
    姓：<input type="text" v-model="firstName"/><br/><br/>
    名：<input type="text" v-model="lastName"/><br/><br/>
    <!-- 全名： <span>{{fullName()}}</span> -->
    全名： <span>{{computedFullName}}</span><br/>
    全名1： <span>{{computedFullName1}}</span><br/>
    <hr/><br/>
    <h2 class="title">监视属性</h2>
    <h2>今天天气很{{weatherInfo}}</h2>
    <button @click="changeWeather">切换天气</button>
    <hr/>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  // 已启用类型推断
  // data: function (){ // OK
  data (){
    console.log('@@@@@@@: ', this);
    return {
      name: "Eric",
      count: 1,
      url: "http://localhost:3000/",
      name1: "name1",
      name2: "name2",
      firstName: "",
      lastName: "",
      isHot: true
    }
  },
  methods: {
    increment() {
      // `this` 指向该组件实例
      this.count++
    },
    showInfo1(event: PointerEvent ){ // 没有类型会提示TS: 7006
      console.log(event)
      console.log(event.target.innerText);    // 点我弹出提示信息
      alert("你好，欢迎你");
    },
    showInfo2(number: PointerEvent){
      console.log(number);    // 点我弹出提示信息
      alert(number);
    },
    changeWeather() {
      this.isHot = !this.isHot
    }
    // showInfo3(number: PointerEvent){
    //   console.log(number);    // 点我弹出提示信息
    //   alert(number);
    // },
  },
  computed: { // 计算属性
    // 计算属性
    computedFullName: function(){
      return this.firstName + ' ' + this.lastName;
    },
    // 简写
    computedFullName1: {
      // Getter， get什么时候调用：1.初次  2.计算属性所依赖的数据发生变化时
      get(){
        return this.firstName + ' ' + this.lastName;
      }
    },
    weatherInfo: function (){
      return this.isHot ? '炎热' : '清爽';
    }
  },
  watch: { // 监视属性
    isHot: {
      immediate: true, // 初始化时让handler调用一下
      // handler函数在isHot发生改变的时候调用。
      handler(newValue, oldValue){
        console.log('isHot被修改了', newValue, oldValue);
      }
    }
  }
})
</script>

<style lang="less" scoped>
.title {
  color: cadetblue;
}
</style>
