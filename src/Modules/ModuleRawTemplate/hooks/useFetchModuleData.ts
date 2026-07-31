import { useFetchData } from '../../../shared/hooks/useFetchData';
import type { ModuleData } from '../Models';

const API_MODULE_NAME = 'module-raw-template';

/**
 * Хук загрузки данных модуля.
 * Выполняет GET-запрос к /api/v1/module-raw-template/data.
 */
export function useFetchModuleData() {
  return useFetchData<ModuleData>(API_MODULE_NAME);
}
