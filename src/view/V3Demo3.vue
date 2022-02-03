<template>
    <h1>Pinia Sample</h1>
    <hr/>
    <h2><p>{{mainStore.count}}</p></h2>
    <h2><p>{{mainStore.foo}}</p></h2>
    <h2><p>{{mainStore.arr}}</p></h2>
    <h2><p>{{mainStore.count20}}</p></h2>
    <h2><p>{{mainStore.count20}}</p></h2>
    <h2><p>{{mainStore.count30}}</p></h2>
    <hr/>
    <h2><p>{{count}}</p></h2>
    <h2><p>{{foo}}</p></h2>
    <hr/>
    <p>
        <button @click="handleChangeState">修改数据</button>
    </p>
</template>

<script lang="ts" setup>
    import {useMainStore} from "../store"
    import {storeToRefs} from 'pinia'


    const mainStore = useMainStore()

    console.log(mainStore.count)

    // 解构赋值后拿到的数据不是响应式的。（一次性的）
    // const { count, foo} = mainStore
    // 解决办法是使用storeToRefs，Pinia其实就是把state数据都做了reactivate处理了，把解构出来的数据做Ref响应式代理。
    const {count, foo} = storeToRefs(mainStore)

    const handleChangeState = () => {
        // 数据修改
        // 方式一
        // mainStore.count++

        // 方式二：使用$patch 批量更新
        // mainStore.$patch({
        //     count: mainStore.count + 1,
        //     foo: 'Hello',
        //     arr: [... mainStore.arr, 4]
        // })

        // 方式三： $patch 一个函数
        // mainStore.$patch(state => {
        //     state.count++
        //     state.foo = 'patch function'
        //     state.arr.push(4)
        // })

        // 方式四：逻辑比较多的时候可以使用action
        mainStore.changeState(10)
    }

</script>

<style lang="less" scoped>

</style>