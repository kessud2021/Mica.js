type FetchDataOptions = RequestInit & {
  revalidate?: number | false;
  tags?: string[];
};

const fetchData = async <T = any>(url: string, options?: FetchDataOptions): Promise<T> => {
  try {
    const response = await fetch(url, {
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Fetch failed with status ${response.status}`);
    }

    return (await response.json()) as T;
  } catch (error) {
    console.error('Data fetch failed:', error);
    throw error;
  }
};

export default fetchData;

export type { FetchDataOptions };
