/**
 * Serializes cache to JSON
 * @param cache - Cache object
 * @returns Serialized cache string
 */
export default function serializeCache<K extends string | number, V>(
  cache: any
): string {
  const entries = cache.entries?.();
  return JSON.stringify(Object.fromEntries(entries || []));
}
