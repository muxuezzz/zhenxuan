import router from '@/router'
import nprogress from 'nprogress'
// 引入进度条后还要引入其样式,否则不会生效，css样式可自主修改
import 'nprogress/nprogress.css'

// 获取用户仓库中的token判断用户是否登录
import useUserStore from './store/modules/user'
import pinia from './store'
import setting from './setting'
let userStore = useUserStore(pinia)

// 全局前置守卫
router.beforeEach(async (to, _from, next) => {
  document.title = `${setting.title} - ${to.meta.title}`

  // next是放行函数,作为beforeEach的出口
  nprogress.start()
  let token = userStore.token
  let username = userStore.username
  if (token) {
    if (to.path === '/login') {
      next({ path: '/home' })
    } else {
      // 如果有用户信息，就放行
      if (username) {
        next()
      } else {
        // 如果没有用户信息，在守卫这发送请求，获取用户信息
        try {
          // await返回的是promise的结果，如果成功就是成功的结果，如果失败就是失败的结果
          // 获取用户信息以后再放行
          await userStore.userInfo()
          next()
        } catch (error) {
          // 如果获取用户信息失败，就重新登录

          // token失效，退出登录，清除所有登录信息
          userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })

          // 用户手动修改了token，清除token
        }
      }
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      // 保存重定向的信息，确保登录后回到原界面
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

// 全局后置守卫
router.afterEach(async (_to, _from) => {
  nprogress.done()
})

// 第一个业务，切换路由的时候显示进度条，--nprogress
// 第二个业务，路由鉴权

// 全部路由组件:登录|404|任意路由|首页|数据大屏|权限管理(三个子路由)|商品管理(四个子路由)|设置
// 用户未登录:可以访问login，其他的都不能访问
// 用户已登录:不可以访问login[让访问login指向首页]，其余的路由可以访问
