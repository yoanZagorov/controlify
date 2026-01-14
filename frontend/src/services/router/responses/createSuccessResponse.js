import { HTTP_STATUS_CODES } from '#/constants'

// A successful response
export default function createSuccessResponse(data, isStringified = false) {
  return new Response(
    isStringified
      ? data
      : JSON.stringify({ ...data, statusCode: HTTP_STATUS_CODES.OK }),
    {
      status: HTTP_STATUS_CODES.OK,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
}
