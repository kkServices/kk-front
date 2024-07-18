import type { FetchError } from 'ofetch'
import type { API, APIRequest, APIResponse } from '../type'
import { $fetchClient } from '../request/request.client'
import type { AsyncData, UseFetchOptions } from '#app'

interface UseFetchOptionsWithMeta<T> extends UseFetchOptions<T> {
  meta?: MetaClient
}

/** 自定义请求 */
export function useRequestClient<K extends keyof API, T = APIResponse<K>>(
  url: keyof API,
  options: UseFetchOptionsWithMeta<T> & { body?: APIRequest<K> } = {},
): AsyncData<T | null, FetchError | null> {
  return useFetch(url, {
    method: 'post',
    ...options,
    server: false,
    $fetch: $fetchClient,
  }) as AsyncData<T | null, FetchError | null>
}

/** 自定义Lazy请求 */
export function useLazyRequestClient<K extends keyof API, T = APIResponse<K>>(
  url: keyof API,
  options: UseFetchOptionsWithMeta<T> & { body?: APIRequest<K> } = {},
) {
  return useLazyFetch(url, {
    watch: false,
    method: 'post',
    ...options,
    server: false,
    $fetch: $fetchClient,
  })
}
