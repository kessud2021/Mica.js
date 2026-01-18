/**
 * Composes multiple store enhancers
 * @param enhancers - Store enhancer functions
 * @returns Composed enhancer
 */
export default function composeStore(...enhancers: Array<(store: any) => any>) {
  return (store: any) => {
    return enhancers.reduce((acc, enhancer) => enhancer(acc), store);
  };
}
