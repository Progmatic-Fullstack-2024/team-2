import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// Components
import ImageTitle from '../components/misc/ImageTitle';
import Pagination from '../components/misc/Pagination';
import SideBar from '../components/performances/filter/SideBar';
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
      <div className="flex flex-cols my-5 px-3 justify-center gap-2 tablet:gap-3 desktop:gap-10">
        <div>
          <SideBar params={{ searchParams, setSearchParams }} />
        </div>
        <div className="flex flex-cols tablet:flex-row items-center tablet:items-start justify-center">
          {performances ? (
            <div className="min-h-screen flex flex-col items-start gap-5">
              <PerformancesSearch
                params={{ searchParams, setSearchParams, maxSize: performances.maxSize }}
              />
              <Pagination
                key="PaginationTop"
                params={{ searchParams, setSearchParams, maxSize: performances.maxSize }}
              />
              <PerformancesList performances={performances.data} />
              <Pagination
                key="PaginationBot"
                params={{ searchParams, setSearchParams, maxSize: performances.maxSize }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
