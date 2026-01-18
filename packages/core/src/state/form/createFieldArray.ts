/**
 * Creates a field array for dynamic form fields
 * @param form - The form state object
 * @param arrayKey - Key of the array field
 * @returns Field array methods
 */
export default function createFieldArray<T extends Record<string, any>>(
  form: any,
  arrayKey: keyof T
) {
  return {
    push(item: any): void {
      const current = form.getValue?.(arrayKey) || [];
      form.setValue?.(arrayKey, [...current, item]);
    },

    remove(index: number): void {
      const current = form.getValue?.(arrayKey) || [];
      form.setValue?.(
        arrayKey,
        current.filter((_: any, i: number) => i !== index)
      );
    },

    insert(index: number, item: any): void {
      const current = form.getValue?.(arrayKey) || [];
      current.splice(index, 0, item);
      form.setValue?.(arrayKey, [...current]);
    },

    swap(indexA: number, indexB: number): void {
      const current = form.getValue?.(arrayKey) || [];
      const temp = current[indexA];
      current[indexA] = current[indexB];
      current[indexB] = temp;
      form.setValue?.(arrayKey, [...current]);
    },

    move(from: number, to: number): void {
      const current = form.getValue?.(arrayKey) || [];
      const item = current.splice(from, 1)[0];
      current.splice(to, 0, item);
      form.setValue?.(arrayKey, [...current]);
    },

    get length(): number {
      return (form.getValue?.(arrayKey) || []).length;
    },
  };
}
