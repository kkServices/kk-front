import { onRequestClient, onResponseClient, onResponseErrorClient } from './interceptor.client'

const _request = $fetch.create({
  baseURL: '',
  /** 请求拦截器 */
  onRequest: onRequestClient,
  onResponse: onResponseClient,
  onResponseError: onResponseErrorClient,
})

function requestClient<R = any>(url: string, options: NitroFetchOptions) {
  return _request<R>(url, options)
}

export default requestClient
const $fetchClient = _request
export { $fetchClient }
