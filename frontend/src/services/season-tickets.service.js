import axiosInstance from './axiosInstance';

const list = async () => {
  try {
    const response = await axiosInstance.get(`/api/season-tickets`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const getById = async ({ id }) => {
  try {
    const response = await axiosInstance.get(`/api/season-tickets/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const getByUserId = async ({ userId }) => {
  try {
    const response = await axiosInstance.get(`/api/season-tickets/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
export default { list, getById, getByUserId };
