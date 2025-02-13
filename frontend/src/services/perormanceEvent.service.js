import axiosInstance from './axiosInstance';

const create = async (performanceEventData) => {
  try {
    const response = await axiosInstance.post(`/api/performance-events`, performanceEventData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default { create };
