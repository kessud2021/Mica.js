/**
 * Hook-like mutation function
 * @param mutationFn - Mutation function
 * @returns Mutation object
 */
export default function useMutation<TData = void, TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<TData>
) {
  let data: TData | null = null;
  let loading = false;
  let error: Error | null = null;
  const subscribers = new Set<(state: any) => void>();

  const notify = () => {
    subscribers.forEach((cb) => cb({ data, loading, error }));
  };

  const mutate = async (variables: TVariables) => {
    loading = true;
    error = null;
    notify();

    try {
      data = await mutationFn(variables);
      loading = false;
    } catch (err) {
      error = err as Error;
      loading = false;
      throw error;
    }

    notify();
    return data;
  };

  return {
    data,
    loading,
    error,

    mutate,

    reset() {
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
