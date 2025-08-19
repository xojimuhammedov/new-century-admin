import { useQuery } from '@tanstack/react-query';
import { getSubTours } from '../service';

export function useSubTours(params: any) {
  return useQuery({
    queryKey: ['subtours', params],
    queryFn: () => getSubTours(params),
  });
}
