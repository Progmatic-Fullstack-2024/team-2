import axiosInstance from './axiosInstance';

const getTheaters = async () => {
  try {
    const response = await axiosInstance.get('/api/theater/dropdown-data-theaters');
    return response.data; // Successful answer
  } catch (error) {
    throw error.response ? error.response.data : error; // In case of error
  }
};

const createThreater = async (theater) => {
  try {
    const response = await axiosInstance.post('/api/dropdown-data-theaters', theater);
    return response.data; // Successful answer
  } catch (error) {
    throw error.response ? error.response.data : error; // In case of error
  }
};

export default { getTheaters, createThreater };
