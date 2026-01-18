import { useState, useCallback } from 'react';

type UseMapReturn<K, V> = {
  map: Map<K, V>;
  set: (key: K, value: V) => void;
  get: (key: K) => V | undefined;
  has: (key: K) => boolean;
  delete: (key: K) => boolean;
  clear: () => void;
  size: number;
};

const useMap = <K, V>(initialMap?: Map<K, V> | [[K, V], ...]): UseMapReturn<K, V> => {
  const [map, setMap] = useState<Map<K, V>>(() => {
    return new Map(initialMap);
  });

  const set = useCallback((key: K, value: V) => {
    setMap(m => new Map(m).set(key, value));
  }, []);

  const get = useCallback((key: K) => {
    return map.get(key);
  }, [map]);

  const has = useCallback((key: K) => {
    return map.has(key);
  }, [map]);

  const deleteKey = useCallback((key: K) => {
    const newMap = new Map(map);
    const result = newMap.delete(key);
    setMap(newMap);
    return result;
  }, [map]);

  const clear = useCallback(() => {
    setMap(new Map());
  }, []);

  return { map, set, get, has, delete: deleteKey, clear, size: map.size };
};

export default useMap;
