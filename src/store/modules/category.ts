import { defineStore } from 'pinia'
import { reqC1, reqC2, reqC3 } from '@/api/product/attr'
import type { CategoryResponseData } from '@/api/product/attr/type'
import type { CategoryState } from './types/type'

let useCategoryStore = defineStore('Category', {
  state: (): CategoryState => {
    return {
      // 存储一级分类的数据
      c1Arr: [],
      c2Arr: [],
      c3Arr: [],
      // 存储当前的一级分类
      c1Id: '',
      c2Id: '',
      c3Id: '',
    }
  },
  actions: {
    async getC1() {
      // 发请求获取一级分类的数组
      let result: CategoryResponseData = await reqC1()
      if (result.code === 200) {
        this.c1Arr = result.data
      }
    },
    async getC2() {
      // 发请求获取二级分类的数组
      let result: CategoryResponseData = await reqC2(this.c1Id)
      if (result.code === 200) {
        console.log(result)
        this.c2Arr = result.data
      }
    },
    async getC3() {
      // 发请求获取三级分类的数组
      console.log('getC3()')
      let result: CategoryResponseData = await reqC3(this.c2Id)
      if (result.code === 200) {
        console.log(result)
        this.c3Arr = result.data
      }
    },
  },
  getters: {},
})

export default useCategoryStore
