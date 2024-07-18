import type { FetchContext, FetchResponse } from 'ofetch'
import { isFormUrlencoded, transformBody } from './utils'
import { statusCodeError } from './errorHandler'
import type { FetchOptionsClient } from './type'

const defaultMeta: Required<MetaClient> = {
  isTransformResponse: true,
  ignoreLogin: false,
  isToastError: true,
}

function onRequestClient({ options: _options }: FetchContext) {
  const options: FetchOptionsClient = _options
  options.meta = { ...defaultMeta, ...options.meta }
  const type = options.method?.toUpperCase() || 'GET'
  if (!options.baseURL) {
    options.baseURL = useRuntimeConfig().public.baseApiHost
  }

  options.headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    ...options.headers,
  }

  if (type !== 'GET' && isFormUrlencoded(options)) {
    options.body = transformBody(options)
  }
}

async function onResponseClient<R>(context: FetchContext & { response: FetchResponse<R> }) {
  const { response, options: _options } = context
  const options: FetchOptionsClient = _options
  const data = response._data
  const code = data.code
  const router = useRouter()
  if (code !== 200) {
    if (data.datas?.error && options.meta?.isToastError) {
      console.error(data.datas.errors)
      // showToast(data.datas.error)
    }
    if (code === 401 && !options.meta?.ignoreLogin) {
      await router.push('/login')
    }

    throw createError({ statusCode: data.code, message: data.datas.error || statusCodeError(code), data })
  }

  if (options.meta?.isTransformResponse) {
    response._data = data.datas
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

export { onRequestClient, onResponseClient, onResponseErrorClient }
