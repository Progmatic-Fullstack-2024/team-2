import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';

import Spinner from '../components/misc/Spinner';
import CheckoutForm from '../components/payment/CheckoutForm';
import paymentService from '../services/payment.service';

// test card number : 4242424242424242;

export default function PaymentPage() {
  const [stripePromise, setStripePrmise] = useState(null);
  const [clientSecret, setClientSecret] = useState('');

  async function getPublicKey() {
    const publicKey = await paymentService.getConfig();
    setStripePrmise(loadStripe(publicKey));
  }

  async function getSecretKey() {
    const secretKey = await paymentService.createPaymentIntent();
    setClientSecret(secretKey);
  }

  useEffect(() => {
    getPublicKey();
    getSecretKey();
  }, []);

  return (
    <div className="text-c-text tablet:p-20 pt-[100px] w-full h-full flex justify-center items-center">
      <div className="w-fit h-fit max-w-[400px] min-h-80 min-w-80 bg-c-secondary p-10 flex flex-col gap-5 ">
        <h1 className="text-c-background text-2xl font-bold">Fizetés</h1>
        {(clientSecret && stripePromise && (
          <Elements stripe={stripePromise} options={clientSecret}>
            <CheckoutForm />
          </Elements>
        )) || (
          <div className="w-full min-h-52 flex justify-center items-center">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}
