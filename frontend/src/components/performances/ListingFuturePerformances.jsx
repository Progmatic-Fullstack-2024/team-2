import { useRef, useState, useEffect } from 'react';

import LandingPagePerformanceCard from './LandingPagePerformanceCard';
import DefaultButton from '../misc/DefaultButton';

export default function ListingFuturePerformances({ performances }) {
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

  // Szűrés: Csak azok az előadások maradjanak meg, amelyek rendelkeznek `futurePerformance` adattal (NEM TÖMB, hanem objektum!)
  const futurePerformances = performances.filter((perf) => perf.futurePerformance !== null);

  useEffect(() => {
    // Ellenőrizzük, hogy kell-e nyilakat megjeleníteni
    setShouldShowArrows(futurePerformances.length > visibleCards);
  }, [futurePerformances, visibleCards]);

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

  if (futurePerformances.length === 0) {
    return <p className="text-center mt-5">Nincsenek tervezett előadások.</p>;
  }

  const containerRef = useRef(null);

  return (
    <div className="w-full my-12 px-auto">
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-5 text-c-text">Tervezett előadások</h2>
        <div className="relative">
          <div className="flex items-center justify-between">
            {/* Csak akkor jelenítjük meg a nyilakat, ha a feltételek teljesülnek */}
            {shouldShowArrows && (
              <DefaultButton onClick={() => scroll('left', containerRef)} text="<" />
            )}
            <div ref={containerRef} className="flex overflow-hidden scroll-smooth w-full">
              {futurePerformances.map((perf) => (
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
