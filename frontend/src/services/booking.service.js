import axiosInstance from './axiosInstance';

const getByUserId = async ({ userId }) => {
    try {
      const response = await axiosInstance.get(`/api/booking/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  };

  export default { getByUserId };