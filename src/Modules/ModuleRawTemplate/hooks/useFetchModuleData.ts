import { useRequest } from '../../../shared/hooks/useRequest';
import { ModuleService } from '../services/ModuleService';

/**
 * Хук загрузки данных модуля.
 * Выполняет GET-запрос к /api/v1/module-raw-template/data через ModuleService.
 */
export function useFetchModuleData() {
  return useRequest(() => ModuleService.getData());
}
