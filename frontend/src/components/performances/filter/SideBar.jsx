import { useEffect, useState } from 'react';

// components
import MenuButton from './MenuButton';
// services
import creatorsService from '../../../services/creators.service';
import genresService from '../../../services/genres.service';
import theatersService from '../../../services/theaters.service';
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

async function fetchCreators() {
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

addFilterData(
  'Dátum',
  'date',
  ['2020', '2021', '2023', '2024', '2025'],
  ['2020', '2021', '2023', '2024', '2025'],
  'calendar',
);
fetchTheaters();
fetchCreators();
fetchGenres();

export default function SideBar({ params }) {
  const { searchParams, setSearchParams } = params;
  const [fetchReady, setFetchReady] = useState(false);

  useEffect(() => {
    if (filterData.length === 4) setFetchReady(true);
  }, [filterData]);

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
        searchParams.set('startDate', searchValue.startDate);
        searchParams.set('endDate', searchValue.endDate);
        break;
      default:
        break;
    }

    setSearchParams(searchParams);
  };

  return (
    <div className="min-w-fit laptop:min-w-52 h-fit flex flex-col gap-1 bg-c-primary/30 text-c-text sticky top-24 rounded-lg overflow-hidden">
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
  );
}
