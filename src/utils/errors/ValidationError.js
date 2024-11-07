import AppError from "./AppError";

export default class ValidationError extends AppError {
  constructor(statusCode = 400, message, options = {}) {
    super(message, statusCode, options);
  }
}