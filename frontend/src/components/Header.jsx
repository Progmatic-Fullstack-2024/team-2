import { Menu, MenuItem } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';
import DefaultButton from './misc/DefaultButton';
import MenuLink from './misc/MenuLink';
import SvgIcon from './misc/SvgIcon';
import AuthModal from './AuthModal';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const [transparentHeader, setTransparentHeader] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [modalForm, setModalForm] = useState('login'); // 'login' vagy 'register'

  const navigate = useNavigate();

  const headerClass = `fixed top-0 left-0 w-full border-b bg-${
    transparentHeader ? 'transparent border-c-text/40' : 'c-background border-c-text/60'
  } transition-colors duration-200 text-white px-1 tablet:px-5 laptop:px-10 flex justify-between z-50`;

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

  
  const openAuthModal = (formType) => {
    setModalForm(formType);
    setShowAuthModal(true);
  };

  return (
    <>
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
            {user.role === 'Admin' && <MenuLink text="Előadás létrehozás" to="/new-performance" />}
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
