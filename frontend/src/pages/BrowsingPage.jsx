import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// Components
import ImageTitle from '../components/misc/ImageTitle';
// import PerformancesList from '../components/performances/PerformancesList';
import PerformancesByGenre from '../components/performances/PerformancesByGenre';
import PerformancesByTheaters2 from '../components/performances/PerformancesByTheaters2';
import PerformancesNextWeek from '../components/performances/PerformancesNextWeek';
import performancesService from '../services/performances.service';

export default function BrowsingPage() {
  const [performances, setPerformances] = useState();
  const [genres, setGenres] = useState([]);
  const [searchParams] = useSearchParams();
  const rendered = useRef(false); // stops unnecessary rerender of performances state

  const getPeformances = async () => {
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
      getPeformances(searchParams);
      getGenres();
    }
  }, []);

  useEffect(() => {
    getPeformances(searchParams);
  }, [searchParams]);

  return (
    <>
      <ImageTitle
        title="Theatron"
        description="Üdvözlünk a világ első színházi bérlet applikációjában! Válaszd ki a darabot, a helyed és már mehetsz is!"
      />

      <div className="w-full max-w-screen-desktop flex flex-col items-center mx-auto ">
        {performances ? <PerformancesNextWeek performances={performances} /> : null}
      </div>
      <div className="w-full max-w-screen-desktop flex flex-col items-center mx-auto">
        {performances ? <PerformancesByTheaters2 performances={performances} /> : null}
      </div>
      {genres.map((genre) => (
        <div
          key={genre.id}
          className="w-full max-w-screen-desktop flex flex-col items-center mx-auto"
        >
          {performances ? <PerformancesByGenre performances={performances} genre={genre} /> : null}
        </div>
      ))}
    </>
  );
}
