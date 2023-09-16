// 创建对应场景的小仓库
import { defineStore } from 'pinia'
// 引入接口api
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'
// 引入数据类型
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from '@/api/user/type'
// import type { loginForm, loginResponseData } from '@/api/user/type'
import type { UserState } from './types/type'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import { constantRoute } from '@/router/routers'

let useUserStore = defineStore('user', {
  //存储数据的地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
      username: '',
      avatar: '',
    }
  },
  actions: {
    async userLogin(data: loginFormData) {
      // 登录请求

      let result: loginResponseData = await reqLogin(data)
      // 登录成功:200->token
      if (result.code === 200) {
        console.log('登录成功')
        // 使用pinia存储一下token
        // pinia|vuex实际上都是利用js对象存储数据
        console.log(result.data as string)
        this.token = result.data as string
        // 需要本地化持久存储一份
        SET_TOKEN(result.data as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
      // 登录失败:201->登录失败错误的信息
    },
    // 获取用户信息的方法
    async userInfo() {
      // 获取用户信息
      let result: userInfoResponseData = await reqUserInfo()
      console.log(result)
      if (result.code === 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        return 'ok'
      } else {
        return Promise.reject(result.message)
      }
    },

    async userLogout() {
      // // 目前没有mock接口,退出登录
      // this.token = '';
      // this.username = '';
      // this.avatar = '';
      // REMOVE_TOKEN();

      let result = await reqLogout()
      // console.log(result)
      if (result.code == 200) {
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})

export default useUserStore
