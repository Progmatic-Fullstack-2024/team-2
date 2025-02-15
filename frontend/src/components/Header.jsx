import { Menu, MenuItem } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';

import AuthModal from './AuthModal';
import AuthContext from '../contexts/AuthContext';
import DefaultButton from './misc/DefaultButton';
import MenuLink from './misc/MenuLink';
import SvgIcon from './misc/SvgIcon';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const [transparentHeader, setTransparentHeader] = useState(true);
  const [adminMenuAnchor, setAdminMenuAnchor] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [modalForm, setModalForm] = useState('login');

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
  const openAuthModal = (formType) => {
    setModalForm(formType);
    setShowAuthModal(true);
  };

  return (
    <header className={headerClass}>
      <div className="flex w-full justify-end tablet:justify-between items-center">
        <div className="hidden tablet:flex gap-10 px-3 py-2 text-xl font-bold ">
          <Link to="/" className="min-w-[55px] hidden tablet:block">
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
              className="hidden laptop:block hover:text-white transform transition duration-700 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] cursor-default  my-auto "
            >
              {`${user.firstName}`}
            </Link>
          )}
        </div>

        <nav className="flex tablet:gap-1 laptop:gap-2 items-center h-16">
          <MenuLink text="Home" to="/" icon="home" iconSize="50" />
          <MenuLink text="Böngészés" to="/browse" icon="browse" iconSize="50px" />
          <MenuLink text="Előadások" to="/performances" icon="camera" iconSize="50px" />
          {user ? (
            <>
              <MenuLink text="Bérletvásárlás" to="/season-tickets" icon="cart" iconSize="50px" />
              <MenuLink text="Profilom" to="/ownUser" icon="user" iconSize="50" />
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
            <>
              <DefaultButton
                text="Bejelentkezés"
                buttonStyle="outline"
                height="11"
                onClick={() => openAuthModal('login')}
                icon="login"
              />
              <DefaultButton
                text="Regisztráció"
                buttonStyle="outline"
                height="11"
                onClick={() => openAuthModal('register')}
                icon="user"
              />
            </>
          )}
        </nav>
      </div>

      {user?.role === 'admin' && (
        <>
          <hr className="w-full border-t border-c-text/40" />
          <nav className="flex gap-4 items-center w-full justify-start py-2 pb-4">
            <div className="laptop:hidden relative flex items-center gap-2">
              <FiMenu className="text-2xl cursor-pointer" onClick={handleAdminMenuOpen} />
              <button
                type="button"
                className="text-white font-bold hover:underline"
                onClick={handleAdminMenuOpen}
                aria-label="Admin menü megnyitása"
              />
            </div>
            <div className="my-2">
              <Menu
                anchorEl={adminMenuAnchor}
                open={Boolean(adminMenuAnchor)}
                onClose={handleAdminMenuClose}
                disableScrollLock
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                PaperProps={{
                  sx: {
                    maxHeight: '500px',
                    overflowY: 'auto',
                  },
                }}
              >
                <MenuItem onClick={() => navigate('/userlist')}>Felhasználók kezelése</MenuItem>
                <MenuItem onClick={() => navigate('/')}>Színházak kezelése</MenuItem>
              </Menu>
            </div>
            <div className="hidden laptop:flex gap-4">
              <MenuLink text="Felhasználók kezelése" to="/userlist" />
              <MenuLink text="Színházak kezelése" to="/" />
            </div>
          </nav>
        </>
      )}
      {user?.role === 'theaterAdmin' && (
        <>
          <hr className="w-full border-t border-c-text/40 my-2" />
          <nav className="flex gap-4 items-center w-full justify-center py-2 pb-4">
            <div className="laptop:hidden relative flex items-center gap-2">
              <FiMenu
                className="absolute -left-48 text-2xl cursor-pointer"
                onClick={handleAdminMenuOpen}
              />
              <button
                type="button"
                className="text-white font-bold hover:underline"
                onClick={handleAdminMenuOpen}
                aria-label="Theater Admin menü megnyitása"
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
              <MenuItem onClick={() => navigate('/theater-admin')}>Színházam</MenuItem>
              <MenuItem onClick={() => navigate('/')}>Fizetési ügyek</MenuItem>
              <MenuItem onClick={() => navigate('/')}>Egyéb</MenuItem>
            </Menu>
            <div className="hidden laptop:flex gap-4">
              <MenuLink text="Színházam" to="/theater-admin" />
              <MenuLink text="Fizetési ügyek" to="/" />
              <MenuLink text="Egyéb" to="/" />
            </div>
          </nav>
        </>
      )}

      {showAuthModal && <AuthModal formType={modalForm} onClose={() => setShowAuthModal(false)} />}
    </header>
  );
}
