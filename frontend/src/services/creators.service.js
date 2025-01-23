import axiosInstance from './axiosInstance';

const getCreators = async () => {
  try {
    const response = await axiosInstance.get('/api/dropdown-data-creators');
    return response.data; // Successful answer
  } catch (error) {
    throw error.response ? error.response.data : error; // In case of error
  }
};

export default getCreators;
