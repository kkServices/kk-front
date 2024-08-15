import type { toast } from 'vue3-toastify'
import type { Logger } from '@kk-project/logger/winston'
import type { $Fetch } from 'ofetch'
import type { NitroFetchRequest } from 'nitropack'

type RequestFunction = <T = unknown>(...args: Parameters<$Fetch<T, NitroFetchRequest>>) => ReturnType<$Fetch<T, NitroFetchRequest>>

declare module '#app' {
  interface NuxtApp {
    $toast: toast
    $logger?: Logger
    $request: $Fetch
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $toast: toast
    $logger?: Logger
    $request: $Fetch
  }
}

export {}
