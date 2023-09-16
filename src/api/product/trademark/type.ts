export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 已有的某个品牌数据类型
export interface Trademark {
  id?: number
  tmName: string
  logoUrl: string
}

export type Records = Trademark[]

export interface TrademarkResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    serachCount: boolean
    pages: number
  }
}
