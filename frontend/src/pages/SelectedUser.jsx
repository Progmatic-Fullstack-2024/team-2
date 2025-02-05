import { useContext } from 'react';

import ImageTitle from '../components/misc/ImageTitle';
import Unautorized from '../components/Unautorized.jsx';
import SelectedUserForm from '../components/users/SelectedUserForm.jsx';
import AuthContext from '../contexts/AuthContext';

export default function selectedUser() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <ImageTitle title="Kért felhasználó kezelése" description="" />
      <div className=" min-h-screen flex flex-col items-center m-0">
        {user && user.role === 'admin' ? (
          <div className="mt-28">
            <SelectedUserForm />
          </div>
        ) : (
          <Unautorized text="Kérlek előbb jeletkezz be adminisztátorként!" />
        )}
      </div>
    </>
  );
}
