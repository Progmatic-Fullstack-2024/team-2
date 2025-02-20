import { Menu, MenuItem } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';

import AuthModal from './AuthModal';
import AuthContext from '../contexts/AuthContext';
import DefaultButton from './misc/DefaultButton';
import MenuLink from './misc/MenuLink';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const [transparentHeader, setTransparentHeader] = useState(true);
  const [adminMenuAnchor, setAdminMenuAnchor] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [modalForm, setModalForm] = useState('login');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const headerClass = `fixed top-0 left-0 w-full border-b bg-${
    transparentHeader ? 'transparent border-c-text/40' : 'c-background border-c-text/60'
  } transition-colors duration-200 text-white px-1 tablet:px-5 laptop:px-10 flex flex-col z-50`;

  useEffect(() => {
    const handleScroll = () => setTransparentHeader(window.scrollY <= 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={headerClass}>
      <div className="flex w-full justify-between items-center">
        <div className="flex gap-4 px-3 py-2 text-xl font-bold ">
          <Link to="/" className="min-w-[55px] hidden tablet:block">
            <img
              src="Modified_Bt4th.svg"
              alt="BreakThe4th Logo"
              className="w-[50px] h-[50px] sm:w-[25px] sm:h-[25px] cursor-pointer hover:scale-110 transition-transform duration-100"
            />
          </Link>
        </div>

        <nav className="flex items-center h-16">
          <MenuLink text="Home" to="/" icon="home" iconSize="50" />
          <MenuLink text="Böngészés" to="/browse" icon="theater" iconSize="50px" />

          <div className="relative" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
            <MenuLink text="Keresés" icon="browse" iconSize="50px" />
            {dropdownOpen && (
              <div className="absolute bg-c-background shadow-lg rounded-md py-2 w-40 mt-1">
                <Link to="/performances" className="block px-4 py-2 hover:bg-c-text/10">Előadások</Link>
                <Link to="/theater" className="block px-4 py-2 hover:bg-c-text/10">Színházak</Link>
                <Link to="/creators" className="block px-4 py-2 hover:bg-c-text/10">Alkotók</Link>
              </div>
            )}
          </div>
          
          {user ? (
            <>
              <MenuLink text="Bérletvásárlás" to="/season-tickets" icon="cart" iconSize="50" />
              <MenuLink text="Profilom" to="/ownUser" icon="user" iconSize="50" />
              <DefaultButton text="Kijelentkezés" color="c-warning" buttonStyle="outline" height="11" onClick={() => { logout(); navigate('/'); }} icon="logout" />
            </>
          ) : (
            <>
              <DefaultButton text="Bejelentkezés" buttonStyle="outline" height="11" onClick={() => { setModalForm('login'); setShowAuthModal(true); }} icon="login" />
              <DefaultButton text="Regisztráció" buttonStyle="outline" height="11" onClick={() => { setModalForm('register'); setShowAuthModal(true); }} icon="user" />
            </>
          )}
        </nav>
      </div>

      {showAuthModal && <AuthModal formType={modalForm} onClose={() => setShowAuthModal(false)} />}
    </header>
  );
}
