import { createRouter, createWebHistory } from 'vue-router'
import { constantRoute } from './routers'

//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)

let router = createRouter({
  history: createWebHistory(),
  routes: constantRoute,
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    }
  },
})

export default router
