import { useRequest } from '../../../shared/hooks/useRequest';
import { ModuleService } from '../services/ModuleService';
import type { ModuleData } from '../Models';

export function useSaveModuleData() {
  const { execute, isLoading, error, clearError } = useRequest(
    (data: ModuleData) => ModuleService.saveData(data),
    { immediate: false },
  );

  return {
    save: execute,
    isSaving: isLoading,
    saveError: error,
    clearSaveError: clearError,
  };
}
