import React, { useEffect, useState } from 'react';
import seasonTicketsService from '../../services/season-tickets.service';
import DefaultButton from '../misc/DefaultButton';
import { useNavigate } from 'react-router-dom';
import Spinner from '../misc/Spinner';

let ticketData = null;

export default function StartPaymentIntent({ searchParams, getStripeData }) {
  const navigate = useNavigate();
  const [renderData, setRenderData] = useState(ticketData);

  async function fetchSeasonTicketData(id) {
    ticketData = await seasonTicketsService.getById({ id });
    setRenderData(ticketData);
  }

  useEffect(() => {
    if (ticketData !== true) {
      ticketData = true;
      setRenderData(false);
      fetchSeasonTicketData(searchParams.get('season-ticket-id'));
    }
  }, []);

  // if (!renderData) return;

  return (
    <div className="laptop:m-20 min-w-[30vw] min-h-[40vh] p-10 border border-c-secondary/50 flex flex-col justify-center  gap-10 text-xl">
      {!renderData ? (
        <div className="w-full flex justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <h1 className="font-bold text-white text-3xl truncate">Vásárlás megkezdése</h1>
          <div className="w-full gap-x-2 grid grid-cols-3">
            <p className="col-span-2">Vásárolni kívánt termék :</p>
            <span className="text-end">{renderData.name}</span>
            <p className="col-span-2">Fizetendő összeg :</p>
            <span className="text-end">{renderData.price} Ft</span>
          </div>

          <div className="w-full flex flex-row justify-between">
            <DefaultButton
              text="Tovább a fizetéshez"
              onClick={() => {
                setRenderData(false), getStripeData({ price: renderData.price });
              }}
            />

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
