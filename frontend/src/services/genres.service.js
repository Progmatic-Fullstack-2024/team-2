import axiosInstance from './axiosInstance';

const listAllGenre = async () => {
  try {
    const response = await axiosInstance.get(`/api/genres`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default {
  listAllGenre,
};
