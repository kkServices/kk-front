import dayjs from 'dayjs'

/**
 * 时间格式化
 * @param time 时间
 * @param template='YYYY-MM-DD HH:mm:ss' 模板
 * @example
 * formatTime('YYYY-MM-DD HH:mm:ss') => '2021-01-01 12:00:00'
 */
function formatTime(time?: dayjs.ConfigType, template?: string): string {
  return dayjs(time).format(template ?? 'YYYY-MM-DD HH:mm:ss')
}

export { formatTime }
