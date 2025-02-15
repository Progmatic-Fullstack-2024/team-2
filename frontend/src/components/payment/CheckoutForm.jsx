import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import paymentService from '../../services/payment.service.js';
import Spinner from '../misc/Spinner';

export default function CheckoutForm({ stripeData }) {
  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment/completion`,
      },
      redirect: 'if_required',
    });

    if (!error) {
      paymentService.registerPayment({
        userId: stripeData.userId,
        seasonTicketId: stripeData.seasonTicketId,
      });
      navigate(`/payment/completion`);
    } else if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occured.');
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button
        disabled={isProcessing || !stripe || !elements}
        id="submit"
        className="bg-c-primary px-5 py-2 hover:bg-c-primary-light actiove:bg-c-primary-light font-bold mt-5 disabled:bg-gray-500"
        type="submit"
      >
        <span id="button-text" className="flex gap-2 items-center">
          {isProcessing ? (
            <>
              <Spinner size={6} />
              Feldolgozás...
            </>
          ) : (
            'Fizet'
          )}
        </span>
      </button>
      {message && (
        <div id="payment-message" className="">
          {message}
        </div>
      )}
    </form>
  );
}
