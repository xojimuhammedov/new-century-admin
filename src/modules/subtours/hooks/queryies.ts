import { useQuery } from '@tanstack/react-query';
import { type ParamsType } from '../../../types';
import { getSubTours } from '../service';

export function useSubTours(params: any) {
  return useQuery({
    queryKey: ['subtours', params],
    queryFn: () => getSubTours(params),
  });
}
