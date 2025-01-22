import Cart from '../components/Cart';
import ImageTitle from '../components/misc/ImageTitle';
import { useAuth } from '../contexts/AuthContext';

export default function CartPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="bg-theatron02-pattern bg-cover min-h-screen flex flex-col items-center">
        <ImageTitle title="Kosár" subtitle="Jelentkezz be a kosarad megtekintéséhez!" />
        <p className="text-white mt-5">A kosár megtekintéséhez be kell jelentkezni.</p>
      </div>
    );
  }

  return (
    <div className="bg-theatron02-pattern bg-cover min-h-screen flex flex-col items-center">
      <ImageTitle
        title="Kosár"
        description="Válaszd ki a jegyedet!"
      />
      <Cart />
    </div>
  );
}
