/**
 * Resets an atom to its initial value
 * @param atom - The atom to reset
 */
export default function resetAtomValue(atom: any): void {
  atom.reset?.();
}
