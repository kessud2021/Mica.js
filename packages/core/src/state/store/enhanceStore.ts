/**
 * Enhances a store with additional functionality
 * @param store - The base store
 * @param enhancer - Enhancement function
 * @returns Enhanced store
 */
export default function enhanceStore<T extends Record<string, any>>(
  store: any,
  enhancer: (store: any) => any
) {
  return enhancer(store);
}
