import React, { useRef, useState, useEffect } from 'react';

import PerformanceCard02 from './PerformanceCard02';
import DefaultButton from '../misc/DefaultButton';

export default function PerformancesBrowse({ params }) {
  const [visibleCards, setVisibleCards] = useState(5); // Alapértelmezett: 5 kártya
  const [performances, setPerformances] = useState([]);
  const containerRef = useRef({});

  // Identify if date or array is in the params
  const isDateSearch = params.startDate !== undefined;
  const genres = params.genres || [];

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
    const defaultParams = {
      limit: 10
    };
  
    // add orderBy if date is in params 
    if (params.startDate || params.endDate) {
      defaultParams.orderBy = 'date';
    }
  
    const data = await performancesService.listAll({ 
      params: { ...defaultParams, ...params } 
    });
  
    setPerformances(data);
  };

  useEffect(() => {
    getPerformances();
  }, [params]);

  if (!performances) return null;

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

  return (
    <section className="relative mb-12">
      {isDateSearch ? (
        <h2 className="text-2xl font-bold mb-5 text-c-text">
          Boldog szülinapot! Nézd meg ma milyen előadások várnak:
        </h2>
      ) : (
        <h2 className="text-2xl font-bold mb-5 text-c-text">
          Műfaj: {genres.length > 0 ? genres.join(', ') : null}
        </h2>
      )}
      <div className="relative">
        <div className="flex items-center justify-between">
          <DefaultButton onClick={() => scroll('left', containerRef)} text="<" />
          <div ref={containerRef} className="flex overflow-hidden scroll-smooth w-full">
            {performances.map((perf) => (
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
  );
}
