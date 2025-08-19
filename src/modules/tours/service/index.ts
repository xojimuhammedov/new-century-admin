import axiosInstance from '../../../api';
import { type ParamsType } from '../../../types';
import { type Members } from '../type';

// GET
export const getMembers = async (
  params: ParamsType = { search: '', limit: 10, page: 1 }
) => {
  const response = await axiosInstance.get('/cities/', { params });
  return response?.data;
};

// CREATE
export const createMembers = async (data: Members) => {
  const response = await axiosInstance.post('/cities/', data);
  return response?.data;
};

// Patch
export const updateMembers = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}) => {
  const response = await axiosInstance.patch(`/cities/${id}`, formData);
  return response?.data;
};

// DELETE
export const deleteMembers = async (id: string | number) => {
  const response = await axiosInstance.delete(`/cities/${id}`);
  return response?.data;
};
