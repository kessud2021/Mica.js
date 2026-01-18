/**
 * Deserializes cache from JSON
 * @param cache - Cache object
 * @param serialized - Serialized cache string
 */
export default function deserializeCache<K extends string | number, V>(
  cache: any,
  serialized: string
): void {
  try {
    const data = JSON.parse(serialized);
    for (const key in data) {
      cache.set?.(key, data[key]);
    }
  } catch (error) {
    console.error('Failed to deserialize cache:', error);
  }
}
