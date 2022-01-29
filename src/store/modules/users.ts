import { createStore } from "vuex";

export interface State { }

export const users = createStore<State>({
    state: () => ({}),
    getters: {},
    mutations: {},
    actions: {},
})