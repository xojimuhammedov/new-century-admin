import axiosInstance from '../../../api';

// GET
export const getHotels = async (
  params: any = { keyword: '', limit: 100, page: 1 }
) => {
  const response = await axiosInstance.get('/hotels/', { params });
  return response?.data
};

// CREATE
export const createHotels = async (data: any) => {
  const response = await axiosInstance.post('/hotels/', data, {
    headers:{
      "Content-Type":"multipart/form-data"
    }
  });
  return response?.data;
};

// Patch
export const updateHotels = async ({
  id,
  formData,
}: {
  id: string;
  formData: FormData;
}) => {
  const response = await axiosInstance.patch(`/hotels/${id}`, formData);
  return response?.data;
};

// DELETE
export const deleteHotels = async (id: string | number) => {
  const response = await axiosInstance.delete(`/hotels/${id}`);
  return response?.data;
};
