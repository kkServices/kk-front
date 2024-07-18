import type { FetchError } from 'ofetch'
import type { API, APIRequest, APIResponse } from '../type'
import type { AsyncData, UseFetchOptions } from '#app'
import { $fetchClient } from '~/service/kk-api/request/request.client'

interface UseFetchOptionsWithMeta<T> extends UseFetchOptions<T> {
  meta?: MetaServer
}
// export type APIResponse<K extends keyof API> = API[K]['Res']
// export type APIRequest<K extends keyof API> = API[K] extends { Req: infer Req } ? Req : undefined

/**
 * 服务端请求，二次封装useFetch
 */
export function useRequest<K extends keyof API, T = APIResponse<K>>(
  url: K,
  options: UseFetchOptionsWithMeta<T> & { body?: APIRequest<K> } = {},
) {
  return useFetch(url, {
    method: 'post',
    ...options,
    $fetch: useNuxtApp().$request || $fetchClient,
  } as any) as AsyncData<T | null, FetchError | null>
}

/** 自定义Lazy请求 */
export function useLazyRequest<K extends keyof API, T = APIResponse<K>>(
  url: K,
  options: UseFetchOptionsWithMeta<T> & { body?: APIRequest<K> } = {},
) {
  return useLazyFetch(url, {
    method: 'post',
    watch: false,
    ...options,
    $fetch: useNuxtApp().$request || $fetchClient,
  } as any) as AsyncData<T | null, FetchError | null>
}
