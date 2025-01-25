import axiosInstance from './axiosInstance';

const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get('/users');
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

const patchOwnUser = async (user) => {
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

export default { getAllUsers, getOwnUser, patchOwnUser, changePassword, getUser, deleteUser };
