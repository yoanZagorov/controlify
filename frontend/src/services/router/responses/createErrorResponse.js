export default function createErrorResponse(msg, statusCode = 500) {
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