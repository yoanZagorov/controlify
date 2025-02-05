import { HTTP_STATUS_CODES } from "@/constants";

export default function createErrorResponse(msg, statusCode = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR) {
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