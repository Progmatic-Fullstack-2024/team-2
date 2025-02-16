import axiosInstance from './axiosInstance';

const create = async (futurePerformanceData) => {
  try {
    const response = await axiosInstance.post('/api/future-performances', futurePerformanceData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const getById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/future-performances/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const update = async (id, futurePerformanceData) => {
  try {
    const response = await axiosInstance.put(
      `/api/future-performances/${id}`,
      futurePerformanceData,
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const destroy = async (id) => {
  try {
    const response = await axiosInstance.delete(`/api/future-performances/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default { create, getById, update, destroy };
