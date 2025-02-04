import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import PerformancesService from '../../services/performances.service';
import DefaultButton from '../misc/DefaultButton';
import PerformanceList from '../performances/PerformancesList';

export default function TheaterForTheaterAdmin({ theater }) {
  const [performances, setPerformances] = useState([]);
  const navigate = useNavigate();
  const rendered = useRef(false);

  const getPerformances = async () => {
    try {
      console.log('Fetching performances...');
      const data = await PerformancesService.listAll();
      console.log('Fetched data:', data); // Ellenőrizzük, hogy érkezik-e válasz
      setPerformances(data || []);
    } catch (error) {
      console.error('Hiba történt a performanszok lekérésekor:', error);
      setPerformances({ data: [] });
    }
  };

  useEffect(() => {
    if (!rendered.current) {
      rendered.current = true;
      localStorage.setItem('empty_performance_img', '../../../public/Theatron.jpg');
      getPerformances();
    }
  }, []);

  if (!theater || !theater.theater) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-bold">
        Nem található hozzád rendelt színház.
      </div>
    );
  }

  const { id, name, address, email, imageURL, phone, seatsAvailable } = theater.theater;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10">
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden flex items-center justify-center">
        <img
          src={imageURL || 'https://via.placeholder.com/1200x600?text=Nincs+plakát'}
          alt={name || 'Színház'}
          className="w-full h-auto"
        />
      </div>

      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden p-5 mt-5">
        <h1 className="text-4xl font-bold mb-6 text-center">{name}</h1>

        <p className="text-lg mb-2">{address}</p>
        <p className="text-lg mb-2">{email}</p>
        <p className="text-lg mb-2">{phone || 'Nincs megadva telefonszám'}</p>
        <p className="text-lg mb-2">
          {seatsAvailable !== null
            ? `${seatsAvailable} elérhető ülőhely`
            : 'Nincs megadva ülőhelykapacitás'}
        </p>

        <div className="flex justify-center mt-5">
          <DefaultButton text="Szerkesztés" onClick={() => navigate(`/edit-theater/${id}`)} />
        </div>
      </div>

      {/* PerformanceList csak akkor renderelődik, ha van adat */}
      {performances.length > 0 && <PerformanceList performances={performances} />}
    </div>
  );
}
