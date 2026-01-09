import { HTTP_STATUS_CODES } from "#constants";
import StatusCodeError from "./StatusCodeError";

export default class ValidationError extends StatusCodeError {
  constructor(message, statusCode = HTTP_STATUS_CODES.BAD_REQUEST, options = {}) {
    super(message, statusCode, options);
  }
}