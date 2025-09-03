import axiosInstance from '../../../api';

// GET
export const getDestination = async (
  params: any = { keyword: '', limit: 100, page: 1 }
) => {
  const response = await axiosInstance.get('/prods/', { params });
  return response?.data
};

// CREATE
export const createDestination = async (data: any) => {
  const response = await axiosInstance.post('/prods/', data, {
    headers:{
      "Content-Type":"multipart/form-data"
    }
  });
  return response?.data;
};

// Patch
export const updateDestination = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}) => {
  const response = await axiosInstance.patch(`/prods/${id}`, formData);
  return response?.data;
};

// DELETE
export const deleteDestination = async (id: string | number) => {
  const response = await axiosInstance.delete(`/prods/${id}`);
  return response?.data;
};
