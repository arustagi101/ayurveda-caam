import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Performance optimization: Preload critical pages on idle
  useEffect(() => {
    // Preload critical pages when the browser is idle
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const handleRouteChange = () => {
        // Clear any unnecessary memory when route changes
        const allElements = document.querySelectorAll('*');
        for (const element of allElements) {
          // @ts-expect-error: Remove any non-standard properties that might cause memory leaks
          if (element._reactEvents) element._reactEvents = null;
        }
      };

      router.events.on('routeChangeComplete', handleRouteChange);
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    }
  }, [router]);

  return <Component {...pageProps} />;
}

export default MyApp;
