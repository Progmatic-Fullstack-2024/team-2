import { useContext, useState } from 'react';

import ImageTitle from '../components/misc/ImageTitle';
import Unautorized from '../components/Unautorized.jsx';
import ListUserstable from '../components/users/ListUserstable.jsx';
import UserMenu from '../components/users/UserMenu.jsx';
import AuthContext from '../contexts/AuthContext';

export default function ListUsers() {
  const { user } = useContext(AuthContext);
  const [filterParam, setFilterParam] = useState('');

  const menuHandler = (param) => {
    if (param === 'filter=all') param = '';
    setFilterParam(param);
  };
  return (
    <>
      <ImageTitle title="Felhasználok listázása" description="" />
      <div className="  flex flex-col items-center m-0 mx-1">
        {user && user.role === 'admin' ? (
          <div className="mt-28">
            <div className="w-3/4 mx-auto">
              <UserMenu func={menuHandler} />
            </div>
            <ListUserstable param={filterParam} />
          </div>
        ) : (
          <Unautorized text="Kérlek előbb jeletkezz be adminisztátorként!" />
        )}
      </div>
    </>
  );
}
