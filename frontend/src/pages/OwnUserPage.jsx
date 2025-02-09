import { useContext } from 'react';

import ImageTitle from '../components/misc/ImageTitle';
import Unautorized from '../components/Unautorized.jsx';
import OwnUserBlock from '../components/users/OwnUserBlock.jsx';
import AuthContext from '../contexts/AuthContext';

export default function OwnUser() {
  const { user } = useContext(AuthContext);

  let logined = false;
  if (user && user !== null) logined = true;

  return (
    <>
      <ImageTitle title="Saját profil kezelése" description="Itt csak a saját profilod éred el." />
      <div className="min-h-screen flex flex-col items-center">
        {logined ? (
          <div className=" w-2/3">
            <OwnUserBlock />
          </div>
        ) : (
          <Unautorized text="Kérlek előbb jelentkezz be!" />
        )}
      </div>
    </>
  );
}
