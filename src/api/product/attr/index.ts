// 书写属性相关的api
import request from '@/utils/request'
import type { CategoryResponseData, AttrResponseData } from './type'

// 属性管理模块的接口
enum API {
  C1_URL = '/admin/product/getCategory1',
  C2_URL = '/admin/product/getCategory2/',
  C3_URL = '/admin/product/getCategory3/',
  ATTR_URL = '/admin/product/attrInfoList/',
  ADDORUPDATE_URL = '/admin/product/saveAttrInfo',
  DELETEATTR_URL = '/admin/product/deleteAttr/',
}

// 获取一级分类的接口方法
export const reqC1 = () => request.get<any, any>(API.C1_URL)
// 获取二\三级分类的接口方法
export const reqC2 = (category1id: number | string) =>
  request.get<any, CategoryResponseData>(API.C2_URL + category1id)
export const reqC3 = (category2id: number | string) =>
  request.get<any, CategoryResponseData>(API.C3_URL + category2id)
// 获取属性列表的接口方法
export const reqAttr = (
  category1id: number | string,
  category2id: number | string,
  category3id: number | string,
) =>
  request.get<any, AttrResponseData>(
    API.ATTR_URL + `${category1id}/${category2id}/${category3id}`,
  )
// 新增或者修改
export const reqAddOrUpdateAttr = (data: any) =>
  request.post<any, any>(API.ADDORUPDATE_URL, data)
// 删除属性
export const reqRemoveAttr = (attrId: number | string) =>
  request.delete<any, any>(API.DELETEATTR_URL + attrId)
