import Spinner from '../misc/Spinner';

export default function PerformanceCardEmpty({ hidden = false }) {
  return (
    <div
      className={`flex justify-center items-center tablet:w-64  text-white bg-c-secondary ${(hidden && 'opacity-0 h-0') || 'h-80'}`}
    >
      <Spinner />
    </div>
  );
}
