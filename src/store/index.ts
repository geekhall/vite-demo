import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import type { App } from "vue";

// 引入对应的模块
import { users } from "./modules/users";

// 手动声明 state 类型
export interface State { }

// 定义注入类型
const key: InjectionKey<Store<State>> = Symbol();

const store = createStore<State>({
  state() { },
  mutations: {},
  actions: {},
  // 使用模块
  modules: { users },
});

// 将类型注入useStore，项目中引用的均为自定义的这个，覆盖了vuex提供的useStore
export function useStore() {
  return baseUseStore(key);
}

export function setupStore(app: App<Element>) {
  app.use(store, key);
}

export default store;

