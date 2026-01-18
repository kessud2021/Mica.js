type DynamicImportOptions = {
  ssr?: boolean;
  loading?: any;
  fallback?: any;
};

const dynamicImport = async <T extends Record<string, any> = {}>(
  importFn: () => Promise<{ default: T }>,
  options?: DynamicImportOptions,
): Promise<T> => {
  try {
    const module = await importFn();
    return module.default;
  } catch (error) {
    console.error('Dynamic import failed:', error);
    throw error;
  }
};

export default dynamicImport;

export type { DynamicImportOptions };
