import axiosInstance from '../../../api';

// GET
export const getSubTours = async (
  params: any = { keyword: '', limit: 100, page: 1 }
) => {
  const response = await axiosInstance.get('/subtours/', { params });
  return response?.data
};

// CREATE
export const createSubTours = async (data: any) => {
  const response = await axiosInstance.post('/subtours/', data, {
    headers:{
      "Content-Type":"multipart/form-data"
    }
  });
  return response?.data;
};

// Patch
export const updateSubTours = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}) => {
  const response = await axiosInstance.patch(`/subtours/${id}`, formData);
  return response?.data;
};

// DELETE
export const deleteSubTours = async (id: string | number) => {
  const response = await axiosInstance.delete(`/subtours/${id}`);
  return response?.data;
};
