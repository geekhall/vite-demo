import {defineStore} from "pinia"

// 1. 定义并导出容器
// 参数1： 容器的ID（'main'），必须唯一，将来Pinia会把所有的容器挂载到根容器
// 参数2： 选项对象
// 返回值是一个函数，调用得到一个容器实例
export const useMainStore = defineStore('main', {
    // 1. 类似于组件的data， 用来存储全局状态的
    // 2. 必须是箭头函数，这是为了更好的TS类型推导
    state: () => {
        return {
            count: 100,
            foo: 'pinia',
            arr: [1, 2, 3]
        }
    },

    // 类似于组件的computed，用来封装计算属性，有缓存功能
    getters: {
        // 函数接受一个可选参数： state 状态对象
        count20(state){
            console.log('count 20 调用了')
            return state.count + 20
        },

        // 如果在getters中使用了this， 则必须手动指定返回值的类型，否则类型推导不出来。
        count30(): number {
            console.log('count 30 调用了')
            return this.count + 30
        }
    },

    // 类似于组件的methods，封装业务逻辑，修改 state
    actions: {
        // 注意：不能使用箭头函数定义actions，因为箭头函数绑定外部 this
        changeState(num: number){
            // 方式1：直接修改
            // this.count++
            // this.foo= 'in the actions'
            // this.arr.push(4)
            // this.arr.push(5)

            // 方式二：使用$patch，性能更优
            this.$patch(state => {
                state.count += num
                state.foo= 'patch in actions '
                state.arr.push(6)
            })
        }
    }
})

// 2. 使用容器中的 state

// 3. 修改state

// 4. 容器中的action的使用
