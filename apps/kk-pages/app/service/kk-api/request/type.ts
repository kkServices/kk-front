import type { FetchOptions } from 'ofetch'

interface _FetchOptions extends FetchOptions {
  _startTime?: number
  _endTime?: number
  _duration?: number
}

export interface Meta {
  isTransformResponse?: boolean
  ignoreLogin?: boolean

}
export interface MetaClient extends Meta {
  isToastError?: boolean
}

export interface MetaServer extends Meta {
}
/** 请求返回的结果类型 */
export interface RequestResultSuccess<T = unknown> {
  /** 错误码 */
  success: true
  /** 结果 */
  data: T
}
export interface RequestResultError {
  code: number
  data: null
  errorShowType: number
  message: string
  requestId: string
  success: false
  timestamp: string
}
export type RequestResult<T = unknown> = RequestResultSuccess<T> | RequestResultError

/** $fetch options类型 */
export interface NitroFetchOptions extends Exclude<Parameters<typeof $fetch>[1], undefined> {
  meta?: MetaClient
}

export interface FetchOptionsServer extends _FetchOptions {
  meta?: MetaServer
}
export interface FetchOptionsClient extends _FetchOptions {
  meta?: MetaClient
}
