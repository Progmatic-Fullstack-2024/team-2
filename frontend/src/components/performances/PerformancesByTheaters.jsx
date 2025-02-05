import { useRef, useState, useEffect } from 'react';

import LandingPagePerformanceCard from './LandingPagePerformanceCard';
import DefaultButton from '../misc/DefaultButton';

export default function PerformancesByTheaters({ performances }) {
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

  if (!performances) return null;

  // Csoportosítás színházak szerint
  const performancesByTheater = performances.reduce((groups, perf) => {
    const theaterId = perf.theaterId || 'Ismeretlen színház';
    if (!groups[theaterId]) {
      groups[theaterId] = [];
    }
    groups[theaterId].push(perf);
    return groups;
  }, {});

  // Véletlenszerű színház kiválasztása
  const theaterIds = Object.keys(performancesByTheater);
  const randomTheaterId = theaterIds[Math.floor(Math.random() * theaterIds.length)];
  const theaterPerformances = performancesByTheater[randomTheaterId] || [];

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
    let widthClass;
    switch (cardsCount) {
      case 1:
        widthClass = 'w-full';
        break;
      case 2:
        widthClass = 'w-1/2';
        break;
      case 3:
        widthClass = 'w-1/3';
        break;
      default:
        widthClass = 'w-1/5';
    }
    return widthClass;
  };

  const containerRef = useRef(null);

  return (
    <div className="w-full my-12 space-y-12">
      <section className="relative mb-12">
        <h2 className="text-2xl font-bold mb-5 text-c-text">
          Random Színház ID:{' '}
          {randomTheaterId === 'Ismeretlen színház' ? randomTheaterId : `#${randomTheaterId}`}
        </h2>
        <div className="relative">
          <div className="flex items-center justify-between">
            <DefaultButton onClick={() => scroll('left', containerRef)} text="<" />
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
            <DefaultButton onClick={() => scroll('right', containerRef)} text=">" />
          </div>
        </div>
      </section>
    </div>
  );
}
