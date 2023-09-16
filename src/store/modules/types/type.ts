// 定义小仓库state类型
import type { RouteRecordRaw } from 'vue-router'
import type { CategoryObj } from '@/api/product/attr/type'

export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username: string
  avatar: string
}

// 定义分类仓库的ts类型
export interface CategoryState {
  c1Arr: CategoryObj[]
  c1Id: string
  c2Arr: CategoryObj[]
  c2Id: string
  c3Arr: CategoryObj[]
  c3Id: string
}
