import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// Components
import ImageTitle from '../components/misc/ImageTitle';
// import PerformancesList from '../components/performances/PerformancesList';
import PerformancesByTheaters from '../components/performances/PerformancesByTheaters';
import PerformancesNextWeek from '../components/performances/PerformancesNextWeek';
import performancesService from '../services/performances.service';

export default function PerformancesPage() {
  const [performances, setPerformances] = useState();
  const [searchParams] = useSearchParams();
  const rendered = useRef(false); // stops unnecessary rerender of performances state

  const getPeformances = async (params) => {
    const data = await performancesService.list(params);
    setPerformances(data);
  };

  useEffect(() => {
    if (!rendered.current) {
      rendered.current = true;
      localStorage.setItem('empty_performance_img', '../../../public/Theatron.jpg');
      getPeformances(searchParams);
    }
  }, []);

  useEffect(() => {
    getPeformances(searchParams);
  }, [searchParams]);

  return (
    <>
      <ImageTitle
        title="Előadások"
        description="Keress könnyedén és gyorsan az előadások között, hogy megtaláláld a számodra legalkalmasabbat!"
      />

      <div className="w-full max-w-screen-desktop flex flex-col items-center mx-auto ">
        {performances ? <PerformancesNextWeek performances={performances} /> : null}
      </div>
      <div className="w-full max-w-screen-desktop flex flex-col items-center mx-auto">
        {performances ? <PerformancesByTheaters performances={performances} /> : null}
      </div>
    </>
  );
}
