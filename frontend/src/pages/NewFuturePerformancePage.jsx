import ImageTitle from '../components/misc/ImageTitle.jsx';
import NewFuturePerformanceForm from '../components/NewFuturePerformanceForm.jsx';

export default function NewFuturePerformancePage() {
  return (
    <>
      <ImageTitle title="Előadás hozzáadása" description="Itt tudsz új előadást hozzáadni" />
      <div className="min-h-screen flex flex-col items-center">
        <NewFuturePerformanceForm />
      </div>
    </>
  );
}
