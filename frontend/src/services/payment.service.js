import axiosInstance from './axiosInstance';

const getConfig = async () => {
  try {
    const config = await axiosInstance.get('/api/payment/config');
    return config.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const createPaymentIntent = async (params) => {
  const { currency, amount } = params;
  try {
    const intent = await axiosInstance.post('/api/payment/create-payment-intent', {
      data: { currency, amount },
    });
    return intent.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const registerPayment = async (params) => {
  const { userId, seasonTicketId } = params;
  try {
    const response = await axiosInstance.post('/api/user-season-ticket', {
      data: { userId, seasonTicketId },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default { getConfig, createPaymentIntent, registerPayment };
