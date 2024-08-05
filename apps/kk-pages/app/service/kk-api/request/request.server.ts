import { onRequestErrorServer, onRequestServer, onResponseErrorServer, onResponseServer } from './interceptor.server'
import type { NuxtApp } from '#app'

function requestServer(nuxtApp: NuxtApp) {
  const config = useRuntimeConfig()
  return $fetch.create({
    baseURL: config.baseApiHost || config.public.baseApiHost,
    /** 请求拦截器 */
    onRequest: onRequestServer,
    onRequestError: onRequestErrorServer,
    onResponse: onResponseServer (nuxtApp),
    onResponseError: onResponseErrorServer,

  })
}

export default requestServer
