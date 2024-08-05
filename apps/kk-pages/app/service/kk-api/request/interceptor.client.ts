import type { FetchContext, FetchResponse } from 'ofetch'
import { statusCodeError } from './errorHandler'
import type { FetchOptionsClient, MetaClient, RequestResult } from './type'

const defaultMeta: Required<MetaClient> = {
  isTransformResponse: true,
  ignoreLogin: false,
  isToastError: true,
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
      console.error(data.message)
      // showToast(data.datas.error)
    }
    if (data.code === 401 && !options.meta?.ignoreLogin) {
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
    throw createError({ statusCode, message: statusCodeError(statusCode), data })
  }
}

function onRequestErrorClient(context: FetchContext & { error: Error }) {
  return Promise.reject(context)
}

export { onRequestClient, onResponseClient, onResponseErrorClient, onRequestErrorClient }
