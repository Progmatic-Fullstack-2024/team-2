import PerformanceCard from './PerformanceCard';

export default function PerformancesList({ performances }) {
  if (!performances) return null;
  return (
    <section className="w-screen tablet:w-full grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4  gap-0 my-12  mx-0 tablet:mx-5 tablet:gap-10">
      {performances.map((perf, index) => (
        <PerformanceCard data={perf} key={index} />
      ))}
    </section>
  );
}
