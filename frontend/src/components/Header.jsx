import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-600 bg-opacity-15 text-white py-4 px-24 flex justify-between">
      <div className="flex gap-4 px-3 py-2 text-xl font-bold">
        {/* <div className="text-yellow-500 drop-shadow-[0_0_10px_rgba(255,223,0,0.8)] hover:text-yellow-500 transform transition duration-700 hover:scale-110">
          Kedvelések:
          <div className="flex justify-center items-center text-2xl text-yellow-500 font-bold drop-shadow-[0_0_10px_rgba(255,223,0,0.8)]">
            {`${user.totalLikes}`}
          </div>
        </div> */}

        <h1 className="cursor-default">THEATRON_001</h1>
        {user && (
          <div className="hover:text-white transform transition duration-700 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] cursor-default">{`${user.firstName}!`}</div>
        )}
      </div>
      <nav className="flex gap-4 items-center">
        {user ? (
          <>
            <button
              className="rounded-md px-3 py-2 hover:bg-red-800 transform transition duration-300 hover:scale-110"
              onClick={handleLogout}
            >
              Kijelentkezés
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="rounded-md px-3 py-2 hover:bg-green-800 transform transition duration-300 hover:scale-110"
          >
            Bejelentkezés
          </Link>
        )}
      </nav>
    </header>
  );
}
