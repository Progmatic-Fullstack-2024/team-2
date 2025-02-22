import { useContext } from 'react';

import AuthContext from '../../contexts/AuthContext';
import DropdownButton from '../misc/DropdownButton';
import SvgIcon from '../misc/SvgIcon';
import CheckboxLabel from './filter/CheckboxLabel';
import SideBar from './filter/SideBar';

export default function PerformancesSearch({ params }) {
  const { searchParams, setSearchParams, maxSize } = params;
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchParams.set('page', 1);
    switch (e.target.id) {
      case 'searchForm':
        if (e.target.inputSearchTitle.value) {
          searchParams.set('search', e.target.inputSearchTitle.value);
        } else {
          searchParams.delete('search');
        }
        break;
      case 'futureOnly':
        if (e.target.checked) {
          searchParams.set('futureOnly', 'true');
        } else {
          searchParams.delete('futureOnly');
        }
        setSearchParams(searchParams);
        break;
      case 'followingOnly':
        if (e.target.checked) {
          searchParams.set('followingOnly', 'true');
          searchParams.set('userId', user?.id || ''); // 🔹 Beállítjuk a userId-t a szűréshez
        } else {
          searchParams.delete('followingOnly');
          searchParams.delete('userId');
        }
        break;
      default:
        break;
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="h-fit min-h-32 w-full mb-2 z-10 bg-c-background border border-c-secondary/20 p-2 laptop:static sticky top-[97px] p-3 tablet:p-5  rounded-md">
      <SideBar params={{ searchParams, setSearchParams }} className="laptop:hidden" />
      <form
        id="searchForm"
        className="w-full min-w-80 max-w-[600px] self-start "
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
            defaultValue={searchParams.get('search')}
          />
          <button
            type="submit"
            className="py-2 px-5 bg-c-primary hover:bg-c-primary-light active:bg-c-primary-dark rounded-e-xl text-white font-semibold "
          >
            Keresés
          </button>
        </div>
      </form>
      <div className="mt-2  mb-3 flex justify-start gap-8">
        {/* Csak jövőbeni előadások szűrő */}
        <CheckboxLabel
          id="futureOnly"
          type="checkbox"
          text="Csak tervezett előadások"
          newChecked={(searchParams.get('futureOnly') && 'checked') || false}
          onChange={handleSubmit}
        />
        {/* Csak követett előadások szűrő */}
        {user && (
          <CheckboxLabel
            id="followingOnly"
            text="Csak követett előadások"
            newChecked={(searchParams.get('followingOnly') && 'checked') || false}
            onChange={handleSubmit}
          />
        )}
      </div>
      <div className="flex justify-between text-c-text">
        <div>
          <span className="text-xl font-bold me-3">{maxSize}</span>
          <span> Találat</span>
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
