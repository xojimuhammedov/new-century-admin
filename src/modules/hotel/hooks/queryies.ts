import { useQuery } from '@tanstack/react-query';
import { type ParamsType } from '../../../types';
import { getHotels } from '../service';

export function useHotels(params: ParamsType) {
  return useQuery({
    queryKey: ['countries', params],
    queryFn: () => getHotels(params),
  });
}
