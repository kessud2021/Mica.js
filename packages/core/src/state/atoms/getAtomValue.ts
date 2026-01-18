/**
 * Gets the current value of an atom
 * @param atom - The atom to get the value from
 * @returns The current value
 */
export default function getAtomValue<T>(atom: any): T {
  return atom.get?.() || atom.getValue?.();
}
