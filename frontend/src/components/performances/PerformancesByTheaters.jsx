import PerformanceCard from './PerformanceCard';

export default function PerformancesByTheaters({ performances }) {
  if (!performances) return null;

  // Group performances by theaterId
  const performancesByTheater = performances.reduce((groups, perf) => {
    const theaterId = perf.theaterId || 'Ismeretlen színház'; // Default to "Ismeretlen színház" if theaterId is not defined
    if (!groups[theaterId]) {
      groups[theaterId] = [];
    }
    groups[theaterId].push(perf);
    return groups;
  }, {});

  return (
    <div className="w-full my-12 px-auto">
      {Object.entries(performancesByTheater).map(
        (
          [theaterId, theaterPerformances], // Change 'performances' to 'theaterPerformances'
        ) => (
          <section key={theaterId} className="mb-12">
            <h2 className="text-2xl font-bold mb-5">
              Színház ID: {theaterId === 'Ismeretlen színház' ? theaterId : `#${theaterId}`}
            </h2>
            <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-10">
              {theaterPerformances.map((perf) => (
                <PerformanceCard data={perf} key={perf.id} />
              ))}
            </div>
          </section>
        ),
      )}
    </div>
  );
}
