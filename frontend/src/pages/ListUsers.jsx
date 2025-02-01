import { useContext } from 'react';

import ListUserstable from '../components/ListUserstable.jsx';
import ImageTitle from '../components/misc/ImageTitle';
import Unautorized from '../components/Unautorized.jsx';
import AuthContext from '../contexts/AuthContext';

export default function ListUsers() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <ImageTitle title="Felhasználok listázása" description="" />
      <div className=" min-h-screen flex flex-col items-center m-0">
        {user && user.role === 'admin' ? (
          <div className="mt-28">
            <h1 className="my-1 text-center text-2xl text-white">Felhasználók listája</h1>
            <ListUserstable />
          </div>
        ) : (
          <Unautorized text="Kérlek előbb jeletkezz be adminisztátorként!" />
        )}
      </div>
    </>
  );
}
