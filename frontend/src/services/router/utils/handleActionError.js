import { createErrorResponse } from "../responses";

export default function handleActionError(error, msg) {
  console.error(error);

  // A defined status code means an explicitly thrown specific StatusCodeError which means that there is a specific message which should be returned
  if (error.statusCode) {
    return createErrorResponse(error.message, error.statusCode);
  }

  // A generic fallback error
  return createErrorResponse(msg);
}