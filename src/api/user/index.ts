//统一管理用户相关的接口
import request from '@/utils/request'
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from './type'

//importtype{loginForm,loginResponseData,userResponseData}from"./type"

//enumAPI{
//LOGIN_URL="/user/login",
//USERINFO_URL="/user/info",

//}

////登录接口方法的暴露
//exportconstreqLogin=(data:loginForm)=>request.post<any,loginResponseData>(API.LOGIN_URL,data);
////获取用户信息方法的暴露
//exportconstreqUserInfo=()=>request.get<any,userResponseData>(API.USERINFO_URL);

enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}
// 登录接口方法的暴露
export const reqLogin = (data: loginFormData) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)
// 获取用户信息
export const reqUserInfo = () =>
  request.get<any, userInfoResponseData>(API.USERINFO_URL)
// 退出登录
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
