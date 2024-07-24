import { onRequestClient, onResponseClient, onResponseErrorClient } from './interceptor.client'
import type { NitroFetchOptions } from './type'

const _request = $fetch.create({
  baseURL: '',
  /** 请求拦截器 */
  onRequest: onRequestClient,
  onResponse: onResponseClient,
  onResponseError: onResponseErrorClient,
})

function requestClient<R>(url: string, options: NitroFetchOptions) {
  return _request<R>(url, options)
}

export default requestClient
const $fetchClient = _request
export { $fetchClient }
