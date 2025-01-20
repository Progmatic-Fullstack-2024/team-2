import PerformanceCard from './PerformanceCard';

export default function PerformancesList({ performances }) {
  if (!performances) return null;
  return (
    <section className="w-screen tablet:w-full grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 py-10 px-auto tablet:gap-10 border-y-2 border-gray/70">
      {performances.map((perf) => (perf ? <PerformanceCard data={perf} key={perf.id} /> : null))}
    </section>
  );
}
