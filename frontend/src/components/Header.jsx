import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';
import DefaultButton from './misc/DefaultButton';
import MenuLink from './misc/MenuLink';

const noTransparencyHeader = ['/login', '/register', '/new-performance'];

export default function Header() {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const [transparentHeader, setTransparentHeader] = useState(true);

  const navigate = useNavigate();

  const headerClass = `fixed top-0 left-0 w-full border-b bg-${transparentHeader ? 'transparent border-c-text/40' : 'c-primary border-c-text'} transition-colors duration-200 text-white px-10 flex justify-between  z-50`;

  const isYPositionInLimit = () => {
    const screenYPos = window.scrollY;
    if (screenYPos <= 30) return true;
    return false;
  };

  const handleScroll = () => setTransparentHeader(isYPositionInLimit());

  useEffect(() => {
    window.scrollTo(0, 0);
    if (noTransparencyHeader.includes(location.pathname)) {
      setTransparentHeader(false);
    } else {
      setTransparentHeader(true);

      window.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location]);

  const handleLogout = () => {
    logout();
    return navigate('/');
  };

  return (
    <header className={headerClass}>
      <div className="flex gap-4 px-3 py-2 text-xl font-bold">
        <img src="../../public/theater-masks.svg" alt="logo" />

        {user && (
          <div className="hover:text-white transform transition duration-700 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] cursor-default mx-5 my-auto">
            {`${user.firstName}`}
          </div>
        )}
      </div>
      <nav className="flex gap-4 items-center">
        <div className="flex justify-center h-full gap-1">
          <MenuLink text="Előadások" to="/performances" />
          <MenuLink text="Home" to="/" />
        </div>
        {user ? (
          <>
            {user.role === 'Admin' && <MenuLink text="Előadás létrehozás" to="/new-performance" />}
            <MenuLink text="Saját profil" to="/ownUser" />
            <DefaultButton text="Kijelentkezés" onClick={handleLogout} />
          </>
        ) : (
          <DefaultButton text="Bejelentkezés" onClick={() => navigate('/login')} />
        )}
      </nav>
    </header>
  );
}
