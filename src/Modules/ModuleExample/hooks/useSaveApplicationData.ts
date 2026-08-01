import { useRequest } from '../../../shared/hooks/useRequest';
import { ApplicationService } from '../services/ApplicationService';
import type { ApplicationData } from '../Models';

export function useSaveApplicationData() {
  const { execute, isLoading, error, clearError } = useRequest(
    (data: ApplicationData) => ApplicationService.saveData(data),
    { immediate: false },
  );

  return {
    save: execute,
    isSaving: isLoading,
    saveError: error,
    clearSaveError: clearError,
  };
}
