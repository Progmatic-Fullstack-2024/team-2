import CreateCreatorForm from '../components/creators/CreateCreatorForm.jsx';
import ImageTitle from '../components/misc/ImageTitle.jsx';

export default function AddCreatorPage() {
  return (
    <>
      <ImageTitle
        title="Alkotó felvétele"
        description="Itt tudsz új alkotót felvenni az adatbázisba"
      />
      <div className="min-h-screen flex flex-col items-center">
        <CreateCreatorForm />
      </div>
    </>
  );
}
