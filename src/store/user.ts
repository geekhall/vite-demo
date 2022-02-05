import {defineStore} from "pinia"
import { IUser, userLogin } from "../api/user"

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            loginStatus: null as null | string
        }
    },
    getters: {},
    actions: {
        async loginAction(username: string, password: string){
            console.log('pinia user store login method called.')
            const ret = await userLogin(username, password)
            this.loginStatus = ret ? '成功' : '失败'
            return ret
        }
    }
})
