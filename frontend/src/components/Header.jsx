import { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';
import DefaultButton from './misc/DefaultButton';
import MenuLink from './misc/MenuLink';
import SvgIcon from './misc/SvgIcon';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const [transparentHeader, setTransparentHeader] = useState(true);

  const navigate = useNavigate();

  const headerClass = `fixed top-0 left-0 w-full border-b bg-${transparentHeader ? 'transparent border-c-text/40' : 'c-background border-c-text/60'} transition-colors duration-200 text-white px-1 tablet:px-5 laptop:px-10 flex justify-between  z-50`;

  const isYPositionInLimit = () => {
    const screenYPos = window.scrollY;
    if (screenYPos <= 30) return true;
    return false;
  };

  const handleScroll = () => setTransparentHeader(isYPositionInLimit());

  useEffect(() => {
    window.scrollTo(0, 0);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    return navigate('/');
  };

  return (
    <header className={headerClass}>
      <div className="flex gap-4 px-3 py-2 text-xl font-bold">
        <Link to="/" className="min-w-[58]">
          <SvgIcon
            icon="masks"
            stroke="c-text"
            size="50px"
            fill="white"
            className="cursor-pointer hover:scale-110 transition-transform duration-100"
          />
        </Link>

        {user && (
          <div className="hover:text-white transform transition duration-700 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] cursor-default mx-5 my-auto">
            {`${user.firstName}`}
          </div>
        )}
      </div>
      <nav className="flex laptop:gap-4 items-center">
        <div className="flex justify-center h-full gap-1">
          <MenuLink text="Home" to="/" icon="star" iconSize="50" />
          <MenuLink text="Előadások" to="/performances" icon="camera" iconSize="50px" />
        </div>
        {user ? (
          <>
            {user.role === 'admin' && (
              <>
                <MenuLink text="Előadás létrehozás" to="/new-performance" />
                <MenuLink text="Theater Admin" to="/theater-admin" />
                <MenuLink text="felhasználók listázása" to="/userlist" />
              </>
            )}
            {user.role === 'theaterAdmin' && (
              <>
                <MenuLink text="Előadás létrehozás" to="/new-performance" />
                <MenuLink text="Theater Admin" to="/theater-admin" />
              </>
            )}
            <MenuLink text="Saját profil" to="/ownUser" icon="user" iconSize="50" />

            <DefaultButton
              text="Kijelentkezés"
              color="c-warning"
              buttonStyle="outline"
              height="11"
              onClick={handleLogout}
              icon="logout"
            />
          </>
        ) : (
          <DefaultButton
            text="Bejelentkezés"
            buttonStyle="outline"
            height="11"
            onClick={() => navigate('/login')}
            icon="login"
          />
        )}
      </nav>
    </header>
  );
}
