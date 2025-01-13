import axiosInstance from './axiosInstance';

// Registration aPI call
const register = async (userData) => {
  try {
    const response = await axiosInstance.post('/auth/registration', userData);
    return response.data; // Successful answer
  } catch (error) {
    throw error.response ? error.response.data : error; // In case of error
  }
};

// Login API call
const login = async (credentials) => {
  try {
    const response = await axiosInstance.post('/auth/login', credentials);
    return response.data; // Successful answer
  } catch (error) {
    throw error.response ? error.response.data : error; // In case of error
  }
};

export default {
  register,
  login,
};
