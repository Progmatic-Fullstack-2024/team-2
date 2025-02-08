import PerformanceCard from './PerformanceCard';
import PerformanceCardEmpty from './PerformanceCardEmpty';

export default function PerformancesList({ performances }) {
  return (
    <section className="w-full tablet:w-fit grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 py-10 gap-10 tablet:gap-10 border-y-2 border-gray-700">
      {performances.length > 0 || (
        <span className="ms-4 text-white font-semibold text-xl italic">Nincs találat!</span>
      )}
      {performances.length > 0
        ? performances.map((perf) => (perf ? <PerformanceCard data={perf} key={perf.id} /> : null))
        : [...Array(4)].map((v, index) => <PerformanceCardEmpty keey={index} hidden={true} />)}
    </section>
  );
}
