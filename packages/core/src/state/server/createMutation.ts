/**
 * Creates a mutation object with status tracking
 * @param mutationFn - Mutation function
 * @returns Mutation object
 */
export default function createMutation<TData = void, TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<TData>
) {
  let data: TData | null = null;
  let status: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  let error: Error | null = null;
  const subscribers = new Set<(state: any) => void>();

  const notify = () => {
    subscribers.forEach((cb) => cb({ data, status, error }));
  };

  const mutate = async (variables: TVariables) => {
    status = 'loading';
    error = null;
    notify();

    try {
      data = await mutationFn(variables);
      status = 'success';
    } catch (err) {
      error = err as Error;
      status = 'error';
      throw error;
    }

    notify();
    return data;
  };

  return {
    mutate,

    get() {
      return { data, status, error };
    },

    reset(): void {
      data = null;
      status = 'idle';
      error = null;
      notify();
    },

    subscribe(callback: (state: any) => void) {
      subscribers.add(callback);
      callback({ data, status, error });
      return () => subscribers.delete(callback);
    },
  };
}
