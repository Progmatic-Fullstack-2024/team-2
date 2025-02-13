import axiosInstance from './axiosInstance';

const getByUserId = async ({ userId }) => {
    try {
      const response = await axiosInstance.get(`/api/booking/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  };


  const getSoldTickets = async ({ performanceEventId }) => {
    try {
      const response = await axiosInstance.get(`/api/booking/${performanceEventId}`);
      console.log(response.data)
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  };

  const buyTicket = async(ticketdata) => {
    try {
      const response = await axiosInstance.post(`/api/booking/buyticket`, ticketdata);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  }
  export default { getByUserId, getSoldTickets, buyTicket };