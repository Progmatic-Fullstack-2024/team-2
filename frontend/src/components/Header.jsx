import { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, MenuItem } from '@mui/material';
import { FiMenu } from 'react-icons/fi';

import AuthContext from '../contexts/AuthContext';
import DefaultButton from './misc/DefaultButton';
import MenuLink from './misc/MenuLink';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const [transparentHeader, setTransparentHeader] = useState(true);
  const [adminMenuAnchor, setAdminMenuAnchor] = useState(null);

  const navigate = useNavigate();

  const headerClass = `fixed top-0 left-0 w-full border-b bg-${transparentHeader ? 'transparent border-c-text/40' : 'c-background border-c-text/60'} transition-colors duration-200 text-white px-10 flex flex-col items-center z-50`;

  const isYPositionInLimit = () => {
    const screenYPos = window.scrollY;
    return screenYPos <= 30;
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
    navigate('/');
  };

  const handleAdminMenuOpen = (event) => setAdminMenuAnchor(event.currentTarget);
  const handleAdminMenuClose = () => setAdminMenuAnchor(null);

  return (
    <header className={headerClass}>
      <div className="flex w-full justify-between items-center py-2">
        <div className="flex items-center gap-4">
          <Link to="/">
            <img
              src="../../public/theater-masks.svg"
              alt="logo"
              className="cursor-pointer hover:scale-110 transition-transform duration-300"
            />
          </Link>

          {user && (
            <Link to="/ownUser" className="hover:text-white transform transition duration-700 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] cursor-pointer mx-5 my-auto">
              {`${user.firstName}`}
            </Link>
          )}
        </div>

        <nav className="flex gap-4 items-center">
          <MenuLink text="Home" to="/" />
          <MenuLink text="Előadások" to="/performances" />

          {user ? (
            <>
              <MenuLink text="Saját profil" to="/ownUser" />
              <DefaultButton text="Kijelentkezés" onClick={handleLogout} />
            </>
          ) : (
            <>
            <DefaultButton text="Bejelentkezés" onClick={() => navigate('/login')} />
            <DefaultButton text="Regisztráció" onClick={() => navigate('/register')} />
            </>
          )}
        </nav>
      </div>

      {user?.role === 'Admin' && (
        <>
          <hr className="w-full border-t border-c-text/40 my-2" />
          <nav className="flex gap-4 items-center w-full justify-center py-2">
            <div className="relativ flex items-center gap-2 ">
              <FiMenu
                className="absolute left-20 text-2xl cursor-pointer"
                onClick={handleAdminMenuOpen}
              />
              <button
                className="text-white font-bold hover:underline"
                onClick={handleAdminMenuOpen}
              ></button>
            </div>
            <Menu
              anchorEl={adminMenuAnchor}
              open={Boolean(adminMenuAnchor)}
              onClose={handleAdminMenuClose}
              disableScrollLock
              PaperProps={{
                sx: {
                  maxHeight: '200px',   // vagy amekkora tetszik
                  overflowY: 'auto',    // legyen függőleges scroll
                },
              }}
            >
              <MenuItem onClick={() => navigate('/new-performance')}>Előadás létrehozás</MenuItem>
              <MenuItem onClick={() => navigate('/admin/dashboard')}>Admin Dashboard</MenuItem>
              <MenuItem onClick={() => navigate('/user-management')}>Felhasználók kezelése</MenuItem>
              <MenuItem onClick={() => navigate('/theater-management')}>Színházak kezelése</MenuItem>
              <MenuItem onClick={() => navigate('/pay-management')}>Fizetési ügyek</MenuItem>
              <MenuItem onClick={() => navigate('/other-management')}>Egyéb</MenuItem>
            </Menu>
            <MenuLink text="Előadás létrehozás" to="/new-performance" />
            <MenuLink text="Admin Dashboard" to="/admin/dashboard" />
            <MenuLink text="Felhasználók kezelése" to="/user-management" />
            <MenuLink text="Színházak kezelése" to="/theater-management" />
            <MenuLink text="Fizetési ügyek" to="/pay-management" />
            <MenuLink text="Egyéb" to="/other-management" />
          </nav>
        </>
      )}
    </header>
  );
}
