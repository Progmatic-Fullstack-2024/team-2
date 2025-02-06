import { useContext, useEffect, useState } from 'react';

// Components
import ImageTitle from '../components/misc/ImageTitle';
import PerformanceBrowse from '../components/performances/PerformanceBrowse';
import AuthContext from '../contexts/AuthContext';
import genresService from '../services/genres.service';
import theatersService from '../services/theaters.service';

// Helper function for date formatting
const formatDate = (date) => date.toISOString().split('T')[0];

// Helper function for checking if two dates are the same (ignoring the year)
const isSameDay = (date1, date2) => {
  return date1.getUTCDate() === date2.getUTCDate() && date1.getUTCMonth() === date2.getUTCMonth();
};

export default function BrowsingPage() {
  const { user } = useContext(AuthContext);
  const [genres, setGenres] = useState([]);
  const [theaters, setTheaters] = useState([]);

  useEffect(() => {
    // Fetch genres and theaters once when the component is mounted
    const fetchData = async () => {
      const genreData = await genresService.listAllGenre();
      setGenres(genreData);

      const theaterData = await theatersService.getTheaters();
      setTheaters(theaterData);
    };

    fetchData();
    localStorage.setItem('empty_performance_img', '../../../public/Theatron.jpg');
  }, []);

  // Dates and birthday logic
  const birthDate = user ? new Date(user.birthDate) : new Date(0);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todayString = formatDate(today);
  const tomorrowString = formatDate(tomorrow);

  const isBirthdayToday = isSameDay(birthDate, today);

  // Separate genres by performance count
  const frequentGenres = genres.filter((genre) => genre.count >= 3);
  const rareGenres = genres.filter((genre) => genre.count < 3);

  // Helper to render PerformanceBrowse
  const renderPerformanceBrowse = (params, title) => (
    <div className="w-full max-w-screen-desktop flex flex-col items-center mx-auto">
      <PerformanceBrowse params={params} title={title} />
    </div>
  );

  return (
    <>
      <ImageTitle
        title="Theatron"
        description="Üdvözlünk a világ első színházi bérlet applikációjában! Válaszd ki a darabot, a helyed és már mehetsz is!"
      />

      {/* Performances for the birth of the logged-in user */}
      {isBirthdayToday &&
        renderPerformanceBrowse(
          { startDate: todayString, endDate: tomorrowString },
          'Boldog szülinapot! :) Nézd meg milyen előadások várnak ma ;)',
        )}

      {/* Genres with at least 3 performances */}
      {frequentGenres.map((genre) =>
        renderPerformanceBrowse({ genre: [genre.name] }, `Műfaj: ${genre.name}`),
      )}

      {/* Other genres */}
      {rareGenres.length > 0 &&
        renderPerformanceBrowse({ genre: rareGenres.map((genre) => genre.name) }, 'Egyéb műfaj')}

      {/* Performances per theater */}
      {theaters.length > 0 &&
        theaters.map((theater) =>
          renderPerformanceBrowse({ theater: theater.id }, `Szinház: ${theater.name}`),
        )}
    </>
  );
}
