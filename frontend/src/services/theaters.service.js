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

const getById = async (theaterId) => {
  try {
    const response = await axiosInstance.get(`/api/theater/${theaterId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const getTheaterByUserId = async (id) => {
  try {
    const response = await axiosInstance.get(`/theaterAdmin/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const updateTheaterById = async (id, formData) => {
  try {
    const response = await axiosInstance.patch(`/api/theater/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const deleteTheaterImage = async (id, imageUrl) => {
  try {
    const response = await axiosInstance.patch(`/api/theater/${id}/image`, {
      imageUrl, // A törlendő kép URL-je
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default {
  getTheaters,
  createThreater,
  getById,
  getTheaterByUserId,
  updateTheaterById,
  deleteTheaterImage,
};
