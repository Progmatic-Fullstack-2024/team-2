import axiosInstance from './axiosInstance';

const getAllUsers = async (params) => {
  try {
    const response = await axiosInstance.get(`/users?${params}`);
    return response.data; // Successful answer
  } catch (error) {
    throw error.response ? error.response.data : error; // In case of error
  }
};

const getOwnUser = async () => {
  try {
    const response = await axiosInstance.get('/users/own');
    return response.data; // Successful answer
  } catch (error) {
    throw error.response ? error.response.data : error; // In case of error
  }
};

const getUser = async (userId) => {
  try {
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data; // Successful answer
  } catch (error) {
    throw error.response ? error.response.data : error; // In case of error
  }
};

const patchUser = async (user) => {
  try {
    const response = await axiosInstance.patch(`/users`, user);
    return response.data; // Successful answer
  } catch (error) {
    throw error.response ? error.response.data : error; // In case of error
  }
};

const changePassword = async (data) => {
  try {
    const response = await axiosInstance.patch('/users/passwordChange', data);
    return response.data; // Successful answer
  } catch (error) {
    throw error.response ? error.response.data : error; // In case of error
  }
};

const deleteUser = async (userId) => {
  try {
    const response = await axiosInstance.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error; // In case of error
  }
};

const deleteTheaterAdmin = async (userId) => {
  try {
    const response = await axiosInstance.delete(`/theaterAdmin/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error; // In case of error
  }
};

const setTheaterAdmin = async (userId, theaterId) => {
  const data = { userId, theaterId };
  try {
    const response = await axiosInstance.post(`/theaterAdmin/newTheaterAdmin`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error; // In case of error
  }
};

const countUsers = async (params) => {
  try {
    const response = await axiosInstance.get(`users/usercount?${params}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error; // In case of error
  }
};

export default {
  getAllUsers,
  getOwnUser,
  patchUser,
  changePassword,
  getUser,
  deleteUser,
  deleteTheaterAdmin,
  setTheaterAdmin,
  countUsers,
};
