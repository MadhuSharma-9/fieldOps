import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HiUserCircle, HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHomePage = location.pathname === '/';
  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 top-0 transition-all duration-300 ${
      isHomePage
        ? 'bg-white/90 backdrop-blur-lg border-b border-gray-100 shadow-sm'
        : 'bg-white border-b border-gray-200 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* LOGO */}
          <Link to="/" className={`flex items-center gap-3 hover:opacity-80 transition ${
            isHomePage ? 'text-gray-900' : 'text-gray-900'
          }`}>
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-lime-500 rounded-lg flex items-center justify-center shadow-[0_10px_30px_rgba(16,185,129,0.25)]">
              <span className="text-white font-black text-xl">FO</span>
            </div>
            <span className="text-2xl font-black tracking-tighter">
              FieldOps<span className="text-emerald-700"> by Anweshan</span>
            </span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link
              to="/"
              className={`relative pb-1 text-sm font-semibold tracking-wide transition-colors after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-emerald-600 after:transition-transform after:duration-200 after:origin-left ${
                isActive('/') 
                  ? 'text-emerald-700 after:scale-x-100' 
                  : 'text-gray-600 hover:text-emerald-700 after:scale-x-0 hover:after:scale-x-100'
              }`}
            >
              HOME
            </Link>
            <Link
              to="/about"
              className={`relative pb-1 text-sm font-semibold tracking-wide transition-colors after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-emerald-600 after:transition-transform after:duration-200 after:origin-left ${
                isActive('/about') 
                  ? 'text-emerald-700 after:scale-x-100' 
                  : 'text-gray-600 hover:text-emerald-700 after:scale-x-0 hover:after:scale-x-100'
              }`}
            >
              ABOUT
            </Link>
            
            {user && (
              <Link
                to="/dashboard"
                className={`relative pb-1 text-sm font-semibold tracking-wide transition-colors after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-emerald-600 after:transition-transform after:duration-200 after:origin-left ${
                  isActive('/dashboard') 
                    ? 'text-emerald-700 after:scale-x-100' 
                    : 'text-gray-600 hover:text-emerald-700 after:scale-x-0 hover:after:scale-x-100'
                }`}
              >
                DASHBOARD
              </Link>
            )}
            
            <div className={`h-4 w-px ${isHomePage ? 'bg-gray-200' : 'bg-gray-300'}`}></div>

            {/* AUTH SECTION */}
            <div className="flex space-x-4 items-center">
              {user ? (
                <>
                  <div className={`flex items-center gap-2 ${isHomePage ? 'text-gray-800' : 'text-gray-700'}`}>
                    <HiUserCircle className="text-2xl opacity-70" />
                    <span className="font-bold text-sm tracking-wide">
                      {user.username}
                    </span>
                  </div>
                  
                  <button 
                    onClick={handleLogout}
                    className={`ml-2 px-4 py-2 text-xs font-bold border rounded-lg transition ${
                      isHomePage 
                        ? 'text-emerald-700 border-emerald-200 hover:bg-emerald-50' 
                        : 'text-emerald-700 border-emerald-200 hover:bg-emerald-50'
                    }`}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className={`px-5 py-2 text-sm font-bold rounded-lg transition ${
                    isHomePage 
                      ? 'text-white bg-emerald-600 hover:bg-emerald-700' 
                      : 'text-white bg-emerald-600 hover:bg-emerald-700'
                  }`}>
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className={`px-5 py-2 text-sm font-bold border rounded-lg transition ${
                      isHomePage 
                        ? 'text-emerald-700 border-emerald-200 hover:bg-emerald-50' 
                        : 'text-emerald-700 border-emerald-200 hover:bg-emerald-50'
                    }`}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden flex items-center">
             <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={isHomePage ? 'text-white' : 'text-gray-900'}>
               {mobileMenuOpen ? <HiX size={28}/> : <HiMenu size={28}/>}
             </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileMenuOpen && (
        <div className={`md:hidden p-4 absolute w-full border-b shadow-xl ${
          isHomePage 
            ? 'bg-white text-gray-900 border-gray-200' 
            : 'bg-white text-gray-900 border-gray-200'
        }`}>
           <div className="flex flex-col space-y-4">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className={`block py-2 ${isHomePage ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-900'} ${isActive('/') ? 'font-bold text-emerald-700' : ''}`}>Home</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className={`block py-2 ${isHomePage ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-900'} ${isActive('/about') ? 'font-bold text-emerald-700' : ''}`}>About</Link>
              {user && <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className={`block py-2 ${isHomePage ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-900'} ${isActive('/dashboard') ? 'font-bold text-emerald-700' : ''}`}>Dashboard</Link>}
              <hr className={isHomePage ? 'border-white/20' : 'border-gray-200'}/>
              {user ? (
                 <button onClick={handleLogout} className={`text-left py-2 font-bold ${isHomePage ? 'text-yellow-400' : 'text-blue-900'}`}>Logout ({user.username})</button>
              ) : (
                 <>
                   <Link to="/login" onClick={() => setMobileMenuOpen(false)} className={`block py-2 font-bold ${isHomePage ? 'text-white' : 'text-blue-900'}`}>Login</Link>
                   <Link to="/register" onClick={() => setMobileMenuOpen(false)} className={`block py-2 ${isHomePage ? 'text-white/80' : 'text-gray-600'}`}>Register</Link>
                 </>
              )}
           </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
