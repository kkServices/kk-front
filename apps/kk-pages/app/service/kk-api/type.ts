export type APIResponse<K extends keyof API> = API[K]['Res']
export type APIRequest<K extends keyof API> = API[K] extends { Req: infer Req } ? Req : undefined

export interface API {
  '/member/detail': {
    // Req?: {
    //   a: 1
    // }
    Res: {
      newMember: number
    }
  }

  '/ssd/sds': {
    Req: {
      a: number
    }
    Res: {
      a: number
    }
  }
}
