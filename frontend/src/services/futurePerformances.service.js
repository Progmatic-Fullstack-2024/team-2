import axiosInstance from './axiosInstance';

const create = async (futurePerformanceData) => {
  try {
    const response = await axiosInstance.post('/api/future-performances', futurePerformanceData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default { create };
