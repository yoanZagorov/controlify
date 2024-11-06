export default function createErrorResponse(statusCode, errorMessage) {
  return new Response(
    JSON.stringify({
      error: {
        code: statusCode,
        message: errorMessage,
      },
    }),
    {
      status: statusCode,
      headers: {
        "Content-Type": "application/json", // Indicate that the response is JSON
      },
    }
  );
}