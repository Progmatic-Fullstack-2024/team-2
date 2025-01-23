import Spinner from '../misc/Spinner';

export default function PerformanceCardEmpty() {
  return (
    <div className="flex justify-center items-center w-80 h-100  h-96 text-white rounded-b-lg rounded-t-2xl bg-c-secondary ">
      <Spinner />
    </div>
  );
}
