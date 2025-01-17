import axiosInstance from './axiosInstance';

const getById = async (performanceId) => {
  try {
    const response = await axiosInstance.get(`/api/performances/${performanceId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const list = async () => {
  try {
    const response = await axiosInstance.get('/api/performances');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default {
  getById,
  list,
};
