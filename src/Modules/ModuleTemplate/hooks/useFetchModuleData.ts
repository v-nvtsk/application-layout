import { useRequest } from '../../../shared/hooks/useRequest';
import { ModuleService } from '../services/ModuleService';

export function useFetchModuleData() {
  return useRequest(() => ModuleService.getData());
}
