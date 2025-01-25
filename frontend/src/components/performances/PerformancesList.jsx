import PerformanceCard from './PerformanceCard';

export default function PerformancesList({ performances }) {
  if (!performances) return null;
  return (
    <section className="w-full tablet:w-fit grid grid-cols-1 tablet:grid-cols-1 laptop:grid-cols-2 desktop:grid-cols-3 py-10 gap-10 tablet:gap-10 border-y-2 border-gray-700">
      {performances.map((perf) => (perf ? <PerformanceCard data={perf} key={perf.id} /> : null))}
    </section>
  );
}
