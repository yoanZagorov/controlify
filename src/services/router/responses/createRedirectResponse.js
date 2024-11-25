export default function createRedirectResponse(msg = null, location) {
  return new Response(msg, {
    status: 302,
    headers: {
      Location: location
    }
  });
}