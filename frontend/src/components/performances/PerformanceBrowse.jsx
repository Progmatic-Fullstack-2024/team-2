import React, { useRef, useState, useEffect, useCallback } from 'react';

import PerformanceCard02 from './LandingPagePerformanceCard';
import performancesService from '../../services/performances.service';
import DefaultButton from '../misc/DefaultButton';

export default function PerformancesBrowse({ params, title }) {
  const [performances, setPerformances] = useState([]);
  const [visibleCards, setVisibleCards] = useState(5); // Default: 5 PerformanceCards
  const containerRef = useRef(null);

  // Identify if genre is in the params
  const genres = params.genre || [];

  // Update the number of visible cards based on the window width
  const updateVisibleCards = useCallback(() => {
    const width = window.innerWidth;
    if (width < 640) {
      setVisibleCards(1);
    } else if (width < 1024) {
      setVisibleCards(2);
    } else if (width < 1280) {
      setVisibleCards(3);
    } else {
      setVisibleCards(5);
    }
  }, []);

  // Fetch performances data
  const getPerformances = useCallback(async () => {
    let allPerformances = [];
    try {
      if (genres.length > 0) {
        // If genre is in the params search by genre
        const results = await Promise.all(
          genres.map((genre) =>
            performancesService.list(new URLSearchParams({ ...params, genre })),
          ),
        );
        allPerformances = results.flatMap((result) => result.data);
      } else {
        const data = await performancesService.list(new URLSearchParams(params));
        allPerformances = data.data;
      }
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
    setPerformances(allPerformances);
  }, [params, genres]);

  useEffect(() => {
    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, [updateVisibleCards]);

  useEffect(() => {
    getPerformances();
  }, [getPerformances]);

  if ((performances.length === 0 && params.startDate) || (performances.length < 3 && !params.startDate)) return null;

  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.offsetWidth / visibleCards;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-full my-12 space-y-12">
      <section className="relative mb-12">
        <h2 className="text-2xl font-bold mb-5 text-c-text">{title}</h2>
        <div className="relative">
          <div className="flex items-center justify-between">
            {performances.length > visibleCards && (
              <div className="absolute z-20 left-9">
                <DefaultButton onClick={() => scroll('left')} text="<" />
              </div>
            )}
            <div
              ref={containerRef}
              className="flex overflow-hidden scroll-smooth w-full z-10 max-w-screen-desktop"
            >
              {performances.map((perf) => (
                <div
                  key={perf.id} // Add a unique key for each element
                  className="w-full tablet:w-1/2 laptop:w-1/3 desktop:w-1/5 flex-shrink-0 transition-transform duration-700 hover:z-10 hover:scale-95"
                >
                  <PerformanceCard02 data={perf} />
                </div>
              ))}
            </div>
            {performances.length > visibleCards && (
              <div className="absolute z-20 right-1">
                <DefaultButton onClick={() => scroll('right')} text=">" />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
