export default class AppError extends Error {
  constructor(statusCode = 500, message = "An error occurred!", options = {}) {
    super(message, options);

    this.statusCode = statusCode;

    if (options.cause) {
      this.cause = options.cause;
    }

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}