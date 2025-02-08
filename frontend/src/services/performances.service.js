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
    console.log('API válasza:', response.data);
    return response.data;
  } catch (error) {
    console.error('Hiba történt az API hívás során:', error);
    throw error.response ? error.response.data : error;
  }
};

const deletePoster = async (id, posterURL) => {
  try {
    const response = await axiosInstance.patch(`/api/performances/${id}/image`, {
      posterURL,
    });
    console.log('Kép sikeresen törölve:', response.data);
    return response.data;
  } catch (error) {
    console.error('Hiba a kép törlésekor:', error);
    throw error.response ? error.response.data : error;
  }
};

export default {
  getById,
  list,
  listAll,
  createPerformance,
  update,
  deletePoster,
};
