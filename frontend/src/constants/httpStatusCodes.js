const HTTP_STATUS_CODES = {
  OK: 200,
  MOVED_PERMANENTLY: 301,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409, // Conflicts with the current state of the server
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503, // Server is not able to handle the request at the moment
}

export default HTTP_STATUS_CODES
