type LifecyclePhase = 'mount' | 'update' | 'unmount';

type LifecycleCallback = (phase: LifecyclePhase, props?: Record<string, any>) => void;

const componentLifecycle = (): {
  onMount: (callback: () => void) => void;
  onUpdate: (callback: (prevProps?: any) => void) => void;
  onUnmount: (callback: () => void) => void;
  listeners: Map<LifecyclePhase, Set<LifecycleCallback>>;
} => {
  const listeners = new Map<LifecyclePhase, Set<LifecycleCallback>>();
  listeners.set('mount', new Set());
  listeners.set('update', new Set());
  listeners.set('unmount', new Set());

  const onMount = (callback: () => void) => {
    const mountCallbacks = listeners.get('mount')!;
    mountCallbacks.add(callback as any);
  };

  const onUpdate = (callback: (prevProps?: any) => void) => {
    const updateCallbacks = listeners.get('update')!;
    updateCallbacks.add(callback as any);
  };

  const onUnmount = (callback: () => void) => {
    const unmountCallbacks = listeners.get('unmount')!;
    unmountCallbacks.add(callback as any);
  };

  return { onMount, onUpdate, onUnmount, listeners };
};

export default componentLifecycle;
