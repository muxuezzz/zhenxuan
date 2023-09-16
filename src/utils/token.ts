// 封装本地存储数据和读取数据的方法

// 本地存储保存token
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('TOKEN', token)
}

// 获取本地存储token
export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN')
}

// 本地存储删除token
export const REMOVE_TOKEN = () => {
  localStorage.removeItem('TOKEN')
}
