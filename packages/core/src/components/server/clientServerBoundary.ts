type BoundaryType = 'client' | 'server';

type BoundaryConfig = {
  type: BoundaryType;
  preload?: boolean;
  suspend?: boolean;
};

const clientServerBoundary = (config: BoundaryConfig): BoundaryConfig => {
  return {
    type: config.type,
    preload: config.preload ?? true,
    suspend: config.suspend ?? false,
  };
};

export default clientServerBoundary;

export type { BoundaryType, BoundaryConfig };
