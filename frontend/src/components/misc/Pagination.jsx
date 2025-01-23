import { useEffect, useRef } from 'react';

export default function Pagination({ params }) {
  const { searchParams, setSearchParams, maxSize } = params;
  const maxPagination = Math.ceil(maxSize / (searchParams.get('limit') || 12));
  const focusRef = useRef(1);

  const arrowClass =
    'flex items-center justify-center px-3 h-8 ms-0 text-c-text leading-tight ring-1 ring-gray-600 hover:ring-c-accent cursor-pointer select-none';
  const activeClass = 'bg-c-primary/80 font-bold text-xl ring-1 h-9 hover:ring-c-accent  ';

  useEffect(() => {
    focusRef.current = Number(searchParams.get('page')) || 1;
  }, [maxSize, searchParams]);

  const changePage = ({ direction, page }) => {
    let newPage;
    if (direction) {
      newPage = Number(focusRef.current) + direction;
    } else if (page) {
      newPage = page;
    }

    if (newPage !== focusRef.current && newPage > 0 && newPage <= maxPagination) {
      searchParams.set('page', newPage);
      setSearchParams(searchParams);
    }
  };

  return (
    <nav aria-label="Page navigation example ">
      <ul className="flex items-center  my-1">
        <li>
          <button
            type="button"
            className={`${arrowClass} rounded-s-md me-1`}
            onClick={() => changePage({ direction: -1 })}
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-3 h-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </button>
        </li>
        <ul className="flex justify-center items-center gap-2 mx-2">
          {[...Array(maxPagination)].map((key, index) => (
            <li key={index + 1}>
              <button
                type="button"
                className={`flex items-center justify-center px-3 h-8 leading-tight ring-1 ring-gray-600 text-c-text rounded-sm select-none cursor-pointer ${focusRef.current === index + 1 ? activeClass : ' hover:ring-c-accent'}`}
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
            <span className="sr-only">Next</span>
            <svg
              className="w-3 h-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
}
