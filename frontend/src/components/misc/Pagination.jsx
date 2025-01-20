import { useEffect, useRef } from 'react';

export default function Pagination({ params }) {
  const { searchParams, setSearchParams, maxSize } = params;
  const maxPagination = Math.ceil(maxSize / 10);
  const focusRef = useRef(1);

  const arrowClass =
    'flex items-center justify-center px-3 h-8 ms-0 leading-tight  bg-c-secondary/30  hover:bg-c-secondary/60 cursor-pointer select-none';
  const activeClass = 'bg-c-primary-light text-white font-bold text-xl hover:bg-c-primary h-9';

  useEffect(() => {
    focusRef.current = searchParams.get('page') || 1;

    console.log(maxPagination);
  }, [, maxSize, searchParams]);

  const changePage = ({ direction, page }) => {
    let newPage;
    if (direction) {
      newPage = Number(focusRef.current) + direction;
    } else if (page) {
      newPage = page;
    }

    if (newPage != focusRef.current && newPage > 0 && newPage <= maxPagination) {
      searchParams.set('page', newPage);
      setSearchParams(searchParams);
    }
  };
  // console.log('RENDER pagi');
  return (
    <>
      <nav aria-label="Page navigation example ">
        <ul className="flex items-center  my-4">
          <li>
            <a
              className={arrowClass + ' rounded-s-full me-1'}
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
            </a>
          </li>
          <ul className="flex justify-center items-center gap-2 mx-2">
            {[...Array(maxPagination)].map((key, index) => (
              <li
                key={index + 1}
                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-800 rounded-lg select-none cursor-pointer ${focusRef.current == index + 1 ? activeClass : 'bg-c-secondary/20 hover:bg-c-secondary/50'}`}
                onClick={() => changePage({ page: index + 1 })}
              >
                {index + 1}
              </li>
            ))}
          </ul>
          <li>
            <a
              className={arrowClass + ' rounded-e-xl ms-1'}
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
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
