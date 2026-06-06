import { useState, useEffect, useCallback } from 'react';

export interface ApplicationData {
  cardName: string;
  cardNumber: string;
  notificationsEnabled: boolean;
  marketingEmails: boolean;
  twoFactorEnabled: boolean;
}

const INITIAL_SETTINGS: ApplicationData = {
  cardName: 'Основная карта',
  cardNumber: '4532',
  notificationsEnabled: true,
  marketingEmails: false,
  twoFactorEnabled: true,
};

export interface FetchDataOptions {
  simulateError?: boolean;
}

interface FetchError {
  status: number;
  message: string;
  code: string;
}

export function useFetchApplicationData(options?: FetchDataOptions) {
  const [data, setData] = useState<ApplicationData | null>(null);
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

      if (options?.simulateError) {
        setError({
          status: 500,
          message: 'Ошибка подключения к серверу СберБизнес. Пожалуйста, проверьте соединение и попробуйте позже.',
          code: 'INTERNAL_SERVER_ERROR',
        });
        setData(null);
      } else {
        setData(INITIAL_SETTINGS);
        setError(null);
      }
      setIsLoading(false);
    }, 600); // Simulate network latency

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [fetchTrigger, options?.simulateError]);

  return { data, isLoading, error, refetch };
}
