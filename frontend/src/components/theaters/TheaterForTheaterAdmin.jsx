import { useNavigate } from 'react-router-dom';

import DefaultButton from '../misc/DefaultButton';
import PerformancesList from '../performances/PerformancesList';

export default function TheaterForTheaterAdmin({ theater }) {
  const navigate = useNavigate();

  if (!theater || !theater.theater) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-bold">
        Nem található hozzád rendelt színház.
      </div>
    );
  }

  const { id, name, address, email, imageURL, phone, seatsAvailable, performances } =
    theater.theater;

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

      <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden p-5 mt-5">
        <h2 className="text-3xl font-bold mb-4">Előadások</h2>
        {Array.isArray(performances) && performances.length > 0 ? (
          <PerformancesList performances={performances} />
        ) : (
          <p className="text-lg italic">Még nincs ehhez a színházhoz tartozó előadás.</p>
        )}
        <div className="flex justify-center mt-5">
          <DefaultButton
            text="Új előadás hozzáadása"
            onClick={() => navigate(`/new-performance?theaterId=${id}`)}
          />
        </div>
      </div>
    </div>
  );
}
