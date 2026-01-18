type ServerActionOptions = {
  revalidate?: number | boolean;
  onError?: (error: Error) => void;
};

type ServerAction<T = void, R = any> = (payload: T) => Promise<R>;

const serverAction = <T = void, R = any>(
  action: ServerAction<T, R>,
  options?: ServerActionOptions,
): ServerAction<T, R> => {
  return async (payload: T): Promise<R> => {
    try {
      const result = await action(payload);
      return result;
    } catch (error) {
      if (options?.onError) {
        options.onError(error as Error);
      }
      throw error;
    }
  };
};

export default serverAction;

export type { ServerAction, ServerActionOptions };
