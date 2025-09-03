import { useQuery } from '@tanstack/react-query';
import { getDestination } from '../service';


export function useDestination(params: any) {
  return useQuery({
    queryKey: ['destination', params],
    queryFn: () => getDestination(params),
  });
}
