/**
 * Sets the value of an atom
 * @param atom - The atom to update
 * @param value - The new value
 */
export default function setAtomValue<T>(atom: any, value: T | ((prev: T) => T)): void {
  atom.set?.(value);
}
