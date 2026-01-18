type Deserializable = string | number | boolean | null | Record<string, any> | any[];

const deserializeData = <T = any>(data: string): T => {
  try {
    return JSON.parse(data) as T;
  } catch {
    console.error('Failed to deserialize data');
    return {} as T;
  }
};

export default deserializeData;
