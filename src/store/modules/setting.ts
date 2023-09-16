// 小仓库 关于layout组件包的
// 创建对应场景的小仓库
import { defineStore } from 'pinia'
// 引入接口api
// 引入数据类型
// import type { loginForm, loginResponseData } from '@/api/user/type'
// import type { UserState } from './types/type'
// import { SET_TOKEN, GET_TOKEN } from "@/utils/token";
// import { constantRoute } from                                                                                                                                                                                                                                             @/router/routers";

let useLayoutSettingStore = defineStore('SettingStore', {
  //存储数据的地方
  state: (): any => {
    return {
      // 侧边菜单栏是否折叠
      fold: false,
      // 控制刷新效果
      refresh: false,
    }
  },
})

export default useLayoutSettingStore
