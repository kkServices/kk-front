import type { Logger } from 'winston'
import { createLogger, format, transports } from 'winston'
import type * as Transport from 'winston-transport'

const { combine, timestamp, colorize, printf } = format

const alignColorsAndTime = combine(
  // eslint-disable-next-line node/prefer-global/process
  colorize({ all: process.env.NODE_ENV === 'development', level: process.env.NODE_ENV === 'development' }),
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  printf(
    (info) => {
      const { timestamp, level, message, ...args } = info
      return `[${level}] ${timestamp} : ${message} - ${JSON.stringify(args)}`
    },
  ),
)

const transportList: Transport[] = [new transports.Console({
  format: alignColorsAndTime,
})]

const logger = createLogger({
  transports: transportList,
})

export default logger
export type { Logger }
