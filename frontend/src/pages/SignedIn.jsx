import { useContext } from 'react';

import AuthContext from '../contexts/AuthContext';

export default function SignedInPage() {
  const { user } = useContext(AuthContext);
  return (
    <div className="bg-theatron02-pattern bg-cover min-h-screen flex flex-col items-center justify-center">
      <p className="text-white text-6xl drop-shadow-[0_0_5px_rgba(255,255,255,0.8)] transform transition duration-700 hover:scale-110">{`SIKERES BEJELENTKEZÉS KEDVES ${user.firstName}`}</p>
    </div>
  );
}
