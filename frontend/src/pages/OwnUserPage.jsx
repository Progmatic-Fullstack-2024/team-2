import { useContext } from 'react';

import ImageTitle from '../components/misc/ImageTitle';
import OwnUserEdit from '../components/OwnUserEdit.jsx';
import Unautorized from '../components/Unautorized.jsx';
import AuthContext from '../contexts/AuthContext';

export default function OwnUser() {
  const { user } = useContext(AuthContext);

  let logined = false;
  if (user && user !== null) logined = true;

  return (
    <>
      <ImageTitle title="saját profil kezelése" description="itt csak a saját profilod érde el." />
      <div className="min-h-screen flex flex-col items-center">
        {logined ? (
          <div className=" w-2/3">
            <OwnUserEdit />
          </div>
        ) : (
          <Unautorized text="Kérlek előbb jelentkezz be!" />
        )}
      </div>
    </>
  );
}
