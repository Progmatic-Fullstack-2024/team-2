import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// Components
import ImageTitle from '../components/misc/ImageTitle';
import PerformancesByGenre from '../components/performances/PerformancesByGenre';
import PerformancesByTheaters2 from '../components/performances/PerformancesByTheaters2';
import PerformancesNextWeek from '../components/performances/PerformancesNextWeek';
import performancesService from '../services/performances.service';

export default function BrowsingPage() {
  const [performances, setPerformances] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchParams] = useSearchParams();
  const rendered = useRef(false); // stops unnecessary rerender of performances state

  const getPerformances = async () => {
    const data = await performancesService.listAll();
    setPerformances(data);
  };

  const getGenres = async () => {
    const genreData = await performancesService.listAllGenre();
    setGenres(genreData);
  };

  useEffect(() => {
    if (!rendered.current) {
      rendered.current = true;
      localStorage.setItem('empty_performance_img', '../../../public/Theatron.jpg');
      getPerformances();
      getGenres();
    }
  }, []);

  useEffect(() => {
    getPerformances();
  }, [searchParams]);

  // Műfajok szétválasztása 3-nál több előadással rendelkezők és egyéb kategóriába
  const frequentGenres = genres.filter((genre) => genre.count >= 3);
  const rareGenres = genres.filter((genre) => genre.count < 3);

  // Az "egyéb műfajok" előadásainak összegyűjtése
  const otherPerformances = performances.filter((p) =>
    p.genre.some((g) => rareGenres.some((rg) => rg.name === g.name))
  );

  return (
    <>
      <ImageTitle
        title="Theatron"
        description="Üdvözlünk a világ első színházi bérlet applikációjában! Válaszd ki a darabot, a helyed és már mehetsz is!"
      />

      <div className="w-full max-w-screen-desktop flex flex-col items-center mx-auto">
        {performances.length > 0 && <PerformancesNextWeek performances={performances} />}
      </div>
      <div className="w-full max-w-screen-desktop flex flex-col items-center mx-auto">
        {performances.length > 0 && <PerformancesByTheaters2 performances={performances} />}
      </div>

      {/* Legalább 3 előadásos műfajok */}
      {frequentGenres.map((genre) => (
        <div
          key={genre.name}
          className="w-full max-w-screen-desktop flex flex-col items-center mx-auto"
        >
          <PerformancesByGenre
            performances={performances.filter((p) => p.genre.some((g) => g.name === genre.name))}
            genre={genre}
          />
        </div>
      ))}

      {/* Egyéb műfajok */}
      {otherPerformances.length > 0 && (
        <div className="w-full max-w-screen-desktop flex flex-col items-center mx-auto">
          <PerformancesByGenre performances={otherPerformances} genre={{ name: 'Egyéb műfajok' }} />
        </div>
      )}
    </>
  );
}
