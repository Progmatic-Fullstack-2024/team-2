import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import CheckoutForm from '../components/payment/CheckoutForm';
import StartPaymentIntent from '../components/payment/StartPaymentIntent';
import AuthContext from '../contexts/AuthContext';
import paymentService from '../services/payment.service';

// test card number : 4242424242424242;
let stripeData = { ready: false, promise: '', clientSecret: '' };
export default function PaymentPage() {
  const { user } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const [renderStripe, setRenderStripe] = useState(stripeData.ready);

  useEffect(() => {
    if (stripeData.ready) {
      stripeData = { ready: false, promise: '', clientSecret: '' };
      setRenderStripe(false);
    }
  }, [searchParams]);

  const getStripeData = async ({ price, seasonTicketId }) => {
    const publicKey = await paymentService.getConfig();

    stripeData.clientSecret = await paymentService.createPaymentIntent({
      currency: 'HUF',
      amount: price * 100,
    });

    stripeData.seasonTicketId = seasonTicketId;
    stripeData.userId = user.id;
    stripeData.price = price;
    stripeData.promise = loadStripe(publicKey);
    stripeData.ready = true;
    setRenderStripe(true);
  };

  return (
    <div className="text-c-text tablet:p-20 pt-[100px] w-full min-h-svh flex justify-center items-center">
      {!renderStripe ? (
        <StartPaymentIntent searchParams={searchParams} getStripeData={getStripeData} />
      ) : (
        <div className="w-fit h-fit max-w-[600px] min-h-80 min-w-80 bg-c-secondary p-10 px-12 flex flex-col gap-5 ">
          <h2 className="text-c-background text-2xl font-bold">
            Fizetendő összeg:
            <span className="text-c-primary-dark font-bold text-3xl"> {stripeData.price}</span> Ft
          </h2>
          <Elements stripe={stripeData.promise} options={stripeData.clientSecret}>
            <CheckoutForm stripeData={stripeData} />
          </Elements>
        </div>
      )}
    </div>
  );
}
