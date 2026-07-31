import { useSaveData } from '../../../shared/hooks/useSaveData';
import type { ModuleData } from '../Models';

const API_MODULE_NAME = 'module-raw-template';

/**
 * Хук сохранения данных модуля.
 * Выполняет POST-запрос к /api/v1/module-raw-template/data.
 */
export function useSaveModuleData() {
  return useSaveData<ModuleData>(API_MODULE_NAME);
}
