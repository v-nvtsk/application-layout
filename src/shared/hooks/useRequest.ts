import { useCallback, useEffect, useRef, useState } from 'react';

interface UseRequestOptions {
  /** Авто-выполнение при маунте. По умолчанию true. */
  immediate?: boolean;
}

/**
 * Универсальный хук выполнения запроса.
 * Принимает любую функцию, возвращающую Promise.
 * Максимально чистый: не делает фильтрации, нормализации и проверок ошибок.
 */
export function useRequest<TArgs = void, TResult = unknown, TError = unknown>(
  requestFn: (args: TArgs) => Promise<TResult>,
  options: UseRequestOptions = {},
) {
  const { immediate = true } = options;

  const [data, setData] = useState<TResult | null>(null);
  const [isLoading, setIsLoading] = useState(immediate);
  const [error, setError] = useState<TError | null>(null);
  const [trigger, setTrigger] = useState(0);

  const requestFnRef = useRef(requestFn);

  useEffect(() => {
    requestFnRef.current = requestFn;
  }, [requestFn]);

  // Авто-выполнение (immediate mode)
  useEffect(() => {
    if (!immediate) return;

    let cancelled = false;
    
    const timer = setTimeout(() => {
      if (!cancelled) setIsLoading(true);
    }, 0);

    requestFnRef.current(undefined as TArgs)
      .then((result) => {
        if (cancelled) return;
        setData(result);
        setError(null);
        setIsLoading(false);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err as TError);
        setData(null);
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [immediate, trigger]);

  /** Ручной вызов запроса */
  const execute = useCallback(
    async (args: TArgs): Promise<TResult | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await requestFnRef.current(args);
        setData(result);
        setIsLoading(false);
        return result;
      } catch (err: unknown) {
        setError(err as TError);
        setIsLoading(false);
        throw err;
      }
    },
    [],
  );

  const refetch = useCallback(() => {
    setError(null);
    setTrigger((prev) => prev + 1);
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return { data, isLoading, error, execute, refetch, clearError };
}
