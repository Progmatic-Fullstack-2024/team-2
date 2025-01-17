import Spinner from '../misc/Spinner';

export default function PerformanceCardEmpty() {
  return (
    <div className="flex justify-center items-center w-full min-w-72 h-96 text-white rounded-b-lg rounded-t-2xl bg-c-secondary tablet:max-w-96">
      <Spinner />
    </div>
  );
}
