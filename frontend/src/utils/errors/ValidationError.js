import AppError from "./AppError";

export default class ValidationError extends AppError {
  constructor(message, statusCode = 400, options = {}) {
    super(message, statusCode, options);
  }
}