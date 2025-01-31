import React, { useRef, useState, useEffect } from 'react';

import PerformanceCard02 from './PerformanceCard02';
import DefaultButton from '../misc/DefaultButton';

export default function PerformancesByGenres({ performances }) {
  const [visibleCards, setVisibleCards] = useState(5); // Alapértelmezett: 5 kártya
  const containerRef = useRef({});

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
  const performancesByGenre = performances.reduce((groups, perf) => {
    // const genre = perf.genre?.[0]?.name || 'Ismeretlen műfaj'; // Műfaj neve
    // const genreNames  = perf.genre?.map(g => g.name).join(', ') || 'Ismeretlen műfaj';

    const genreNames = Array.isArray(perf.genre) 
    ? perf.genre.map(g => g.name) 
    : ['Ismeretlen műfaj'];

    genreNames.forEach((genre) => {
      if (!groups[genre]) {
        groups[genre] = [];
      }
      groups[genre].push(perf);
    });
  
    return groups;
  }, {});
  
  // Szétválasztjuk a műfajokat a darabszámuk alapján
  const genreEntries = Object.entries(performancesByGenre);
  const mainGenres = {};
  const otherGenres = [];
  
  genreEntries.forEach(([genre, genrePerformances]) => {
    if (genrePerformances.length >= 3) {
      mainGenres[genre] = genrePerformances;
    } else {
      otherGenres.push(...genrePerformances);
    }
  });
  
  // Ha vannak "egyéb műfajok", hozzáadjuk egy kategóriaként
  if (otherGenres.length > 0) {
    mainGenres['Egyéb műfajok'] = otherGenres;
  }

  //   if (!groups[genre]) {
  //     groups[genre] = [];
  //   }
  //   groups[genre].push(perf);
  //   return groups;
  // }, {});

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
    <div className="w-full my-12 space-y-12">
      {Object.entries(mainGenres).map(([genre, genrePerformances]) => {
        if (!containerRef.current[genre]) {
          containerRef.current[genre] = React.createRef();
        }

        return (
          <section key={genre} className="relative mb-12">
            <h2 className="text-2xl font-bold mb-5 text-c-text">Műfaj: {genre}</h2>
            <div className="relative">
              <div className="flex items-center justify-between">
                <DefaultButton onClick={() => scroll('left', containerRef)} text="<" />
                <div ref={containerRef} className="flex overflow-hidden scroll-smooth w-full">
                  {genrePerformances.map((perf) => (
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
      })}
    </div>
  );
}
