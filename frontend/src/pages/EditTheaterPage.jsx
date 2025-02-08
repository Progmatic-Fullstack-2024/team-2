import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ImageTitle from '../components/misc/ImageTitle.jsx';
import TheaterForm from '../components/theaters/EditTheaterForm.jsx';
import theaterService from '../services/theaters.service';

export default function EditTheaterPage() {
  const { id } = useParams(); // Színház ID az URL-ből
  const [theater, setTheater] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTheater() {
      const fetchedTheater = await theaterService.getById(id);
      setTheater(fetchedTheater);
      setLoading(false);
    }

    fetchTheater();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Betöltés...</div>;
  }

  if (!theater) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Nem található a színház.
      </div>
    );
  }

  return (
    <>
      <ImageTitle
        title="Színház módosítása"
        description="Itt tudod szerkeszteni a színház adatait"
      />
      <div className="min-h-screen flex flex-col items-center">
        <TheaterForm theater={theater} /> {/* Továbbadjuk az adatokat */}
      </div>
    </>
  );
}
