export default function createErrorResponse(statusCode, msg) {
  return new Response(
    JSON.stringify(
      {
        msg,
        msgType: "error",
        statusCode,
        resetKey: Date.now()
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