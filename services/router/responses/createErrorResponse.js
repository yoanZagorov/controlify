export default function createErrorResponse(statusCode, msg) {
  return new Response(
    JSON.stringify(
      {
        msg,
        msgType: "error",
        statusCode,
      }
    ),
    {
      status: statusCode,
      headers: {
        "Content-Type": "application/json"
      },
    }
  );
}