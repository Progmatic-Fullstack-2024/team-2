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
      <div className=" w-full p-20 flex flex-wrap flex-cols justify-center gap-10">
        {seasonTickets.map((item, index) => <SeasonTicketsCard key={item.id} data={item} index={index} />)}
      </div>
    </>
  );
}
