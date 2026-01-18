/**
 * Creates a lazy-loaded store
 * @param loader - Async function that loads the store
 * @returns Lazy store
 */
export default function lazyStore<T extends Record<string, any>>(
  loader: () => Promise<any>
) {
  let store: any = null;
  let loading = false;
  let loaded = false;
  const subscribers = new Set<(store: any) => void>();

  const load = async () => {
    if (loading || loaded) return;
    loading = true;
    store = await loader();
    loaded = true;
    loading = false;
    subscribers.forEach((cb) => cb(store));
  };

  return {
    async getStore(): Promise<any> {
      if (!loaded) {
        await load();
      }
      return store;
    },

    isLoaded(): boolean {
      return loaded;
    },

    subscribe(callback: (store: any) => void): () => void {
      subscribers.add(callback);
      if (loaded && store) {
        callback(store);
      }
      return () => subscribers.delete(callback);
    },
  };
}
