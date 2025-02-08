import PerformanceCardForTheaterAdmin from './PerformanceCardForTheaterAdmin';

export default function PerformancesList({ performances }) {
  if (!performances) return null;
  return (
    <section className="w-full tablet:w-fit grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 py-10 gap-10 tablet:gap-10 border-y-2 border-gray-700">
      {performances.map((perf) =>
        perf ? <PerformanceCardForTheaterAdmin data={perf} key={perf.id} /> : null,
      )}
    </section>
  );
}
