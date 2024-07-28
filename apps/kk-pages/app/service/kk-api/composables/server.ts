import type { FetchError } from 'ofetch'
import type { API, APIRequest, APIResponse } from '../type'
import type { AsyncData, UseFetchOptions } from '#app'
import { $fetchClient } from '~/service/kk-api/request/request.client'
import type { MetaServer } from '~/service/kk-api/request/type'

interface UseFetchOptionsWithMeta<T> extends UseFetchOptions<T> {
  meta?: MetaServer
}

/**
 * 服务端请求，二次封装useFetch
 */
export function useRequest<K extends keyof API, T = APIResponse<K>>(
  url: K,
  options: UseFetchOptionsWithMeta<T> & { body?: APIRequest<K> } = {},
) {
  return useFetch(url, {
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
    watch: false,
    ...options,
    $fetch: useNuxtApp().$request || $fetchClient,
  } as any) as AsyncData<T | null, FetchError | null>
}
