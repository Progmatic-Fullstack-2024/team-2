import { useEffect, useRef, useState } from 'react';
import ImageTitle from '../components/misc/ImageTitle';
import PerformancesList from '../components/performances/PerformancesList';
import performancesService from '../services/performances.service';
import PerformancesSidebar from '../components/performances/PerformancesSidebar';

export default function PerformancesPage() {
  const [performances, setPerformances] = useState();
  const rendered = useRef(false); // stops unnecessary rerender of performances state

  useEffect(() => {
    if (!rendered.current) {
      rendered.current = true;
      localStorage.setItem('empty_performance_img', '../../../public/Theatron.jpg');
      getPeformances();
    }
  }, []);

  const getPeformances = async () => {
    const data = await performancesService.list();
    setPerformances(data);
  };

  return (
    <>
      <ImageTitle
        title="Előadások"
        description="Keress könnyedén és gyorsan az előadások között, hogy megtaláláld a számodra legalkalmasabbat!"
      />
      <div className="flex flex-row">
        <PerformancesSidebar />
        <div className="min-h-screen w-full flex flex-col items-center tablet:px-5 laptop:px-20">
          {performances ? <PerformancesList performances={performances} /> : null}
        </div>
      </div>
    </>
  );
}
