/**
 * Creates an IndexedDB-backed cache
 * @param dbName - IndexedDB database name
 * @param storeName - Store name
 * @returns IndexedDB cache object
 */
export default function createIndexedDBCache<K extends string | number, V>(
  dbName: string,
  storeName: string
) {
  let db: IDBDatabase | null = null;
  const initPromise = new Promise<IDBDatabase>((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not available'));
      return;
    }

    const request = window.indexedDB.open(dbName, 1);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };
    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;
      if (!database.objectStoreNames.contains(storeName)) {
        database.createObjectStore(storeName);
      }
    };
  });

  return {
    async get(key: K): Promise<V | undefined> {
      const database = db || (await initPromise);
      return new Promise((resolve) => {
        const tx = database.transaction(storeName, 'readonly');
        const request = tx.objectStore(storeName).get(String(key));
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => resolve(undefined);
      });
    },

    async set(key: K, value: V): Promise<void> {
      const database = db || (await initPromise);
      return new Promise((resolve) => {
        const tx = database.transaction(storeName, 'readwrite');
        const request = tx.objectStore(storeName).put(value, String(key));
        request.onsuccess = () => resolve();
      });
    },

    async clear(): Promise<void> {
      const database = db || (await initPromise);
      return new Promise((resolve) => {
        const tx = database.transaction(storeName, 'readwrite');
        const request = tx.objectStore(storeName).clear();
        request.onsuccess = () => resolve();
      });
    },
  };
}
