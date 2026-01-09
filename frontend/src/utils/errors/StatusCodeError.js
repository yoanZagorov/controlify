import { HTTP_STATUS_CODES } from '#constants'

export default class StatusCodeError extends Error {
  constructor(
    message = '',
    statusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
    options = {},
  ) {
    super(message, options)

    this.message = message
    this.statusCode = statusCode
    this.options = options

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}
