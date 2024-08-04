export type APIResponse<K extends keyof API> = API[K]['Res']
export type APIRequest<K extends keyof API> = API[K] extends { Req: infer Req } ? Req : undefined

export interface API {
  '/company/jxk/doorlock': {
    // Req: {
    //   userLinglingid: string
    // }
    Res: {
      result: string
      status: string
    }
  }

}
