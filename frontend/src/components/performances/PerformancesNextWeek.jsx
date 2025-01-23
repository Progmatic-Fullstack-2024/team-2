import PerformanceCard02 from './PerformanceCard02';

export default function PerformancesNextWeek({ performances }) {
  if (!performances) return null;

  // Get current date and calculate one week ahead
  const today = new Date();
  const oneWeekLater = new Date();
  oneWeekLater.setDate(today.getDate() + 7);

  // Filter performances within the next week
  const upcomingPerformances = performances.filter((perf) => {
    const performanceDate = new Date(perf.performanceDate[0]); // Assuming `performanceDate` is a valid date string
    return performanceDate >= today && performanceDate <= oneWeekLater;
  });

  // Render the filtered list
  if (upcomingPerformances.length === 0) {
    return <p className="text-center mt-5">Nincsenek közelgő előadások.</p>;
  }

  return (
    <div className="w-full my-12 px-auto">
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-5">Előadások a következő hét napban:</h2>
        <div className="grid grid-cols-1 tablet:grid-cols-3 laptop:grid-cols-5">
          {upcomingPerformances.map((perf) => (
            <PerformanceCard02 data={perf} key={perf.id} />
          ))}
        </div>
      </section>
    </div>
  );
}
