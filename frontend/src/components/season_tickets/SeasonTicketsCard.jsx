import React from 'react';
import { Link } from 'react-router-dom';

export default function SeasonTicketsCard({ data, index }) {
  const { name, price, durationDay, seatQuantity } = data;

  const colors = [
    'bg-c-secondary/10',
    'bg-c-secondary/20',
    'bg-c-secondary/30',
    'bg-c-secondary/40',
    'bg-c-secondary/50',
  ];

  return (
    <Link to={`/payment?season-ticket-id=${data.id}`}>
      <div
        className={`w-72 min-w-72 h-96 ${colors[index]} p-3 flex flex-col justify-between hover:scale-110 ease-out transition-scale duration-150`}
      >
        <h1 className="wfull text-center text-white text-2xl font-bold truncate">{name}</h1>
        <div className="h-fit p-3  grid grid-cols-6 gap-1 font-semibold text-xl text-c-text items-end">
          <span className="col-span-3">Ár:</span>
          <span className="me-2 col-span-2 text-end text-c-secondary text-2xl"> {price} </span>
          <span>Ft</span>
          <span className="col-span-3">Érvényesség:</span>
          <span className="me-2 col-span-2 text-end">{durationDay}</span>
          <span>nap</span>
          <span className="col-span-3">Ülések:</span>
          <span className="me-2 col-span-2 text-end">{seatQuantity}</span>
          <span />
        </div>
      </div>
    </Link>
  );
}
