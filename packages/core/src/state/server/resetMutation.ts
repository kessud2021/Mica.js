/**
 * Resets a mutation to initial state
 * @param mutation - The mutation object
 */
export default function resetMutation(mutation: any): void {
  mutation.reset?.();
}
