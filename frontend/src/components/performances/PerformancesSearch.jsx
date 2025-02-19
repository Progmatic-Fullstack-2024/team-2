import { useState, useEffect, useRef, useContext } from 'react';

import AuthContext from '../../contexts/AuthContext';
import DropdownButton from '../misc/DropdownButton';
import SvgIcon from '../misc/SvgIcon';

export default function PerformancesSearch({ params }) {
  const { searchParams, setSearchParams, maxSize } = params;
  const { user } = useContext(AuthContext);
  const titleSearchRef = useRef(null);

  const [futureOnly, setFutureOnly] = useState(searchParams.get('futureOnly') === 'true');
  const [followingOnly, setFollowingOnly] = useState(searchParams.get('followingOnly') === 'true');

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

  const handleFutureOnlyChange = (e) => {
    const isChecked = e.target.checked;
    setFutureOnly(isChecked);
    if (isChecked) {
      searchParams.set('futureOnly', 'true');
    } else {
      searchParams.delete('futureOnly');
    }
    setSearchParams(searchParams);
  };

  const handleFollowingOnlyChange = (e) => {
    const isChecked = e.target.checked;
    setFollowingOnly(isChecked);
    if (isChecked) {
      searchParams.set('followingOnly', 'true');
      searchParams.set('userId', user?.id || ''); // 🔹 Beállítjuk a userId-t a szűréshez
    } else {
      searchParams.delete('followingOnly');
      searchParams.delete('userId');
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="h-fit min-h-32 w-full min-w- mb-2 bg-c-secondary/10 p-5 rounded-md">
      <form
        id="inputForm"
        className="w-full min-w-96 tablet:w-1/2 self-start mb-6"
        onSubmit={handleSubmit}
      >
        <div className="relative flex items-center p-1 ">
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
            width={32}
          />
          <DropdownButton
            key="limitMenuButton"
            menuItems={{ 12: '12', 21: '21', 30: '30' }}
            props={{ searchParams, setSearchParams }}
            initialValue={searchParams.get('limit')}
            searchVariable="limit"
            width={20}
            reload
          />
        </div>
      </div>
      {/* Szűrési opciók - checkboxok */}
      <div className="mt-3 px-4 py-2 shadow-lg rounded-lg inline-flex items-center gap-8 flex-wrap">
        {/* Csak jövőbeni előadások szűrő */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="futureOnly"
            checked={futureOnly}
            onChange={handleFutureOnlyChange}
            className="cursor-pointer"
          />
          <label htmlFor="futureOnly" className="text-c-text cursor-pointer">
            Csak a tervezett előadások megjelenítése
          </label>
        </div>

        {/* Csak követett előadások szűrő */}
        {user && (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="followingOnly"
              checked={followingOnly}
              onChange={handleFollowingOnlyChange}
              className="cursor-pointer"
            />
            <label htmlFor="followingOnly" className="text-c-text cursor-pointer">
              Csak az általad követett előadások megjelenítése
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
