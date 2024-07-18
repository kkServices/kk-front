import requestServer from '~/service/kk-api/request/request.server'

export default defineNuxtPlugin((nuxtApp) => {
  const $request = requestServer(nuxtApp as any)

  return {
    provide: {
      request: $request,
    },
  }
})
