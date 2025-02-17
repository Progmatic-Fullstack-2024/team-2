import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// Components
import ImageTitle from '../components/misc/ImageTitle';
import Pagination from '../components/misc/Pagination';
import Spinner from '../components/misc/Spinner';
import SideBar from '../components/performances/filter/SideBar';
import PerformancesList from '../components/performances/PerformancesList';
import PerformancesSearch from '../components/performances/PerformancesSearch';
import performancesService from '../services/performances.service';

localStorage.setItem('empty_performance_img', 'Theatron.jpg');

let renderedParams = null;

export default function PerformancesPage() {
  const [performances, setPerformances] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  const getPeformances = async (params) => {
    const data = await performancesService.list(params);
    setPerformances(data);
  };

  useEffect(() => {
    if (renderedParams !== searchParams) {
      renderedParams = searchParams;
      getPeformances(searchParams);
    }
  }, [searchParams]);

  return (
    <>
      <ImageTitle
        title="Előadások"
        description="Keress könnyedén és gyorsan az előadások között, hogy megtaláláld a számodra legalkalmasabbat!"
      />

      <div className="relative w-full flex flex-cols my-5 justify-center ">
        {performances ? (
          <>
            <div className="w-full flex flex-cols tablet:flex-row items-center  justify-center">
              <SideBar
                params={{ searchParams, setSearchParams }}
                className={'hidden laptop:block '}
              />
              <div className="w-full laptop:w-fit min-h-screen flex flex-col items-start gap-3">
                <PerformancesSearch
                  params={{ searchParams, setSearchParams, maxSize: performances.maxSize }}
                />
                <div className="w-full tablet:w-fit mx-auto flex flex-col gap-5">
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
              </div>
            </div>
          </>
        ) : (
          <Spinner color="white" />
        )}
      </div>
    </>
  );
}
