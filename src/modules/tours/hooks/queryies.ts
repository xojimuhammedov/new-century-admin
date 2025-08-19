import { useQuery } from '@tanstack/react-query';
import { getMembers } from '../service';
import { type ParamsType } from '../../../types';

export function useCitiesList(params: ParamsType) {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => getMembers(params),
  });
}
