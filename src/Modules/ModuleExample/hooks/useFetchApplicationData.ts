import { useRequest } from '../../../shared/hooks/useRequest';
import { ApplicationService } from '../services/ApplicationService';

export function useFetchApplicationData() {
  return useRequest(() => ApplicationService.getData());
}
