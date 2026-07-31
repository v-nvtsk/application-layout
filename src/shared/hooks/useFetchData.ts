import { useCallback, useEffect, useState } from 'react';

interface FetchError {
  status: number;
  message: string;
  code: string;
}

/**
 * Дженерик-хук загрузки данных модуля.
 * Выполняет GET-запрос к /api/v1/{moduleName}/data.
 * В dev-режиме запросы перехватываются MSW.
 *
 * @param moduleName - идентификатор модуля в URL
 */
export function useFetchData<T>(moduleName: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<FetchError | null>(null);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  const refetch = useCallback(() => {
    setIsLoading(true);
    setError(null);
    setFetchTrigger((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`/api/v1/${moduleName}/data`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errBody: Partial<FetchError>) =>
            Promise.reject({
              status: res.status,
              message: errBody.message || `Ошибка сервера (${res.status})`,
              code: errBody.code || 'UNKNOWN_ERROR',
            }),
          );
        }
        return res.json();
      })
      .then((responseData: T) => {
        setData(responseData);
        setError(null);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError({
          status: err.status || 500,
          message: err.message || 'Произошла ошибка при загрузке данных.',
          code: err.code || 'FETCH_ERROR',
        });
        setData(null);
        setIsLoading(false);
      });

    return () => controller.abort();
  }, [moduleName, fetchTrigger]);

  return { data, isLoading, error, refetch };
}
