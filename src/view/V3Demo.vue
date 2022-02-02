<template>
    <h1>Composition API Sample (Use ref)</h1>
    <input type="text" v-model="num1" @keyup="add()">
    <span>+</span>
    <input type="text" v-model="num2" @keyup="add()">
    <span>=</span>
    {{result}}

</template>

<script lang="ts">
    import {ref } from "vue";

    export default {
        name: "CompositionAPISample",
        props: {
            msg: String
        },
        setup() {
            const num1 = ref(0);
            const num2 = ref(0);
            const result = ref(0);

            function add() {
                result.value = parseInt(num1.value) + parseInt(num2.value)
            }

            return {
                num1,
                num2,
                result,
                add
            };
        }
    }
</script>

<style lang="less" scoped>

</style>