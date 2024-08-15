import type { FetchContext, FetchResponse } from 'ofetch'
import type { RequestOptions } from './types'

type Context = FetchContext<any> & { response: FetchResponse<ResponseType>, options: Required<RequestOptions> }

const defaultMeta: Required<RequestMeta> = {
  isTransformResponse: true,
  ignoreLogin: false,
  isToastError: true,
}
function showToast(message: string, errorShowType: ERROR_SHOW_TYPE, toastId?: string) {
  const { $toast } = useNuxtApp()
  if (![1, 2, 3].includes(errorShowType))
    return
  let type: 'error' | 'info' | 'warning' = 'error'
  switch (errorShowType) {
    case 2:
      type = 'error'
      break
    case 1:
      type = 'warning'
      break
    case 3:
    default:
      type = 'info'
      break
  }
  setTimeout(() => {
    if (!$toast)
      return
    $toast(message, {
      type,
      toastId,
      autoClose: 5000,
      position: 'top-right',
    })
  }, 10)
}
function getRequestPath(context: FetchContext) {
  const { request: _request, options } = context
  const baseUrl = options.baseURL ?? ''
  return typeof _request === 'string' ? _request.replace(baseUrl, '') : _request as unknown as string
}

async function authInterceptor(context: Context, nuxtApp: any) {
  const { response, options: _options } = context
  const data = response._data as BaseResponseError
  if (data.code === 401 && !_options.meta?.ignoreLogin) {
    if (import.meta.server) {
      await nuxtApp?.runWithContext(() => navigateTo('/hi/123', { replace: true }))
    }
    else {
      showToast(data.message, data.errorShowType, 'interceptor-401')
      await navigateTo('/login', { replace: true })
    }
  }
}

export function onResponseError(context: FetchContext<any, any> & { response: FetchResponse<ResponseType> }, nuxtApp: any): Promise<void> | void {
  const $logger = nuxtApp.$logger
  const { response, request, options } = context
  const statusCode = response.status
  const data = response._data as BaseResponse
  if (import.meta.server) {
    const requestPath = getRequestPath(context)
    $logger?.error(`【HTTP】请求异常：${statusCode}`, { requestPath, request, options, response })
  }

  if (statusCode < 200 || statusCode >= 300) {
    return Promise.reject(createError({ statusCode, message: 'xxx', data }))
  }
}

export async function onResponse(context: FetchContext<any, any> & { response: FetchResponse<ResponseType> }, nuxtApp?: any) {
  const $logger = nuxtApp.$logger
  const { response, options: _options } = context
  const options: RequestOptions = _options
  options._endTime = Date.now()
  options._duration = options._endTime - (options._startTime as number)
  const requestPath = getRequestPath(context)
  const data = response._data as BaseResponse
  const isSuccess = data.success

  if (!isSuccess) {
    const code = data.code
    if (data.message && options.meta?.isToastError && import.meta.client) {
      showToast(data.message, data.errorShowType || 1)
    }
    if (import.meta.server) {
      $logger?.error(`【HTTP】业务状态码异常:${code}`, { requestPath, options, response })
      if (options._duration > 1000) {
        $logger?.warning(`【HTTP】请求耗时过长+${options._duration / 1000}s`, { requestPath, options, response })
      }
    }
    await authInterceptor(context as Context, nuxtApp)

    return Promise.reject(createError({ statusCode: data.code, message: data.message, data }))
  }

  if (options.meta?.isTransformResponse) {
    response._data = data.data
  }
}

export async function onRequestError(context: FetchContext<any, any> & { error: Error }, nuxtApp: any): Promise<void> {
  const $logger = nuxtApp.$logger
  if (import.meta.client && context.error) {
    showToast(context.error.message, ERROR_SHOW_TYPE.ERROR_MESSAGE)
  }
  else if (import.meta.server) {
    const requestPath = getRequestPath(context as any)
    $logger?.error('【HTTP】请求异常', { requestPath, context })
  }
  return Promise.reject(context)
}
export async function onRequest(context: FetchContext<any, any>, _nuxtApp: any) {
  const { options: _options } = context
  const config = useRuntimeConfig()
  const options: RequestOptions = _options
  options.baseURL = config.baseApiHost || config.public.baseApiHost
  options.meta = { ...defaultMeta, ...options.meta }
  options._startTime = Date.now()
  options.headers = {
    ...options.headers,
  }
}
