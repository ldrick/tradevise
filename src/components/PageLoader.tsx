import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

const PageLoader = (): JSX.Element | null => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  });

  return loading ? (
    <div className="progressbar fixed bg-gray-200 z-50 top-0 left-0">
      <div className="w-full bg-tertiary" />
    </div>
  ) : null;
};

export { PageLoader };
