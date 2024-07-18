import consola from '@kk-project/logger/consola'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    if (import.meta.server) {
      consola.error('Vue error', { error, info, instance })
    }
  }

  nuxtApp.hook('vue:error', (error, instance, info) => {
    if (import.meta.server) {
      consola.error('vue:error', { error, info, instance })
    }
  })
})
