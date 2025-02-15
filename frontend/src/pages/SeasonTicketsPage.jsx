import React, { useEffect, useState } from 'react';

import ImageTitle from '../components/misc/ImageTitle.jsx';
import SeasonTicketsCard from '../components/season_tickets/SeasonTicketsCard.jsx';
import seasonTicketsService from '../services/season-tickets.service.js';

let fetchedData = null;

export default function SeasonTickets() {
  const [seasonTickets, setSeasonTickets] = useState(fetchedData);

  async function getSeasonTicketsData() {
    fetchedData = await seasonTicketsService.list();
    setSeasonTickets(fetchedData);
  }

  useEffect(() => {
    if (!fetchedData) {
      fetchedData = true;
      getSeasonTicketsData();
    }
  }, []);

  if (!seasonTickets) return <div>Loading...</div>;

  return (
    <>
      <ImageTitle
        title="Bérletvásárlás"
        description="Választhatsz különböző bérletcsomagok közül..."
      />
      <div className="mx-auto w-fit flex items-center justify-center my-20 ">
        <div className="max-h-[700px] w-[600px] hidden laptop:flex ">
          <img src="season-ticket-bg.png" className="bg-cover" alt="season-ticket-picture" />
          <div className="w-[150px] h-full absolute float-right bg-gradient-to-r from-10% from-c-background  to-transparent" />
        </div>

        <div className="w-full tablet:ms-10 flex flex-wrap flex-col items-start justify-center gap-5">
          {seasonTickets.map((item, index) => (
            <SeasonTicketsCard key={item.id} data={item} index={index} />
          ))}
        </div>
      </div>
    </>
  );
}
