import { useRef, useState, useEffect } from 'react';

import LandingPagePerformanceCard from './LandingPagePerformanceCard';
import DefaultButton from '../misc/DefaultButton';

export default function PerformancesByTheaters({ performances }) {
  const [visibleCards, setVisibleCards] = useState(5); // Alapértelmezett: 5 kártya
  const [shouldShowArrows, setShouldShowArrows] = useState(false);

  useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth;
      let newVisibleCards = 5;

      if (width < 640) {
        newVisibleCards = 1;
      } else if (width < 1024) {
        newVisibleCards = 2;
      } else if (width < 1280) {
        newVisibleCards = 3;
      }

      setVisibleCards(newVisibleCards);
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  if (!performances) return null;

  // Csoportosítás színházak szerint
  const performancesByTheater = performances.reduce((groups, perf) => {
    const theaterName = perf.theater?.name || 'Ismeretlen színház'; // Színház neve
    if (!groups[theaterName]) {
      groups[theaterName] = [];
    }
    groups[theaterName].push(perf);
    return groups;
  }, {});

  // Véletlenszerű színház kiválasztása
  const theaterNames = Object.keys(performancesByTheater);
  const randomTheaterName = theaterNames[Math.floor(Math.random() * theaterNames.length)];
  const theaterPerformances = performancesByTheater[randomTheaterName] || [];

  useEffect(() => {
    // Ellenőrizzük, hogy kell-e nyilakat megjeleníteni
    setShouldShowArrows(theaterPerformances.length > visibleCards);
  }, [theaterPerformances, visibleCards]);

  const scroll = (direction, containerRef) => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.offsetWidth / visibleCards;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const getWidthClass = (cardsCount) => {
    switch (cardsCount) {
      case 1:
        return 'w-full';
      case 2:
        return 'w-1/2';
      case 3:
        return 'w-1/3';
      default:
        return 'w-1/5';
    }
  };

  const containerRef = useRef(null);

  return (
    <div className="w-full my-12 space-y-12">
      <section className="relative mb-12">
        <h2 className="text-2xl font-bold mb-5 text-c-text"> {randomTheaterName}</h2>
        <div className="relative">
          <div className="flex items-center justify-between">
            {/* Csak akkor jelenítjük meg a nyilakat, ha szükséges */}
            {shouldShowArrows && (
              <DefaultButton onClick={() => scroll('left', containerRef)} text="<" />
            )}
            <div ref={containerRef} className="flex overflow-hidden scroll-smooth w-full">
              {theaterPerformances.map((perf) => (
                <div
                  key={perf.id}
                  className={`flex-shrink-0 transition-transform duration-700 hover:z-10 ${getWidthClass(
                    visibleCards,
                  )}`}
                >
                  <LandingPagePerformanceCard data={perf} />
                </div>
              ))}
            </div>
            {shouldShowArrows && (
              <DefaultButton onClick={() => scroll('right', containerRef)} text=">" />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
