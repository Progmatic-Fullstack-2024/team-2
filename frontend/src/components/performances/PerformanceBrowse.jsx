import React, { useRef, useState, useEffect } from 'react';

import PerformanceCard02 from './PerformanceCard02';
import performancesService from '../../services/performances.service';
import DefaultButton from '../misc/DefaultButton';

export default function PerformancesBrowse({ params, title }) {
  const [performances, setPerformances] = useState([]);

  const containerRef = useRef({});

  // Identify if date or array is in the params
  const isDateSearch = params.startDate !== undefined;
  const genre = params.genre || [];
  const theater = params.theater;

  const [visibleCards, setVisibleCards] = useState(5); // Alapértelmezett: 5 kártya

  useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCards(1); // Kis képernyő: 1 kártya
      } else if (width < 1024) {
        setVisibleCards(2); // Közepes képernyő: 2 kártya
      } else if (width < 1280) {
        setVisibleCards(3); // Nagyobb képernyő: 3 kártya
      } else {
        setVisibleCards(5); // Nagy képernyő: 5 kártya
      }
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);


  const getPerformances = async () => {
    let allPerformances = [];
  console.log(params);
    try {
      if (genre.length > 0) {
        // Ha genre van a params-ban, akkor műfaj szerint keresünk
        const results = await Promise.all(
          genre.map((g) =>
            performancesService.list(new URLSearchParams({ ...params, genre: genre }))
          )
        );
        allPerformances = results.flatMap((result) => result.data);
      } else if (theater) {
        // Ha theater id van a params-ban, akkor színház szerint keresünk
        const data = await performancesService.list(
          new URLSearchParams({ ...params, theater: theater })
        );
        allPerformances = data.data;
      }
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  
    setPerformances(allPerformances);
  };
  

  useEffect(() => {
    getPerformances();
  }, []);

  // if (performances.length < 3) return null;

  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.offsetWidth / visibleCards;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  console.log("params in performancebrowse: ", params);
  return (
    <section className="relative mb-12">
      
        <h2 className="text-2xl font-bold mb-5 text-c-text">{title}</h2>
    
      <div className="relative">
        <div className="flex items-center justify-between">
          {performances.length <= 5 ? null :<DefaultButton onClick={() => scroll('left', containerRef)} text="<" />}
          <div
            ref={containerRef}
            className="flex overflow-hidden scroll-smooth w-full max-w-screen-desktop"
            // className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-5 gap-4"
          >
            {performances.map((perf) => (
              <div
                className="w-full tablet:w-1/2 laptop:w-1/3 desktop:w-1/5 flex-shrink-0 transition-transform duration-700 hover:z-10 hover:scale-95"
                // key={perf.id}
                // className={`flex-shrink-0 transition-transform duration-700 hover:z-10 ${getWidthClass(
                //   visibleCards,
                // )}`}
              >
                <PerformanceCard02 key={perf.id} data={perf} />
              </div>
            ))}
          </div>
          {performances.length <= 5 ? null :<DefaultButton onClick={() => scroll('right', containerRef)} text=">" />}
        </div>
      </div>
    </section>
  );
}
