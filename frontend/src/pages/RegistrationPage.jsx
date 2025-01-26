import ImageTitle from '../components/misc/ImageTitle';
import RegistrationForm from '../components/RegistrationForm.jsx';

export default function RegistrationPage() {
  return (
    <>
      <ImageTitle title="Regisztráció" description="Itt tudsz regisztrálni" />
      <div className="min-h-screen flex flex-col items-center">
        <RegistrationForm />
      </div>
    </>
  );
}
