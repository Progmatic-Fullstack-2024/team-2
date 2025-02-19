import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import ImageTitle from '../components/misc/ImageTitle';
import TheatersList from '../components/theaters/TheatersList';
import theatersService from '../services/theaters.service';

export default function TheatersPage() {
  const [theaters, setTheaters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTheaters = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await theatersService.getTheaters();
      setTheaters(data);
    } catch (err) {
      toast.error('Hiba történt a színházak lekérése közben:', err);
      setError('Hiba történt az adatok betöltésekor.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTheaters();
  }, []);

  if (loading) {
    return (
      <>
        <ImageTitle title="Színházak" description="Színházak, akik a BreakThe4th partnerei!" />
        <div className="min-h-screen flex flex-col items-center justify-center pt-32">
          <p className="text-white text-lg">Betöltés...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <ImageTitle title="Színházak" description="Színházak, akik a BreakThe4th partnerei!" />
        <div className="min-h-screen flex flex-col items-center justify-center pt-32">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </>
    );
  }

  return (
    <>
      <ImageTitle title="Színházak" description="Színházak, akik a BreakThe4th partnerei!" />
      <div className="min-h-screen flex flex-col items-center justify-center pt-32 ">
        <TheatersList theaters={theaters} />
      </div>
    </>
  );
}
