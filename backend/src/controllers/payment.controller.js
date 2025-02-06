import paymentService from "../services/payment.service.js";

const config = (req, res, next) => {
  try {
    const striePublicKey = paymentService.config();
    res.status(200).send(striePublicKey);
  } catch (error) {
    next(error);
  }
};

const createPaymentIntent = async (req, res, next) => {
  const { currency, amount } = req.body.data;
  try {
    const paymentIntent = await paymentService.createPaymentIntent({
      currency,
      amount,
    });
    res.status(200).send(paymentIntent);
  } catch (error) {
    next(error);
  }
};

export default { config, createPaymentIntent };
