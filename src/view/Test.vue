<template>
  <div class="test_container">
    <h1>用于测试Vue3和Vue2的区别</h1>
    <h2>测试插值语法, {{name}}</h2>
    <a v-bind:href="url">Home</a>

    <h1>单向数据绑定</h1>
    <input type="text" v-bind:value="name1"> <br/>
    <input type="text" :value="name1">
    <hr/>
    <h1>双向数据绑定</h1>
<!--    下面的写法在Vue3中会报错：-->
<!--    <input type="text" v-model:value="name2">-->
    <input type="text" v-model="name2"><br/>
    <input type="text" v-model="name2">
    <hr>
    <h2>{{count}}</h2>
    <button @click="increment">点我++</button><br/>
    <!-- 简写形式 -->
    <button @click="showInfo1">点我显示提示信息</button><br/>
    <!-- 传递参数 -->
    <button @click="showInfo2(666)">点我显示提示信息2</button><br/>
    <!-- 传递参数, not working -->
<!--    <button @click="showInfo3($event,666)">点我弹出提示信息3</button><br/>-->

    <hr/>
    <h2>使用计算属性实现姓名合并</h2>
    姓：<input type="text" v-model="firstName"/><br/><br/>
    名：<input type="text" v-model="lastName"/><br/><br/>
    <!-- 全名： <span>{{fullName()}}</span> -->
    全名： <span>{{computedFullName}}</span><br/>
    全名1： <span>{{computedFullName1}}</span><br/>
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
      lastName: ""
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
    }
  }
})
</script>

<style lang="less" scoped>

</style>
