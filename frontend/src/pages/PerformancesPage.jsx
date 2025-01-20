import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// Components
import ImageTitle from '../components/misc/ImageTitle';
import Pagination from '../components/misc/Pagination';
import PerformancesList from '../components/performances/PerformancesList';
import PerformancesSearch from '../components/performances/PerformancesSearch';
import performancesService from '../services/performances.service';

export default function PerformancesPage() {
  const [performances, setPerformances] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

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
      {performances ? (
        <div className="min-h-screen w-full max-w-screen-desktop flex flex-col items-center mx-auto py-5 gap-5">
          <PerformancesSearch
            params={{ searchParams, setSearchParams, maxSize: performances.maxSize }}
          />
          {/* <Pagination
            key="PaginationTop"
            params={{ searchParams, setSearchParams, maxSize: performances.maxSize }}
          /> */}
          <PerformancesList performances={performances.data} />
          <Pagination
            key="PaginationBot"
            params={{ searchParams, setSearchParams, maxSize: performances.maxSize }}
          />
        </div>
      ) : null}
    </>
  );
}
