export type APIResponse<K extends keyof API> = API[K]['Res']
export type APIRequest<K extends keyof API> = API[K] extends { Req: infer Req } ? Req : undefined

export interface API {
  '/user/query': {
    Res: {
      result: string
    }
  }
  '/company/jxk/doorlock': {
    // Req: {
    //   userLinglingid: string
    // }
    Res: {
      result: string
      status: string
    }
  }
  '/donate/order/create': {
    Res: {
      /**
       * 是否是 API 创建的动态码
       */
      isApi: boolean
      /**
       * 请求支付宝 API 创建订单后查询的外部订单号
       */
      outTradeNo?: string
      /**
       * 二维码地址
       */
      qrCode: string
    }
  }

  '/donate/order/recent': {
    Res: {
      id: number
      totalAmount: number
      payStatus: string
      message: null | string
      messageStatus: 'WAITING' | 'SUCCESS' | 'FAIL'
      userName: null
      emailHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
      time: '2024-08-10T15:08:06.369Z'
    }[]
  }
}
