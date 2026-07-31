import { useSaveData } from '../../../shared/hooks/useSaveData';
import type { ModuleData } from '../Models';

const API_MODULE_NAME = 'module-template';

export function useSaveModuleData() {
  return useSaveData<ModuleData>(API_MODULE_NAME);
}
