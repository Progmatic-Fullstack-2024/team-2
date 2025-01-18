import { useContext } from 'react';

import ListUserstable from '../components/ListUserstable.jsx';
import Unautorized from '../components/Unautorized.jsx';
import AuthContext from '../contexts/AuthContext';

export default function ListUsers() {
  const { user } = useContext(AuthContext);
  return (
    <div className=" min-h-screen flex flex-col items-center m-0">
      {user && user.role === 'Admin' ? (
        <div className="mt-28">
          <h1 className="my-1 text-center text-2xl">Felhasználók listája</h1>
          <ListUserstable />
        </div>
      ) : (
        <Unautorized text="Kérlek előbb jeletkezz be adminisztátorként!" />
      )}
    </div>
  );
}
