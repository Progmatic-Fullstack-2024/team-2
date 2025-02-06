import { useRef, useState, useEffect } from 'react';

import PerformanceCard02 from './PerformanceCard02';
import DefaultButton from '../misc/DefaultButton';

export default function PerformancesNextWeek({ performances }) {
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

  // Get current date and calculate one week ahead
  const today = new Date();
  const oneWeekLater = new Date();
  oneWeekLater.setDate(today.getDate() + 7);

  // Filter and sort performances within the next week
  const upcomingPerformances = performances
    .filter((perf) => {
      if (!perf.performanceEvents?.length) return false; // Ha nincs előadás, kiszűrjük
      const performanceDate = new Date(perf.performanceEvents[0].performanceDate);
      return performanceDate >= today && performanceDate <= oneWeekLater;
    })
    .sort(
      (a, b) =>
        new Date(a.performanceEvents[0].performanceDate) -
        new Date(b.performanceEvents[0].performanceDate),
    ); // Sort by date

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

  if (upcomingPerformances.length === 0) {
    return <p className="text-center mt-5">Nincsenek közelgő előadások.</p>;
  }

  const containerRef = useRef(null);

  return (
    <div className="w-full my-12 px-auto">
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-5 text-c-text">Előadások a következő hét napban:</h2>
        <div className="relative">
          <div className="flex items-center justify-between">
            <DefaultButton onClick={() => scroll('left', containerRef)} text="<" />
            <div ref={containerRef} className="flex overflow-hidden scroll-smooth w-full">
              {upcomingPerformances.map((perf) => (
                <div
                  key={perf.id}
                  className={`flex-shrink-0 transition-transform duration-700 hover:z-10 ${getWidthClass(
                    visibleCards,
                  )}`}
                >
                  <PerformanceCard02 data={perf} />
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
