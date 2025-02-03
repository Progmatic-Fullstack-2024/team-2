import axiosInstance from './axiosInstance';

const list = async () => {
  try {
    const response = await axiosInstance.get(`/api/season-tickets`);
    console.log('response  ', response);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const getById = async ({ id }) => {
  try {
    const response = await axiosInstance.get(`/api/season-tickets/${id}`);
    console.log('response  ', response);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default { list, getById };
