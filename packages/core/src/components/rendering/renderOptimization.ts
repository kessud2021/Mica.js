import { memo } from 'react';
import type { ComponentType } from 'react';

type OptimizationStrategy = 'memo' | 'custom' | 'none';

type OptimizationOptions<P> = {
  strategy: OptimizationStrategy;
  arePropsEqual?: (prevProps: P, nextProps: P) => boolean;
};

const renderOptimization = <P extends Record<string, any> = {}>(
  Component: ComponentType<P>,
  options: OptimizationOptions<P> = { strategy: 'memo' },
): ComponentType<P> => {
  switch (options.strategy) {
    case 'memo':
      return memo(Component, options.arePropsEqual);
    case 'custom':
      return options.arePropsEqual ? memo(Component, options.arePropsEqual) : Component;
    case 'none':
    default:
      return Component;
  }
};

export default renderOptimization;
