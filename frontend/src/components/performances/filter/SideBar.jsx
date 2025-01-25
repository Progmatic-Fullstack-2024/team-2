// import { useEffect } from 'react';

import MenuButton from './MenuButton';
// import getTheaters from '../../../services/theaters.service';

const filterData = [];
function addFilterData(name, searchName, options, searchOptions, type = 'checkbox') {
  filterData.push({ name, searchName, options, searchOptions, type });
}

addFilterData(
  'Ár',
  'price',
  ['Korlátlan', '2000 Ft alatt', '4000 Ft alatt', '6000 Ft alatt'],
  [null, '2000', '4000', '6000'],
  'radio',
);

addFilterData(
  'Dátum',
  'date',
  ['2020', '2021', '2023', '2024', '2025'],
  ['2020', '2021', '2023', '2024', '2025'],
);
addFilterData('Színház', 'theater', ['Nemzeti', 'Miskolci'], ['Nemzeti', 'Miskolci']);
addFilterData('Alkotók', 'creators', ['Panna', 'Pisti'], ['Panna', 'Pisti']);

function convertURL(url) {
  return String(url)
    .split(',')
    .filter((item) => item !== '');
}

// async function fetchTheaters() {
//   try {
//     const theaters = await getTheaters();
//   } catch (error) {}
// }

export default function SideBar({ params }) {
  const { searchParams, setSearchParams } = params;

  // useEffect(() => {
  //   fetchTheaters();
  // }, []);

  const handleChange = ({ searchName, searchValue, type }) => {
    let query = searchParams.get(searchName);

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
      default:
        break;
    }

    setSearchParams(searchParams);
  };

  return (
    <div className="min-w-48 h-fit flex flex-col gap-1 bg-c-primary/30 text-c-text mx-5 sticky top-24 rounded-lg overflow-hidden">
      {filterData.map((element) => (
        <MenuButton
          key={element.name}
          data={element}
          searchParams={searchParams}
          handleChange={handleChange}
        />
      ))}
    </div>
  );
}
