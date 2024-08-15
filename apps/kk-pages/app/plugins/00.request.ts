import { onRequest, onRequestError, onResponse, onResponseError } from '~/service/kk-service/interceptor'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const $request = $fetch.create({
    baseURL: config.baseApiHost || config.public.baseApiHost,
    onRequest: context => onRequest(context, nuxtApp),
    onRequestError: context => onRequestError(context, nuxtApp),
    onResponse: context => onResponse(context, nuxtApp),
    onResponseError: context => onResponseError(context, nuxtApp),
  })

  return {
    provide: {
      request: $request,
    },
  }
})
