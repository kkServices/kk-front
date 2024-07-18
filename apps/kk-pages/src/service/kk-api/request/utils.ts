import type { FetchContext } from 'ofetch'
import qs from 'qs'

function transformBody(options: FetchContext['options']) {
  const token = useCookie('key')
  const deliveryTypeStrH5 = useCookie('deliveryTypeStrH5')
  const data = {
    ...options.body as Record<string, unknown>,
    clientType: 'wap',
    token: unref(token),
    deliveryTypeStr: unref(deliveryTypeStrH5),
  }

  return qs.stringify(data)
}

function isFormUrlencoded(options: FetchContext['options']) {
  const contentType = (options.headers as any)['Content-Type']
  return contentType.includes('application/x-www-form-urlencoded')
}

export { transformBody, isFormUrlencoded }
