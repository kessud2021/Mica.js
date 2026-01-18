/**
 * Adds middleware to a store
 * @param store - The store object
 * @param middleware - Middleware function
 * @returns Wrapped store
 */
export default function middlewareStore<T extends Record<string, any>>(
  store: any,
  middleware: (state: T, action: any) => void
) {
  store.use?.(middleware);
  return store;
}
