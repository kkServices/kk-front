import _logger from '@kk-project/logger/winston'

function createLogger() {
  if (import.meta.server) {
    return _logger
  }
  else {
    return console
  }
}
const logger = createLogger()

export { logger }
