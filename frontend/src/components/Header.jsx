import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';
import DefaultButton from './misc/DefaultButton';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-c-primary  text-white py-4 px-24 flex justify-between">
      <div className="flex gap-4 px-3 py-2 text-xl font-bold">
        <img src="../../public/theater-masks.svg" />

        {user && (
          <div className="hover:text-white transform transition duration-700 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] cursor-default">{`${user.firstName}`}</div>
        )}
      </div>
      <nav className="flex gap-4 items-center">
        {user ? (
          <DefaultButton text="Kijelentkezés" onClick={handleLogout} />
        ) : (
          <DefaultButton text="Bejelentkezés" onClick={() => navigate('/login')} />
        )}
      </nav>
    </header>
  );
}
