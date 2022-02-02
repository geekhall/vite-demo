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
    <h2>天气信息</h2>
    <h2>北京: {{weatherInfo}}</h2>
    <h2>上海: {{weatherInfo1}}</h2>
    <h2>东京: {{weatherInfo2}}</h2>
    <button @click="changeWeather">切换天气</button>
    <hr/><br/>
    <h2>绑定样式</h2>
    <!-- 绑定变量的写法 ，适用于：样式的类名不确定，需要动态指定-->
    <div class="basic" :class="bgColor" @click="changeColor">{{name}}</div>
    <!-- 绑定样式数组写法，适用于要绑定的样式名字和个数都不确定的情况 -->
    <div class="basic" :class="styles" @click="changeStyle">{{name}}</div>
    <!-- 绑定样式对象写法，适用于要绑定的样式个数确定，名字也确定的情况，但需要动态决定是否使用 -->
    <div class="basic" :class="classObj">{{name}}</div>
    <div class="basic" :style="styleObj">{{name}}</div>
    <div class="clear"></div>
    <hr/><br/>
    <h2>v-if</h2>
    <p v-if="answer==='A'">A</p>
    <p v-else-if="answer==='B'">B</p>
    <p v-else-if="answer==='C'">C</p>
    <p v-else="answer==='D'">D</p>

    <a-radio-group v-model="radioValue" @change="onChange">
      <a-radio :style="radioStyle" :radioValue="1">
        Option A
      </a-radio>
      <a-radio :style="radioStyle" :radioValue="2">
        Option B
      </a-radio>
      <a-radio :style="radioStyle" :radioValue="3">
        Option C
      </a-radio>
      <a-radio :style="radioStyle" :radioValue="4">
        More...
        <a-input v-if="radioValue === 4" :style="{ width: 100, marginLeft: 10 }" />
      </a-radio>
    </a-radio-group>
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
      isHot: true,
      isHot1: true,
      isHot2: true,
      bgColor: ['yellow'],
      mood:'yellow',
      styles: ['center', 'big', 'bold'],
      classObj: {
        big: true,
        bold: false,
        center: true,
      },
      styleObj: {
        // 注意这里使用驼峰法命名，对应css中的font-size属性
        fontSize: '80px',
        color: 'red',
        // 注意这里使用驼峰法命名，对应css中的background-color属性
        backgroundColor: 'blue'
      },
      answer: "B",
      radioValue: 1,
      radioStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
      },
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
      this.isHot = !this.isHot;
      this.isHot1 = !this.isHot1;
      this.isHot2 = !this.isHot2;
    },
    changeColor(){
      console.log("change color");
      const arr = ['yellow', 'green', 'cyan', 'white', 'gray', 'brown']
      let i = Math.floor(Math.random()*6);
      this.bgColor = arr[i];
      console.log(this.bgColor);
    },
    changeStyle(){
      console.log("change style");
      const arr = ['yellow', 'green', 'cyan']
      let i = Math.floor(Math.random()*3);
      // this.bgColor = arr[i];
      this.styleObj.backgroundColor= arr[i];
    },
    // showInfo3(number: PointerEvent){
    //   console.log(number);    // 点我弹出提示信息
    //   alert(number);
    // },
    onChange(e) {
      console.log('radio checked', e);
      console.log('radio checked', e.target.value);
    },
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
    },
    weatherInfo1: function (){
      return this.isHot1 ? '炎热' : '清爽';
    },
    weatherInfo2: function (){
      return this.isHot2 ? '炎热' : '清爽';
    },
  },
  watch: { // 监视属性
    isHot: {
      immediate: true, // 初始化时让handler调用一下
      // handler函数在isHot发生改变的时候调用。
      handler(newValue, oldValue){
        console.log('isHot被修改了', newValue, oldValue);
      }
    },
    isHot1: {
      handler(newValue, oldValue) {
        console.log('isHot1被修改了', newValue, oldValue);
      }
    },
    isHot2(newValue, oldValue) {
      console.log('isHot2被修改了', newValue, oldValue);
    },
  }
})
</script>

<style lang="less" scoped>
.title {
  color: cadetblue;
}
.basic{
  width:300px;
  height:200px;
  border: solid green 3px;
  float: left;
}
.cyan{
  background: cyan;
}
.green{
  background: green;
}
.yellow{
  background:yellow;
}
.center{
  text-align:center;
  padding-top: 50px;
}
.big{
  font-size:50px;
}
.bold{
  font-weight: bold;
  color:rebeccapurple;
}
.clear{clear:both; height: 0; line-height: 0; font-size: 0}

</style>
