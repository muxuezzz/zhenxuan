import { createApp } from 'vue'
// import './style.css'
import App from '@/App.vue'

// 清除默认样式
import '@/styles/index.scss'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore ts忽略类型检查
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/theme-chalk/src/message.scss'
// 暗黑模式需要的样式
import 'element-plus/theme-chalk/dark/css-vars.css'

// 引入路由进行注册
import router from './router'
// import { RouterView } from 'vue-router'

const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})

import 'virtual:svg-icons-register'

// 安装自定义插件引入全局组件,"插件"执行gloablComponent的install方法

import gloablComponent from './components/index'
import pinia from '@/store/index.ts'

// 引入路由鉴权
import './permission.ts'

app.use(pinia)
app.use(router)
app.use(gloablComponent)
app.mount('#app')
