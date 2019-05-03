import * as React from 'react';

function withLazy<P>(
  importFn: () => Promise<{ default: React.ComponentType<P> }>
) {
  const Component = React.lazy(importFn);

  type LazyProps = P & { fallback: JSX.Element };

  const LazyComponent = ({ fallback, ...rest }: LazyProps) => (
    <React.Suspense fallback={fallback}>
      <Component {...rest} />
    </React.Suspense>
  );

  LazyComponent.defaultProps = {
    fallback: <div />
  };

  // allow users to preload files async, by invoking the dynamic import directly
  LazyComponent.preload = importFn

  return LazyComponent;
}

export default withLazy;
