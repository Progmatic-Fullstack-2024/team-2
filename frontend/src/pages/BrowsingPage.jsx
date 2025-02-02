import { useContext, useEffect, useRef, useState } from 'react';

// Components
import AuthContext from '../contexts/AuthContext';
import ImageTitle from '../components/misc/ImageTitle';
import performancesService from '../services/performances.service';
import PerformanceBrowse from '../components/performances/PerformanceBrowse';

export default function BrowsingPage() {
  const { user } = useContext(AuthContext);
  const [genres, setGenres] = useState([]);
  const rendered = useRef(false); // stops unnecessary rerender of performances state

  const getGenres = async () => {
    const genreData = await performancesService.listAllGenre();
    setGenres(genreData);
  };

  // Convert userBirthDate to a Date object and extract only the date part
  const birthDate = new Date(user.BirthDate);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const isSameDay = (date1, date2) =>
    date1.getUTCDate() === date2.getUTCDate() && date1.getUTCMonth() === date2.getUTCMonth();

  // Check if today is the user's birthday (ignoring the year)
  const isBirthdayToday = isSameDay(birthDate, today);

  useEffect(() => {
    if (!rendered.current) {
      rendered.current = true;
      localStorage.setItem('empty_performance_img', '../../../public/Theatron.jpg');
      getGenres();
    }
  }, []);

  // Separation of genres into those with more than 3 performances and other categories
  const frequentGenres = genres.filter((genre) => genre.count >= 3);
  const rareGenres = genres.filter((genre) => genre.count < 3);

  return (
    <>
      <ImageTitle
        title="Theatron"
        description="Üdvözlünk a világ első színházi bérlet applikációjában! Válaszd ki a darabot, a helyed és már mehetsz is!"
      />

      {/* Performances for the birth of the logged-in user */}
      <div className="w-full max-w-screen-desktop flex flex-col items-center mx-auto ">
        {isBirthdayToday ? <PerformanceBrowse params={{ startDate: today, endDate: tomorrow }} /> : null}
      </div>

      {/* Genres with at least 3 performances */}
      {frequentGenres.map((genre) => (
        <div
          key={genre.name}
          className="w-full max-w-screen-desktop flex flex-col items-center mx-auto"
        >
          <PerformanceBrowse params={{ genres: [genre.name] }} />
        </div>
      ))}

      {/* Other genres */}
      {rareGenres.length > 0 && (
        <div className="w-full max-w-screen-desktop flex flex-col items-center mx-auto">
          <PerformanceBrowse params={{ genres: rareGenres.map((genre) => genre.name) }} />
        </div>
      )}
    </>
  );
}
