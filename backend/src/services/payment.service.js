import Stripe from "stripe";
import {
  STRIPE_PUBLIC_KEY,
  STRIPE_SECRET_KEY,
} from "../constants/constants.js";

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

const config = () => STRIPE_PUBLIC_KEY;

const createPaymentIntent = async ({ currency = "EUR", amount = 2000 }) => {
  // ide kell majd elküldeni a fizetési részleteket (pénznem, mennyiség stb....)

  const paymentIntent = await stripe.paymentIntents.create({
    currency,
    amount,
    automatic_payment_methods: { enabled: true },
  });

  // Send publishable key and PaymentIntent details to client
  return { clientSecret: paymentIntent.client_secret };
};

export default { config, createPaymentIntent };
