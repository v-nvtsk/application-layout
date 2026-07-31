import { useFetchData } from '../../../shared/hooks/useFetchData';
import type { ApplicationData } from '../Models';

const API_MODULE_NAME = 'module-example';

export function useFetchApplicationData() {
  return useFetchData<ApplicationData>(API_MODULE_NAME);
}
