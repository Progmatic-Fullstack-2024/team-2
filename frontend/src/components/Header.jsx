import { Menu, MenuItem } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';
import DefaultButton from './misc/DefaultButton';
import MenuLink from './misc/MenuLink';
import SvgIcon from './misc/SvgIcon';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const [transparentHeader, setTransparentHeader] = useState(true);
  const [adminMenuAnchor, setAdminMenuAnchor] = useState(null);

  const navigate = useNavigate();

  const headerClass = `fixed top-0 left-0 w-full border-b bg-${
    transparentHeader ? 'transparent border-c-text/40' : 'c-background border-c-text/60'
  } transition-colors duration-200 text-white px-1 tablet:px-5 laptop:px-10 flex flex-col z-50`;

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
      <div className="flex w-full justify-between items-center">
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
            <Link
              to="/ownUser"
              className="hover:text-white transform transition duration-700 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] cursor-default mx-5 my-auto "
            >
              {`${user.firstName}`}
            </Link>
          )}
        </div>

        <nav className="flex laptop:gap-4 items-center">
          <div className="flex justify-center h-full gap-1">
            <MenuLink text="Home" to="/" icon="star" iconSize="50" />
            <MenuLink text="Előadások" to="/performances" icon="camera" iconSize="50px" />
          </div>

          {user ? (
            <>
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
      </div>

      {user?.role === 'Admin' && (
        <>
          <hr className="w-full border-t border-c-text/40 my-2" />
          <nav className="flex gap-4 items-center w-full justify-center py-2">
            <div className="laptop:hidden relative flex items-center gap-2">
              <FiMenu
                className="absolute -left-48 text-2xl cursor-pointer"
                onClick={handleAdminMenuOpen}
              />
              <button
                type="button"
                className="text-white font-bold hover:underline"
                onClick={handleAdminMenuOpen}
                aria-label="Admin menü megnyitása"
              />
            </div>
            <Menu
              anchorEl={adminMenuAnchor}
              open={Boolean(adminMenuAnchor)}
              onClose={handleAdminMenuClose}
              disableScrollLock
              PaperProps={{
                sx: {
                  maxHeight: '200px',
                  overflowY: 'auto',
                },
              }}
            >
              <MenuItem onClick={() => navigate('/new-performance')}>Előadás létrehozás</MenuItem>
              <MenuItem onClick={() => navigate('/admin/dashboard')}>Admin Dashboard</MenuItem>
              <MenuItem onClick={() => navigate('/user-management')}>
                Felhasználók kezelése
              </MenuItem>
              <MenuItem onClick={() => navigate('/theater-management')}>
                Színházak kezelése
              </MenuItem>
              <MenuItem onClick={() => navigate('/pay-management')}>Fizetési ügyek</MenuItem>
              <MenuItem onClick={() => navigate('/other-management')}>Egyéb</MenuItem>
            </Menu>
            <div className='hidden laptop:flex gap-4'>
            <MenuLink text="Előadás létrehozás" to="/new-performance" />
            <MenuLink text="Admin Dashboard" to="/admin/dashboard" />
            <MenuLink text="Felhasználók kezelése" to="/user-management" />
            <MenuLink text="Színházak kezelése" to="/theater-management" />
            <MenuLink text="Fizetési ügyek" to="/pay-management" />
            <MenuLink text="Egyéb" to="/other-management" />
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
