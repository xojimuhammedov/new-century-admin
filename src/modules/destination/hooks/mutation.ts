import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { type Members } from '../type';
import { Notification } from '../../../utils/notification';
import { createDestination, deleteDestination, updateDestination } from '../service';

// CREATE
export function useCreateDestination() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => createDestination(data),
    onSuccess: response => {
      Notification('success', response?.message);
    },
    onSettled: async (_, error) => {
      if (error) {
        Notification('error', error?.message);
      } else {
        // ✅ users query invalidatsiya qilinadi
        await queryClient.invalidateQueries({ queryKey: ['users'] });
      }
    },
  });
}

// UPDATE
export function useUpdateDestination() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; formData: FormData }) =>
      updateDestination(data),
    onSuccess: response => {
      Notification('success', response.message);
    },
    onSettled: async (_, error) => {
      if (error) {
        Notification('error', error.message);
      } else {
        // ✅ users query invalidatsiya qilinadi
        await queryClient.invalidateQueries({ queryKey: ['users'] });
      }
    },
  });
}

// DELETE
export function useDeleteDestination() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => deleteDestination(id),
    onSuccess: response => {
      Notification('success', response.message);
    },
    onSettled: async (_, error) => {
      if (error) {
        Notification('error', error.message);
      } else {
        // ✅ users query invalidatsiya qilinadi
        await queryClient.invalidateQueries({ queryKey: ['users'] });
      }
    },
  });
}
