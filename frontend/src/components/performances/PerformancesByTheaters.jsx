import { useRef } from 'react';

import PerformanceCard from './PerformanceCard';
import DefaultButton from '../misc/DefaultButton';

export default function PerformancesByTheaters({ performances }) {
  if (!performances) return null;

  // Group performances by theaterId
  const performancesByTheater = performances.reduce((groups, perf) => {
    const theaterId = perf.theaterId || 'Ismeretlen színház';
    if (!groups[theaterId]) {
      groups[theaterId] = [];
    }
    groups[theaterId].push(perf);
    return groups;
  }, {});

  // Scroll handler for filmstrip
  const scroll = (direction, containerRef) => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.offsetWidth / 4; // Scroll by one card width
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-full my-12 px-auto space-y-12">
      {Object.entries(performancesByTheater).map(([theaterId, theaterPerformances]) => {
        const containerRef = useRef(null); // Ref for horizontal scroll container

        return (
          <section key={theaterId} className="relative mb-12">
            <h2 className="text-2xl font-bold mb-5">
              Színház ID: {theaterId === 'Ismeretlen színház' ? theaterId : `#${theaterId}`}
            </h2>
            <div className="relative">
              <div className="flex items-center justify-between">
                {/* Left Scroll Button */}
                <DefaultButton
                  className="bg-black/50 text-white px-3 py-2 rounded-full z-10"
                  onClick={() => scroll('left', containerRef)}
                  text="<"
                />

                {/* Scrollable Filmstrip */}
                <div
                  ref={containerRef}
                  className="flex overflow-hidden scroll-smooth w-full relative"
                >
                  {theaterPerformances.map((perf) => (
                    <div
                      key={perf.id}
                      className="flex-shrink-0 w-1/5 scale-75 transform transition-transform duration-500 hover:scale-95 hover:z-10 relative"
                    >
                      <PerformanceCard data={perf} />
                    </div>
                  ))}
                </div>

                {/* Right Scroll Button */}
                <DefaultButton
                  className="bg-black/50 text-white px-3 py-2 rounded-full z-10"
                  onClick={() => scroll('right', containerRef)}
                  text=">"
                />
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
