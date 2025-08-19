import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { type Members } from '../type';
import { Notification } from '../../../utils/notification';
import { createSubTours, deleteSubTours, updateSubTours } from '../service';

// CREATE
export function useCreateSubtours() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => createSubTours(data),
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
export function useUpdateSubTours() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; formData: FormData }) =>
      updateSubTours(data),
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
export function useDeleteSubTours() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => deleteSubTours(id),
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
