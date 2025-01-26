import axiosInstance from './axiosInstance';

const createPerformance = async (performanceData) => {
  try {
    const response = await axiosInstance.post('/api/performances', performanceData);
    return response.data; // Successful answer
  } catch (error) {
    throw error.response ? error.response.data : error; // In case of error
  }
};

export default createPerformance;
