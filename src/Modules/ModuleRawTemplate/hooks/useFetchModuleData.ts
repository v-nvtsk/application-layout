import {
  useCallback,
  useEffect,
  useState,
} from 'react';

/**
 * Данные модуля — структура соответствует ответу API.
 * При создании нового модуля замените Record<string, any> на интерфейс с реальными полями.
 */
export type ModuleData = Record<string, unknown>;

interface FetchError {
  status: number;
  message: string;
  code: string;
}

/**
 * API_MODULE_NAME — идентификатор модуля в URL: /api/v1/{API_MODULE_NAME}/data.
 * При генерации нового модуля CLI-скрипт заменит это значение.
 */
const API_MODULE_NAME = 'module-raw-template';

/**
 * Хук загрузки данных модуля.
 * Выполняет GET-запрос к /api/v1/{moduleName}/data.
 * В dev-режиме запросы перехватываются MSW (Mock Service Worker).
 */
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
    const controller = new AbortController();

    fetch(`/api/v1/${API_MODULE_NAME}/data`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errBody: Partial<FetchError>) => {
            return Promise.reject({
              status: res.status,
              message: errBody.message || `Ошибка сервера (${res.status})`,
              code: errBody.code || 'UNKNOWN_ERROR',
            });
          });
        }
        return res.json();
      })
      .then((responseData: ModuleData) => {
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

    return () => {
      controller.abort();
    };
  }, [fetchTrigger]);

  return { data, isLoading, error, refetch };
}
