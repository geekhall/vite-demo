<template>
    <h1>Father Component.</h1>
    <hr/>
    <V3Demo4 msg="Welcome to your Vue.js App" @sendMsg="msgHandler"/>
</template>

<script lang="ts">
    import {defineComponent} from 'vue'
    import V3Demo4 from "view/V3Demo4";

    export default defineComponent({
        components: {
            V3Demo4
        },
        setup() {
            const msgHandler = value => {
                console.log("setup -> value :", value);
            }
            return msgHandler
        },
    })
</script>

<style lang="less" scoped>

</style>