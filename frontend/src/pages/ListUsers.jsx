
import { useContext } from 'react';

import ListUserstable from '../components/ListUserstable.jsx';
import AuthContext from '../contexts/AuthContext';

export default function ListUsers() {
  const { user } = useContext(AuthContext);
  return (
    <div className="min-h-screen flex flex-col items-center">
      {user && user.role === 'Admin' ? (
        <div className="mt-28">
          <h1 className="my-1 text-center text-2xl">Felhasználók listája</h1>
          <ListUserstable />
        </div>
      ) : (
        <div className="m-60 ">
          <h1 className="p-12 bg-c-secondary-light rounded-md">
            Kérlek előbb jeletkezz be adminisztátorként !
          </h1>
        </div>
      )}
    </div>
  );
}
