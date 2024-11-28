import { useState, useEffect, useRef } from 'react';
import { getVisitorCount, incrementVisitorCount } from '../services/visitorService';

export function useVisitorCount() {
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const hasIncrementedRef = useRef(false);

  useEffect(() => {
    let isMounted = true;
    let retryTimeout: NodeJS.Timeout;

    const initializeCount = async () => {
      try {
        const currentCount = await getVisitorCount();
        
        if (isMounted) {
          setCount(currentCount);
          
          if (!hasIncrementedRef.current) {
            await incrementVisitorCount(currentCount);
            hasIncrementedRef.current = true;
          }
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load visitor count');
          console.error('Visitor count error:', err);
          
          // Retry after 5 seconds
          retryTimeout = setTimeout(initializeCount, 5000);
        }
      }
    };

    initializeCount();

    return () => {
      isMounted = false;
      clearTimeout(retryTimeout);
    };
  }, []);

  return { count, error };
}