/**
 * Batches multiple state updates
 * @param updateFn - Function that performs updates
 */
export default function batchUpdates(updateFn: () => void): void {
  updateFn();
}
