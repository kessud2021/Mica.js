/**
 * Fetches data from server
 * @param url - Server endpoint
 * @param options - Fetch options
 * @returns Promise with server data
 */
export default async function fetchServerData<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return response.json();
}
