import axiosInstance from './axiosInstance';

const getById = async (performanceId) => {
  try {
    const response = await axiosInstance.get(`/api/performances/${performanceId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const list = async (params) => {
  try {
    const response = await axiosInstance.get(`/api/performances`, { params });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const listAll = async () => {
  try {
    const response = await axiosInstance.get(`/api/performances/all`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default {
  getById,
  list,
  listAll,
};
