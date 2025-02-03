import axiosInstance from './axiosInstance';

const getConfig = async () => {
  try {
    const config = await axiosInstance.get('/api/payment/config');
    return config.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const createPaymentIntent = async () => {
  try {
    const intent = await axiosInstance.post('/api/payment/create-payment-intent', {
      body: JSON.stringify({}),
    });
    return intent.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default { getConfig, createPaymentIntent };
