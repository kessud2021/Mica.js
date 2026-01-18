/**
 * Flushes pending state updates
 * @param state - The state to flush
 */
export default function flushUpdates(state: any): void {
  state.flush?.();
}
