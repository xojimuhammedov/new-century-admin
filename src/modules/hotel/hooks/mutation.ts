import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Notification } from '../../../utils/notification';
import { createHotels, deleteHotels, updateHotels } from '../service';

// CREATE
export function useCreateHotel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => createHotels(data),
    onSuccess: response => {
      Notification('success', response?.message);
    },
    onSettled: async (_, error) => {
      if (error) {
        Notification('error', error?.message);
      } else {
        await queryClient.invalidateQueries({ queryKey: ['countries'] });
      }
    },
  });
}

// UPDATE
export function useUpdateHotel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; formData: FormData }) =>
      updateHotels(data),
    onSuccess: response => {
      Notification('success', response.message);
    },
    onSettled: async (_, error) => {
      if (error) {
        Notification('error', error.message);
      } else {
        await queryClient.invalidateQueries({ queryKey: ['countries'] });
      }
    },
  });
}

// DELETE
export function useDeleteHotel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => deleteHotels(id),
    onSuccess: response => {
      Notification('success', response.message);
    },
    onSettled: async (_, error) => {
      if (error) {
        Notification('error', error.message);
      } else {
        await queryClient.invalidateQueries({ queryKey: ['countries'] });
      }
    },
  });
}
