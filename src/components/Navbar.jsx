import { useState } from 'react';
import { logo } from '@assets/image';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const NavLink = ({ to, label }) => (
    <Link
      to={to}
      onClick={() => setMenuOpen(false)}
      className={`text-base md:text-lg font-bold ${
        location.pathname === to ? 'text-red-700' : 'text-gray-700'
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="mx-auto border-b-2 sm:px-14 max-w-7xl">
      <div className="flex justify-between p-4 md:p-6 lg:p-8">
        <Link to="/home" className="flex items-center col-start-1 gap-2">
          <img src={logo} alt="Logo" className="w-8 h-8 md:w-10 md:h-10" />
          <h1 className="text-lg font-bold md:text-xl">SIMS PPOB</h1>
        </Link>

        {/* Desktop Menu */}
        <div className="justify-center hidden gap-6 md:flex lg:gap-8">
          <NavLink to="/top-up" label="Top Up" />
          <NavLink to="/transaction-histori" label="Transaction" />
          <NavLink to="/profile" label="Akun" />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex justify-end md:hidden">
          <button onClick={toggleMenu} className="text-lg text-gray-700">
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-16 left-0 h-full w-3/4 max-w-xs p-4 bg-white border-r-2 transform ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex flex-col space-y-4">
          <NavLink to="/top-up" label="Top Up" />
          <NavLink to="/transaction-histori" label="Transaction" />
          <NavLink to="/profile" label="Akun" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
