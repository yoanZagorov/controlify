export default function createSuccessResponse(data = null) {
  return new Response(
    JSON.stringify(data), {
    status: 200
  });
}