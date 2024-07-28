import logger from '@kk-project/logger/winston'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      logger,
    },
  }
})
