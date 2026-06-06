import { useState, useEffect, useCallback } from 'react';

export type ModuleData = Record<string, never>;

const INITIAL_DATA: ModuleData = {};

export type FetchDataOptions = Record<string, never>;

interface FetchError {
  status: number;
  message: string;
  code: string;
}

export function useFetchModuleData() {
  const [data, setData] = useState<ModuleData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<FetchError | null>(null);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  const refetch = useCallback(() => {
    setIsLoading(true);
    setError(null);
    setFetchTrigger((prev) => prev + 1);
  }, []);

  useEffect(() => {
    let isMounted = true;
    
    const timer = setTimeout(() => {
      if (!isMounted) return;

      setData(INITIAL_DATA);
      setError(null);
      setIsLoading(false);
    }, 400);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [fetchTrigger]);

  return { data, isLoading, error, refetch };
}
