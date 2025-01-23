import ImageTitle from '../components/misc/ImageTitle.jsx';
import NewPerformanceForm from '../components/NewPerformanceForm.jsx';

export default function NewPerformancePage() {
  return (
    <>
      <ImageTitle title="Előadás hozzáadása" description="Itt tudsz új előadást hozzáadni" />
      <div className="min-h-screen flex flex-col items-center">
        <NewPerformanceForm />
      </div>
    </>
  );
}
