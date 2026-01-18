type SerializableValue = string | number | boolean | null | SerializedObject | SerializedArray;

interface SerializedObject {
  [key: string]: SerializableValue;
}

interface SerializedArray extends Array<SerializableValue> {}

const serializeData = <T extends Record<string, any> = {}>(data: T): string => {
  const serialized: SerializedObject = {};

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key];

      if (typeof value === 'function') {
        continue;
      }

      if (value instanceof Date) {
        serialized[key] = value.toISOString();
      } else if (typeof value === 'object' && value !== null) {
        try {
          serialized[key] = JSON.parse(JSON.stringify(value));
        } catch {
          continue;
        }
      } else {
        serialized[key] = value as SerializableValue;
      }
    }
  }

  return JSON.stringify(serialized);
};

export default serializeData;
