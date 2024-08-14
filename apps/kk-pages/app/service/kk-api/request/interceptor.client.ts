import type { FetchContext, FetchResponse } from 'ofetch'
import { statusCodeError } from './errorHandler'
import type { FetchOptionsClient, MetaClient, RequestResult } from './type'
import { ERROR_SHOW_TYPE } from './type'

const defaultMeta: Required<MetaClient> = {
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
      type = 'info'
      break
  }

  $toast(message, {
    type,
    toastId,
    autoClose: 5000,
    position: 'top-right',
  })
}

function onRequestClient({ options: _options }: FetchContext) {
  const options: FetchOptionsClient = _options
  options.meta = { ...defaultMeta, ...options.meta }
  if (!options.baseURL) {
    options.baseURL = useRuntimeConfig().public.baseApiHost
  }
}

async function onResponseClient<R = RequestResult<unknown>>(context: FetchContext & { response: FetchResponse<R> }) {
  const { response, options: _options } = context
  const options: FetchOptionsClient = _options
  const data = response._data as RequestResult<R>
  const isSuccess = data.success
  const router = useRouter()
  if (!isSuccess) {
    if (data.message && options.meta?.isToastError) {
      showToast(data.message, data.errorShowType)
    }
    if (data.code === 401 && !options.meta?.ignoreLogin) {
      showToast(data.message, data.errorShowType, 'interceptor-401')
      await router.push('/login')
    }

    return Promise.reject(createError({ statusCode: data.code, message: data.message || statusCodeError(data.code), data }))
  }

  if (options.meta?.isTransformResponse) {
    response._data = data.data
  }
}
async function onResponseErrorClient<R>(context: FetchContext & { response: FetchResponse<R> }) {
  const { response } = context
  const statusCode = response.status
  const data = response._data
  if (statusCode < 200 || statusCode >= 300) {
    showToast(statusCodeError(statusCode), ERROR_SHOW_TYPE.ERROR_MESSAGE)
    return Promise.reject(createError({ statusCode, message: statusCodeError(statusCode), data }))
  }
}

function onRequestErrorClient(context: FetchContext & { error: Error }) {
  showToast(context.error.message, ERROR_SHOW_TYPE.ERROR_MESSAGE)
  return Promise.reject(context)
}

export { onRequestClient, onResponseClient, onResponseErrorClient, onRequestErrorClient }
