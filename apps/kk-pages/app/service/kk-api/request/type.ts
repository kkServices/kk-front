import type { FetchOptions } from 'ofetch'

export enum ERROR_SHOW_TYPE {
  // 不提示
  SILENT = 0,
  // 警告消息
  WARN_MESSAGE = 1,
  // 错误消息
  ERROR_MESSAGE = 2,
  // 通知消息
  NOTIFICATION = 3,
  // 页面消息
  REDIRECT = 9,
}

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
  errorShowType: ERROR_SHOW_TYPE
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
