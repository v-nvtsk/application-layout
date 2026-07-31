import { useSaveData } from '../../../shared/hooks/useSaveData';
import type { ApplicationData } from '../Models';

const API_MODULE_NAME = 'module-example';

export function useSaveApplicationData() {
  return useSaveData<ApplicationData>(API_MODULE_NAME);
}
