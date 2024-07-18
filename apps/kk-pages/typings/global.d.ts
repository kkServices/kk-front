/// <reference path="../node_modules/ofetch/dist/index.d.ts" />

interface Meta {
  isTransformResponse?: boolean
  ignoreLogin?: boolean

}
declare interface MetaClient extends Meta {
  isToastError?: boolean
}

declare interface MetaServer extends Meta {
}
/** 请求返回的结果类型 */
declare interface RequestResult<T = unknown> {
  /** 错误码 */
  code: number
  /** 结果 */
  datas: T
}

/** $fetch options类型 */
declare interface NitroFetchOptions extends Exclude<Parameters<typeof $fetch>[1], undefined> {
  meta?: MetaClient
}
