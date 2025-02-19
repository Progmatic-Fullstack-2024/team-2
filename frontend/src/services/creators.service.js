import axiosInstance from './axiosInstance';

const getCreators = async () => {
  try {
    const response = await axiosInstance.get('/api/creators/dropdown-data-creators');
    return response.data; // Successful answer
  } catch (error) {
    throw error.response ? error.response.data : error; // In case of error
  }
};

const getCreatorsAllData = async () => {
  try {
    const response = await axiosInstance.get('/api/creators/');
    return response.data; // Successful answer
  } catch (error) {
    throw error.response ? error.response.data : error; // In case of error
  }
};

const getCreatorById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/creators/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const create = async (creatorData) => {
  try {
    const response = await axiosInstance.post('/api/creators', creatorData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default { getCreators, getCreatorsAllData, getCreatorById, create };
