import { useState, useCallback } from 'react';
import type { ApplicationData } from './useFetchApplicationData';

interface SaveError {
  status: number;
  message: string;
  code: string;
}

const API_MODULE_NAME = 'module-example';

export function useSaveApplicationData() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<SaveError | null>(null);

  const save = useCallback(async (data: ApplicationData): Promise<boolean> => {
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
