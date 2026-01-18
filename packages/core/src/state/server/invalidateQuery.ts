/**
 * Invalidates a query to force refetch
 * @param query - The query object
 * @returns Promise that resolves when query is invalidated
 */
export default async function invalidateQuery(query: any): Promise<void> {
  return query.refetch?.() || Promise.resolve();
}
