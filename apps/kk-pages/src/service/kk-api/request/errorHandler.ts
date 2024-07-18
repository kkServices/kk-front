export function statusCodeError(code: number) {
  switch (code) {
    case 401:
      return '未登录'
    case 403:
      return '没有权限'
    case 404:
      return '请求错误'
    case 405:
      return '请求方法错误'
    case 500:
      return '服务器错误'
    default:
      return '未知错误'
  }
}
