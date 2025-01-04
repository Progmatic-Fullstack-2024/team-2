import axiosInstance from './axiosInstance';

// Regisztrációs API hívás
const register = async (userData) => {
  try {
    const response = await axiosInstance.post('/auth/registration', userData);
    return response.data; // Sikeres válasz
  } catch (error) {
    throw error.response ? error.response.data : error; // Hiba esetén
  }
};

// Bejelentkezési API hívás
const login = async (credentials) => {
  try {
    const response = await axiosInstance.post('/auth/login', credentials);
    return response.data; // Sikeres válasz
  } catch (error) {
    throw error.response ? error.response.data : error; // Hiba esetén
  }
};

// Exportálás a használathoz
export default {
  register,
  login,
};
