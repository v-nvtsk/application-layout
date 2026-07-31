import { useState, useCallback } from 'react';

interface SaveError {
  status: number;
  message: string;
  code: string;
}

/**
 * Дженерик-хук сохранения данных модуля.
 * Выполняет POST-запрос к /api/v1/{moduleName}/data.
 * В dev-режиме запросы перехватываются MSW.
 *
 * @param moduleName - идентификатор модуля в URL
 */
export function useSaveData<T>(moduleName: string) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<SaveError | null>(null);

  const save = useCallback(
    async (data: T): Promise<boolean> => {
      setIsSaving(true);
      setSaveError(null);

      try {
        const res = await fetch(`/api/v1/${moduleName}/data`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!res.ok) {
          const errBody: Partial<SaveError> = await res.json().catch(() => ({}));
          setSaveError({
            status: res.status,
            message: errBody.message || `Ошибка сохранения (${res.status})`,
            code: errBody.code || 'SAVE_ERROR',
          });
          setIsSaving(false);
          return false;
        }

        setIsSaving(false);
        return true;
      } catch (err) {
        setSaveError({
          status: 0,
          message: err instanceof Error ? err.message : 'Ошибка сети при сохранении.',
          code: 'NETWORK_ERROR',
        });
        setIsSaving(false);
        return false;
      }
    },
    [moduleName],
  );

  const clearSaveError = useCallback(() => setSaveError(null), []);

  return { save, isSaving, saveError, clearSaveError };
}
