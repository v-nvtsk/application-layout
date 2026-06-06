import { useState, useCallback } from 'react';

interface AppError {
  message: string;
  code?: string;
  isCritical: boolean;
  fields?: Record<string, string>;
}

interface RawApiError {
  status?: number;
  message?: string;
  code?: string;
  validationErrors?: Record<string, string>;
}

export function useErrorController() {
  const [error, setError] = useState<AppError | null>(null);

  const handleApiError = useCallback((err: RawApiError | null | undefined, forceCritical = false) => {
    if (!err) {
      setError(null);
      return;
    }
    const isCritical = forceCritical || (err.status !== undefined && err.status >= 500) || err.status === 403;
    setError({
      message: err.message || 'Произошла ошибка при обработке запроса.',
      code: err.code,
      isCritical,
      fields: err.validationErrors,
    });
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    isCriticalError: !!(error && error.isCritical),
    setError,
    handleApiError,
    clearError,
  };
}
