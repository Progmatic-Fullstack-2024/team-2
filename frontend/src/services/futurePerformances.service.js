import axiosInstance from './axiosInstance';

const create = async (futurePerformanceData) => {
  try {
    const response = await axiosInstance.post('/api/future-performances', futurePerformanceData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const getById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/future-performances/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default { create, getById };
