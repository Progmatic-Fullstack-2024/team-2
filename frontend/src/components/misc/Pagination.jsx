import { useEffect, useState } from 'react';

import SvgIcon from './SvgIcon';

export default function Pagination({ params }) {
  const { searchParams, setSearchParams, maxSize } = params;
  const maxPagination = Math.ceil(maxSize / (searchParams.get('limit') || 12));

  const [focusState, setFocusState] = useState(1);

  const arrowClass =
    'flex items-center justify-center px-3 h-8 ms-0 text-c-text leading-tight ring-1 ring-gray-600 hover:ring-c-secondary/60 cursor-pointer select-none';
  const activeClass = 'bg-c-primary/80 font-bold text-xl ring-1 h-9 hover:ring-c-secondary  ';

  useEffect(() => {
    setFocusState(Number(searchParams.get('page')) || 1);
  }, [maxSize, searchParams]);

  const changePage = ({ direction, page }) => {
    let newPage;
    if (direction) {
      newPage = Number(focusState) + direction;
    } else if (page) {
      newPage = page;
    }

    if (newPage !== focusState && newPage > 0 && newPage <= maxPagination) {
      searchParams.set('page', newPage);
      setSearchParams(searchParams);
    }
  };

  return (
    <nav>
      <ul className="flex items-center  my-1">
        <li>
          <button
            type="button"
            className={`${arrowClass} rounded-s-md me-1`}
            onClick={() => changePage({ direction: -1 })}
          >
            <SvgIcon icon="arrow-left" size="15px" />
          </button>
        </li>
        <ul className="flex justify-center items-center gap-2 mx-2">
          {[...Array(maxPagination)].map((key, index) => (
            <li key={index + 1}>
              <button
                type="button"
                className={`flex items-center justify-center px-3 h-8 leading-tight ring-1 ring-gray-600 text-c-text rounded-sm select-none cursor-pointer ${focusState === index + 1 ? activeClass : ' hover:ring-c-secondary/60'}`}
                onClick={() => changePage({ page: index + 1 })}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
        <li>
          <button
            type="button"
            className={`${arrowClass} rounded-e-md ms-1`}
            onClick={() => changePage({ direction: 1 })}
          >
            <SvgIcon icon="arrow-right" size="15px" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
