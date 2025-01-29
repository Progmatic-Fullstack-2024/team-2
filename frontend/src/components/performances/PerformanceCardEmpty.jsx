import Spinner from '../misc/Spinner';

export default function PerformanceCardEmpty() {
  return (
    <div className="flex justify-center items-center h-80 tablet:w-64  text-white bg-c-secondary ">
      <Spinner />
    </div>
  );
}
