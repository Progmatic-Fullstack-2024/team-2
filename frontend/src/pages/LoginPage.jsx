import LoginForm from '../components/LoginForm';
import ImageTitle from '../components/misc/ImageTitle';

export default function LoginPage() {
  return (
    <>
      <ImageTitle title="Bejelentkezés" description="Itt tudsz bejelentkezni" />
      <div className="min-h-screen flex items-center justify-evenly gap-30">
        <LoginForm />
      </div>
    </>
  );
}
