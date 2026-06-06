import { useState, useCallback } from 'react';
import type { ModuleData } from './useFetchModuleData';

interface SaveError {
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
 * Хук сохранения данных модуля.
 * Выполняет POST-запрос к /api/v1/{moduleName}/data.
 * В dev-режиме запросы перехватываются MSW (Mock Service Worker).
 */
export function useSaveModuleData() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<SaveError | null>(null);

  const save = useCallback(async (data: ModuleData): Promise<boolean> => {
    setIsSaving(true);
    setSaveError(null);

    try {
      const res = await fetch(`/api/v1/${API_MODULE_NAME}/data`, {
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
  }, []);

  const clearSaveError = useCallback(() => {
    setSaveError(null);
  }, []);

  return { save, isSaving, saveError, clearSaveError };
}
