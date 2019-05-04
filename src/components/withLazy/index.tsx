import * as React from 'react';

function withLazy<P>(
  importFn: () => Promise<{ default: React.ComponentType<P> }>,
  fallback = <div />
) {
  const Component = React.lazy(importFn);

  const LazyComponent = (props: React.PropsWithoutRef<P>) => (
    <React.Suspense fallback={fallback}>
      <Component {...props} />
    </React.Suspense>
  );

  // allow users to preload files async, by invoking the dynamic import directly
  LazyComponent.preload = importFn

  return LazyComponent;
}

export default withLazy;
