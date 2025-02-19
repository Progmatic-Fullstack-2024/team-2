import { useEffect, useState } from 'react';

// components
import MenuButton from './MenuButton';
// services
import creatorsService from '../../../services/creators.service';
import genresService from '../../../services/genres.service';
import theatersService from '../../../services/theaters.service';
import DefaultButton from '../../misc/DefaultButton';
import Spinner from '../../misc/Spinner';

function convertURL(url) {
  return String(url)
    .split(',')
    .filter((item) => item !== '');
}

const filterData = [];
function addFilterData(name, searchName, options, searchOptions, type = 'checkbox') {
  filterData.push({ name, searchName, options, searchOptions, type });
}

async function fetchTheaters() {
  const response = await theatersService.getTheaterForDropdown();
  addFilterData(
    'Színház',
    'theater',
    response.map((value) => value.name),
    response.map((value) => value.id),
    'checkbox',
  );
}

async function fetchCreatros() {
  const response = await creatorsService.getCreators();
  addFilterData(
    'Készítők',
    'creators',
    response.map((value) => value.name),
    response.map((value) => value.id),
  );
}
async function fetchGenres() {
  const response = await genresService.listAllGenre();
  addFilterData(
    'Műfaj',
    'genre',
    response.map((value) => value.name),
    response.map((value) => value.name),
  );
}

export default function SideBar({ params, className }) {
  const { searchParams, setSearchParams } = params;
  const [fetchReady, setFetchReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuOpenClass = `${menuOpen ? 'scale-100 ' : 'scale-0'} flex origin-top-left transition transition-scale duration-150 `;

  async function createFilterData() {
    addFilterData(
      'Dátum',
      'date',
      ['2020', '2021', '2023', '2024', '2025'],
      ['2020', '2021', '2023', '2024', '2025'],
      'calendar',
    );
    await fetchTheaters();
    await fetchCreatros();
    await fetchGenres();
    setFetchReady(true);
  }

  useEffect(() => {
    if (filterData.length === 0) {
      createFilterData();
    } else if (filterData.length === 4) {
      setFetchReady(true);
    }
  }, []);

  const handleChange = ({ searchName, searchValue, type }) => {
    let query = searchParams.get(searchName);
    searchParams.set('page', 1);
    switch (type) {
      case 'radio':
        if (!searchValue) {
          searchParams.delete(searchName);
        } else {
          searchParams.set(searchName, searchValue);
        }
        break;

      case 'checkbox':
        if (!query) {
          // add new param if not exists
          searchParams.set(searchName, searchValue);
        } else if (!query.includes(searchValue)) {
          // add new value to array if  not exists
          query = convertURL(query);
          searchParams.set(searchName, [query, searchValue]);
        } else {
          // remove param
          query = convertURL(query);
          if (query.length === 1) {
            searchParams.delete(searchName);
          } else {
            searchParams.set(
              searchName,
              query.filter((value) => value !== searchValue),
            );
          }
        }
        break;
      case 'calendar':
        searchValue.startDate
          ? searchParams.set('startDate', searchValue.startDate)
          : searchParams.delete('startDate');

        searchValue.endDate
          ? searchParams.set('endDate', searchValue.endDate)
          : searchParams.delete('endDate');

        break;
      default:
        break;
    }

    setSearchParams(searchParams);
  };

  return (
    <div
      className={
        className +
        ' mx-2 tablet:ms-0 laptop:mx-2 laptop:mt-0 laptop:static absolute pointer-events-none left-0 z-20 min-h-full '
      }
    >
      <div className="sticky top-[115px] laptop:top-[140px] flex flex-cols">
        <div className="laptop:hidden me-3 tablet:ms-3 pointer-events-auto ">
          <div
            role="button"
            tabIndex={0}
            aria-label="Hide dropdown"
            className={`${menuOpen ? 'fixed' : 'hidden'} backdrop-blur-sm top-0 left-0 -z-10 w-full h-full cursor-default bg-black/20`}
            onClick={() => setMenuOpen(false)}
            onKeyDown={() => setMenuOpen(false)}
          />
          <DefaultButton
            text="button"
            onClick={() => setMenuOpen(!menuOpen)}
            icon={`${menuOpen ? 'double-left' : 'double-right'}`}
            iconSize="40px"
          />
        </div>
        <div
          className={`${
            menuOpenClass
          }  bg-c-secondary-darkest laptop:flex laptop:scale-100 min-w-[250px] h-fit flex-col gap-1 text-c-text  rounded-lg overflow-hidden`}
        >
          {fetchReady ? (
            filterData.map((element) => (
              <MenuButton
                key={element.name}
                data={element}
                searchParams={searchParams}
                handleChange={handleChange}
              />
            ))
          ) : (
            <div className="h-10 flex justify-center items-center">
              <Spinner size={5} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
