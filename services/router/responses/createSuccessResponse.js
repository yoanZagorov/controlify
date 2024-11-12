export default function createSuccessResponse(data, isStringified = false) {
  return new Response(
    isStringified
      ? data
      : JSON.stringify({ ...data, statusCode: 200 }), {
    status: 200,
    headers: {
      "Content-Type": "application/json; utf-8"
    }
  });
}