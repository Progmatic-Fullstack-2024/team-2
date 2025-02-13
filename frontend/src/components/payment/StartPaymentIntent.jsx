import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import seasonTicketsService from '../../services/season-tickets.service';
import DefaultButton from '../misc/DefaultButton';
import Spinner from '../misc/Spinner';

let fetchData = null;

export default function StartPaymentIntent({ searchParams, getStripeData }) {
  const navigate = useNavigate();
  const [sTicketData, setSTicketData] = useState(fetchData);

  async function fetchSeasonTicketData(id) {
    fetchData = await seasonTicketsService.getById({ id });
    setSTicketData(fetchData);
  }

  useEffect(() => {
    if (fetchData !== true) {
      fetchData = true;
      setSTicketData(false);
      fetchSeasonTicketData(searchParams.get('season-ticket-id'));
    }
  }, []);

  const handleOnclick = () => {
    setSTicketData(false);
    getStripeData({ price: sTicketData.price, seasonTicketId: sTicketData.id });
  };

  return (
    <div className="laptop:m-20 min-w-[30vw] min-h-[40vh] p-10 border border-c-secondary/50 flex flex-col justify-center  gap-10 text-xl">
      {!sTicketData ? (
        <div className="w-full flex justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <h1 className="font-bold text-white text-3xl truncate">Vásárlás megkezdése</h1>
          <div className="w-full gap-x-2 grid grid-cols-3">
            <p className="col-span-2">Vásárolni kívánt termék :</p>
            <span className="text-end">{sTicketData.name}</span>
            <p className="col-span-2">Fizetendő összeg :</p>
            <span className="text-end">{sTicketData.price} Ft</span>
          </div>

          <div className="w-full flex flex-row justify-between gap-5">
            <DefaultButton text="Tovább a fizetéshez" onClick={handleOnclick} />

            <DefaultButton
              text="Mégse"
              color="gray-700"
              onClick={() => navigate('/season-tickets')}
            />
          </div>
        </>
      )}
    </div>
  );
}
