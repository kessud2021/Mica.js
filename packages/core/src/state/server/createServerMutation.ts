/**
 * Creates a server mutation
 * @param mutationFn - Function to perform mutation
 * @returns Mutation object
 */
export default function createServerMutation<TData, TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<TData>
) {
  let data: TData | null = null;
  let loading = false;
  let error: Error | null = null;
  const subscribers = new Set<(state: any) => void>();

  const notify = () => {
    subscribers.forEach((cb) => cb({ data, loading, error }));
  };

  return {
    async mutate(variables: TVariables): Promise<TData> {
      loading = true;
      error = null;
      notify();

      try {
        data = await mutationFn(variables);
        error = null;
      } catch (err) {
        error = err as Error;
        throw error;
      } finally {
        loading = false;
        notify();
      }

      return data;
    },

    get() {
      return { data, loading, error };
    },

    reset(): void {
      data = null;
      loading = false;
      error = null;
      notify();
    },

    subscribe(callback: (state: any) => void) {
      subscribers.add(callback);
      callback({ data, loading, error });
      return () => subscribers.delete(callback);
    },
  };
}
