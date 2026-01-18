/**
 * Unsubscribes from an atom
 * @param unsubscribe - The unsubscribe function from subscribe
 */
export default function unsubscribeAtom(unsubscribe: () => void): void {
  if (typeof unsubscribe === 'function') {
    unsubscribe();
  }
}
