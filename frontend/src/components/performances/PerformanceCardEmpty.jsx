import Spinner from '../misc/Spinner';

export default function PerformanceCardEmpty() {
  return (
    <div className="flex justify-center items-center min-w-72 tablet:max-w-96  h-96 text-white rounded-b-lg rounded-t-2xl bg-c-secondary ">
      <Spinner />
    </div>
  );
}
