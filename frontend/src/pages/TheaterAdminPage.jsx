import { useContext, useEffect, useState } from 'react';

import ImageTitle from '../components/misc/ImageTitle';
import TheaterForTheaterAdmin from '../components/theaters/TheaterForTheaterAdmin';
import AuthContext from '../contexts/AuthContext';
import theaterService from '../services/theaters.service';

export default function TheaterAdminPage() {
  const { user } = useContext(AuthContext);
  const [theater, setTheater] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'theaterAdmin' && user.id) {
      // Lekérdezzük az adott userhez tartozó színházat
      theaterService
        .getTheaterByUserId(user.id)
        .then((theaterData) => {
          setTheater(theaterData);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!user || user.role !== 'theaterAdmin') {
    return (
      <div className="text-center mt-10 text-red-500">
        Nincs jogosultságod az oldal megtekintéséhez.
      </div>
    );
  }

  return (
    <>
      <ImageTitle title="Theater Admin page" description="Theater Admin page" />
      <div className="min-h-screen flex flex-col items-center justify-center pt-32">
        {theater ? (
          <TheaterForTheaterAdmin theater={theater} />
        ) : (
          <div className="text-red-500">Nem található hozzád rendelt színház.</div>
        )}
      </div>
    </>
  );
}
