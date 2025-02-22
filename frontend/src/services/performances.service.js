import axiosInstance from './axiosInstance';

const getById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/performances/${id}`);
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

const isOwn = async (id, userId) => {
  try {
    const response = await axiosInstance.get(`/api/performances/isOwn/${id}/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const createPerformance = async (performanceData) => {
  try {
    const response = await axiosInstance.post('/api/performances', performanceData);
    return response.data; // Successful answer
  } catch (error) {
    throw error.response ? error.response.data : error; // In case of error
  }
};

const update = async (performanceId, performanceData) => {
  try {
    const response = await axiosInstance.patch(
      `/api/performances/${performanceId}`,
      performanceData,
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const deletePoster = async (id, imageUrl) => {
  try {
    const response = await axiosInstance.patch(`/api/performances/${id}/image`, { imageUrl });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const deletePerformance = async (performanceId) => {
  try {
    const response = await axiosInstance.delete(`/api/performances/${performanceId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const follow = async (id, userId) => {
  try {
    const response = await axiosInstance.put(`/api/performances/follow/${id}`, userId);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const unFollow = async (id, userId) => {
  try {
    const response = await axiosInstance.put(`/api/performances/unfollow/${id}`, userId);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default {
  getById,
  list,
  listAll,
  isOwn,
  createPerformance,
  update,
  deletePoster,
  deletePerformance,
  follow,
  unFollow,
};
