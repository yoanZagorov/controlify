import { HTTP_STATUS_CODES } from "@/constants";

export default function createRedirectResponse(msg = null, location) {
  return new Response(msg, {
    status: HTTP_STATUS_CODES.MOVED_PERMANENTLY,
    headers: {
      Location: location
    }
  });
}