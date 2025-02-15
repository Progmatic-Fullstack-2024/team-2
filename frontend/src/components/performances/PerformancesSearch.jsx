import { useEffect, useRef } from 'react';

import DropdownButton from '../misc/DropdownButton';
import SvgIcon from '../misc/SvgIcon';

export default function PerformancesSearch({ params }) {
  const { searchParams, setSearchParams, maxSize } = params;
  const titleSearchRef = useRef(null);

  useEffect(() => {
    titleSearchRef.current.value = searchParams.get('search');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchParams.set('page', 1);
    if (e.target.inputSearchTitle.value) {
      searchParams.set('search', e.target.inputSearchTitle.value);
    } else {
      searchParams.delete('search');
    }

    setSearchParams(searchParams);
  };

  return (
    <div className="h-fit min-h-32 w-full mb-2 z-10 bg-gray-700 p-2 laptop:static sticky top-[105px] p-3 tablet:p-5  rounded-md">
      <form
        id="inputForm"
        className="w-full min-w-80 max-w-[600px] self-start mb-6"
        onSubmit={handleSubmit}
      >
        <div className="relative flex items-center p-1 ms-16 laptop:ms-0">
          <div className="absolute inset-y-0 start-2 flex items-center ps-3 pointer-events-none">
            <SvgIcon
              icon="magn-glass"
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              color="gray-500"
            />
          </div>
          <input
            name="inputSearchTitle"
            className="outline-none block w-full h-9 ps-12 text-sm text-gray-900 border border-gray-400 rounded-s-xl outline:0 focus:ring-1 ring-c-primary  "
            placeholder="Előadás keresése..."
            ref={titleSearchRef}
          />
          <button
            type="submit"
            className="py-2 px-5 bg-c-primary hover:bg-c-primary-light active:bg-c-primary-dark rounded-e-xl text-white font-semibold "
          >
            Keresés
          </button>
        </div>
      </form>
      <div className="flex justify-between text-c-text">
        <div>
          <span className="text-xl font-bold me-3">{maxSize}</span>
          <span className="hidden laptop:inline-block"> Találat</span>
        </div>

        <div className="flex gap-3 ">
          <DropdownButton
            key="orderByMenuButton"
            menuItems={{ Cím: 'title', Dátum: 'performanceDate' }}
            props={{ searchParams, setSearchParams }}
            initialValue={searchParams.get('orderBy')}
            searchVariable="orderBy"
          />
          <DropdownButton
            key="sortMenuButton"
            menuItems={{ Növekvő: 'asc', Csökkenő: 'desc' }}
            props={{ searchParams, setSearchParams }}
            initialValue={searchParams.get('sort')}
            searchVariable="sort"
          />
          <DropdownButton
            key="limitMenuButton"
            menuItems={{ 12: '12', 21: '21', 30: '30' }}
            props={{ searchParams, setSearchParams }}
            initialValue={searchParams.get('limit')}
            searchVariable="limit"
            reload
          />
        </div>
      </div>
    </div>
  );
}
