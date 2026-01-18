/**
 * Mutates data on server
 * @param url - Server endpoint
 * @param method - HTTP method
 * @param data - Data to send
 * @returns Promise with response data
 */
export default async function mutateServerData<T>(
  url: string,
  method: 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  data?: any
): Promise<T> {
  const response = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
}
