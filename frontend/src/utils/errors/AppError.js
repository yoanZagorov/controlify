export default class AppError extends Error {
  constructor(message = "An error occurred!", statusCode = 500, options = {}) {
    super(message, options);

    this.statusCode = statusCode;
    this.message = message;

    if (options.cause) {
      this.cause = options.cause;
    }

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

  }

  // toString() {
  //   return `${this.name}: ${this.message} (Status: ${this.statusCode})${this.cause ? ` | Cause: ${this.cause.message}` : ''}`;
  // }
}