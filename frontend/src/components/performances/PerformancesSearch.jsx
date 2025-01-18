import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function PerformancesSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current.value = searchParams.get('title');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = {};
    if (e.target.inputSearchTitle.value) params.title = e.target.inputSearchTitle.value;
    setSearchParams(params);
  };

  return (
    <div className="h-full min-h-32 w-full m-5 border-b-2 border-gray/70">
      <form id="inputForm" className="w-fit min-w-96 mx-auto" onSubmit={handleSubmit}>
        <div className="relative flex items-center p-1 ">
          <div className="absolute inset-y-0 start-2 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            name="inputSearchTitle"
            className="outline-none block w-full h-9  ps-12 text-sm text-gray-900 border border-gray-400 rounded-s-xl outline:0 focus:ring-2 ring-c-primary  "
            placeholder="Előadás keresése..."
            ref={titleRef}
          />
          <button
            type="submit"
            className="py-2 px-5 bg-c-primary hover:bg-c-primary-light active:bg-c-primary-dark rounded-e-xl text-white font-semibold "
          >
            Keresés
          </button>
        </div>
      </form>
    </div>
  );
}
