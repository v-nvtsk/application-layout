import { useFetchData } from '../../../shared/hooks/useFetchData';
import type { ModuleData } from '../Models';

const API_MODULE_NAME = 'module-template';

export function useFetchModuleData() {
  return useFetchData<ModuleData>(API_MODULE_NAME);
}
