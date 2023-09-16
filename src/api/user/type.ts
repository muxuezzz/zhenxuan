// 定义用户相关数据的ts类型

// 用户登录接口携带的数据类型
export interface loginFormData {
  username: string
  password: string
}

// 定义全部接口返回数据都拥有的数据类型
interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 登录接口返回的参数类型
export interface loginResponseData extends ResponseData {
  data: string
}

// 获取用户信息接口返回的参数类型
export interface userInfoResponseData extends ResponseData {
  data: {
    routes: string[]
    buttons: string[]
    roles: string[]
    name: string
    avatar: string
  }
}

interface userInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}

// 定义服务器返回用户信息相关的数据类型
interface user {
  checkUser: userInfo
}

export interface userResponseData {
  code: number
  data: user
}
