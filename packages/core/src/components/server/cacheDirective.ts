type CacheDirectiveType = 'revalidate' | 'no-store' | 'force-dynamic';

type CacheConfig = {
  type: CacheDirectiveType;
  revalidateTime?: number;
};

const cacheDirective = (config: CacheConfig): CacheConfig => {
  return {
    type: config.type,
    revalidateTime: config.revalidateTime,
  };
};

export default cacheDirective;

export type { CacheDirectiveType, CacheConfig };
