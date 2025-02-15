import AskNewPassfordForm from '../components/AskNewPasswordForm.jsx';
import ImageTitle from '../components/misc/ImageTitle.jsx';

export default function AskNewPasswordPage() {
  return (
    <>
      <ImageTitle title="Új jelszó kérése" description="Az új jelszót E-mail-ben kapod meg." />
      <div className="min-h-screen flex flex-col items-center">
        <AskNewPassfordForm />
      </div>
    </>
  );
}
