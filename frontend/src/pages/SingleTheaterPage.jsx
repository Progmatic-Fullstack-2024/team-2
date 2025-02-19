import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import DefaultButton from '../components/misc/DefaultButton';
import ImageTitle from '../components/misc/ImageTitle';
import PerformancesList from '../components/performances/PerformancesList';
import theatersService from '../services/theaters.service';

export default function SingleTheaterPage() {
  const { id } = useParams(); // URL-ből azonosító
  const navigate = useNavigate();
  const [theater, setTheater] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTheaterById = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await theatersService.getById(id); // Feltételezve, hogy van egy API hívás erre
        setTheater(data);
      } catch (err) {
        toast.error('Hiba a színház betöltésekor:', err);
        setError('Nem található a színház.');
      } finally {
        setLoading(false);
      }
    };

    fetchTheaterById();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-lg">Betöltés...</div>;
  }

  if (error || !theater) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-bold">
        {error || 'Nem található a színház.'}
      </div>
    );
  }

  const { name, address, email, imageURL, phone, seatsAvailable, performances } = theater;

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <ImageTitle title={theater.name} />
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
        </div>

        <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden p-5 mt-5">
          <h2 className="text-3xl font-bold mb-4">Előadások</h2>
          {Array.isArray(performances) && performances.length > 0 ? (
            <PerformancesList performances={performances} />
          ) : (
            <p className="text-lg italic">Még nincs ehhez a színházhoz tartozó előadás.</p>
          )}
          <div className="flex justify-center mt-5">
            <DefaultButton text="Vissza" onClick={handleBack} />
          </div>
        </div>
      </div>
    </>
  );
}
