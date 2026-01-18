/**
 * Creates a form builder for fluent form construction
 * @returns Form builder object
 */
export default function createFormBuilder() {
  const fields: Record<string, any> = {};
  const validators: Record<string, (value: any) => string | undefined> = {};

  return {
    addField<T>(name: string, defaultValue: T): any {
      fields[name] = defaultValue;
      return this;
    },

    addValidator(fieldName: string, validator: (value: any) => string | undefined): any {
      validators[fieldName] = validator;
      return this;
    },

    build() {
      return {
        fields,
        validators,
        validate: (values: Record<string, any>) => {
          const errors: Record<string, string> = {};
          for (const field in validators) {
            const error = validators[field](values[field]);
            if (error) errors[field] = error;
          }
          return errors;
        },
      };
    },
  };
}
