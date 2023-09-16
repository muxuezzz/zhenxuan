// 进行二次封装：使用请求和响应拦截器
import axios from 'axios'
import { ElMessage } from 'element-plus'

// 引入用户相关仓库
import useUserStore from '@/store/modules/user'
import useStore from 'element-plus/es/components/table/src/store'

//创建axios实例
let request = axios.create({
  // 基础路径设置
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})

// 添加请求拦截器
request.interceptors.request.use((config) => {
  let useStore = useUserStore()
  if (useStore.token) {
    config.headers.token = useStore.token
  }
  // console.log(useStore);
  // 返回修改后的配置对象
  return config
})

// 添加响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    let msg = ' '
    let status = error.response.status
    switch (status) {
      case 401:
        msg = 'token过期'
        break
      case 403:
        msg = '无权访问'
        break
      case 404:
        msg = '请求地址错误'
        break
      case 500:
        msg = '服务器出现问题'
        break
      default:
        msg = '无网络'
    }
    ElMessage({
      type: 'error',
      message: msg,
    })
    return Promise.reject(error)
  },
)

export default request
