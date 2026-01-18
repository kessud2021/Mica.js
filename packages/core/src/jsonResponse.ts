export default function jsonResponse<T extends Record<string, any>>(
  data: T,
  status = 200
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
