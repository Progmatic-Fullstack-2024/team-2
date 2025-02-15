import React from 'react';
import { Link } from 'react-router-dom';

import SvgIcon from '../misc/SvgIcon';

export default function SeasonTicketsCard({ data, index }) {
  const { name, price, durationDay, seatQuantity } = data;

  const colors = [
    'from-c-secondary/10',
    'from-c-secondary/20',
    'from-c-secondary/25',
    'from-c-secondary/35',
    'from-c-secondary/45',
    'bg-c-secondary/50',
    'bg-c-secondary/55',
  ];
  return (
    <Link to={`/payment?season-ticket-id=${data.id}`} className="w-full  max-w-[700px]">
      <div
        className={` group h-42 origin-left 
       bg-gradient-to-r ${colors[index]} from-80% to-transparent
        p-2 tablet:p-5 px-5 laptop:px-10 pr-10 laptop:pr-32 flex flex-row justify-between gap-2 tablet:gap-5 hover:scale-[1.08] ease-out transition-scale duration-150`}
      >
        <div className="py-3 flex flex-col justify-between">
          <h1 className="w-fit text-start text-white text-2xl font-bold ">{name}</h1>
          <div className="flex ms-6">
            {[...Array(data.seatQuantity)].map(() => (
              <div className="-ms-8 group-hover:-ms-7 tablet:group-hover:-ms-4 duration-500">
                <SvgIcon
                  icon="ticket"
                  color="c-accent"
                  size="40px"
                  className="stroke-white -rotate-[30deg] group-hover:rotate-6 duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="h-fit p-3 grid grid-cols-6 gap-1 font-semibold text-xl text-c-text items-end">
          <span className="col-span-3">Ár:</span>
          <span className="me-2 col-span-2 text-end text-c-accent text-2xl"> {price} </span>
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
