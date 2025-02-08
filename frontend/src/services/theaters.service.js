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
const getTheaterForDropdown = async (theater) => {
  try {
    const response = await axiosInstance.get('/api/theater/dropdown-data-theaters', theater);
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

    console.log('API válasza:', response.data); // Ellenőrizd, mit válaszol a szerver
    return response.data;
  } catch (error) {
    console.error('Hiba történt az API hívás során:', error);
    throw error.response ? error.response.data : error;
  }
};

const deleteTheaterImage = async (id, imageUrl) => {
  try {
    const response = await axiosInstance.patch(`/api/theater/${id}/image`, {
      imageUrl, // A törlendő kép URL-je
    });
    console.log('Kép sikeresen törölve:', response.data);
    return response.data;
  } catch (error) {
    console.error('Hiba a kép törlésekor:', error);
    throw error.response ? error.response.data : error;
  }
};

export default {
  getTheaters,
  createThreater,
  getTheaterForDropdown,
  getById,
  getTheaterByUserId,
  updateTheaterById,
  deleteTheaterImage,
};
