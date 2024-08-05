import type { FetchContext, FetchResponse } from 'ofetch'
import { statusCodeError } from './errorHandler'
import type { FetchOptionsServer, MetaServer, RequestResult } from './type'
import type { NuxtApp } from '#app'

const defaultMeta: Required<MetaServer> = {
  isTransformResponse: true,
  ignoreLogin: false,
}
interface LogMessage {
  request: RequestInfo
  options: FetchOptionsServer
}
function getRequestPath(context: LogMessage) {
  const { request: _request, options } = context
  const baseUrl = options.baseURL ?? ''
  return typeof _request === 'string' ? _request.replace(baseUrl, '') : _request
}
const onRequestServer = function ({ options: _options }: FetchContext) {
  if (!_options.baseURL) {
    _options.baseURL = useRuntimeConfig().public.baseApiHost
  }

  const options: FetchOptionsServer = _options
  options.meta = { ...defaultMeta, ...options.meta }
  options._startTime = Date.now()

  options.headers = {
    ...options.headers,
  }
}

function onResponseServer<R>(nuxtApp: NuxtApp) {
  return async function (context: FetchContext & { response: FetchResponse<R> }) {
    const { request, response, options: _options } = context
    const options: FetchOptionsServer = _options
    options._endTime = Date.now()
    options._duration = options._endTime - (options._startTime as number)
    const requestPath = getRequestPath({ request, options })
    const data = response._data as RequestResult<R>
    const isSuccess = data.success
    if (!isSuccess) {
      const code = data.code
      logger.error(`【HTTP】业务状态码异常:${code}`, { path: requestPath, options: _options, response })
      if (code === 401 && !options.meta?.ignoreLogin) {
        await nuxtApp.runWithContext(() => navigateTo('/login'))
      }

      return Promise.reject(createError({ statusCode: data.code, message: data.message, data }))
    }

    if (options._duration > 1000) {
      logger.warn(`【HTTP】请求耗时过长+${options._duration / 1000}s`, { path: requestPath, options: _options, response })
    }
    else {
      logger.debug('【HTTP】请求成功', { path: requestPath, options: _options, response })
    }

    if (options.meta?.isTransformResponse) {
      response._data = data.data
    }
  }
}
function onResponseErrorServer<R>(context: FetchContext & { response: FetchResponse<R> }) {
  const { response, options, request } = context
  const statusCode = response.status
  const data = response._data as RequestResult<R>
  const requestPath = getRequestPath({ request, options })
  logger.error(`【HTTP】请求异常：${statusCode}`, { path: requestPath, request, options, response })

  if (statusCode < 200 || statusCode >= 300) {
    throw createError({ statusCode, message: statusCodeError(statusCode), data })
  }
}

function onRequestErrorServer(context: FetchContext & { error: Error }) {
  logger.error('【HTTP】请求异常', context)
  return Promise.reject(context)
}

export { onRequestServer, onResponseServer, onResponseErrorServer, onRequestErrorServer }
