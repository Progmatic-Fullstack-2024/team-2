import { useContext } from 'react';

import AuthContext from '../contexts/AuthContext';

export default function SignedInPage() {
  const { user } = useContext(AuthContext);
  return (
    <div className="bg-theatron02-pattern bg-cover min-h-screen flex flex-col items-center">
      <p>{`SIKERES BEJELENTKEZÉS KEDVES ${user.firstName}`}</p>
    </div>
  );
}
