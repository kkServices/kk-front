import type { FetchOptions } from 'ofetch'

interface _FetchOptions extends FetchOptions {
  _startTime?: number
  _endTime?: number
  _duration?: number
}

export interface FetchOptionsServer extends _FetchOptions {
  meta?: MetaServer
}
export interface FetchOptionsClient extends _FetchOptions {
  meta?: MetaClient
}
