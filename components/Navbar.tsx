
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  notifications?: {message: string, type: 'info' | 'success'}[];
  onInstantConsultation: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, notifications = [], onInstantConsultation }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setShowNotifPanel(false);
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinkClass = (path: string) => `
    text-sm font-medium px-4 py-2 transition-colors relative
    ${location.pathname === path ? 'text-blue-600 after:content-[""] after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-blue-600' : 'text-gray-600 hover:text-blue-500'}
  `;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-40 px-8 py-0 flex items-center h-16 shadow-sm">
      <div className="flex items-center w-full max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 mr-12 shrink-0">
          <span className="font-bold text-2xl tracking-tight text-gray-800 flex items-center gap-2">
            StayHealthy <i className="fas fa-user-md text-blue-500"></i>
          </span>
        </Link>

        {/* Traditional Nav Links */}
        <div className="hidden lg:flex items-center gap-4 h-full">
          <Link to="/" className={navLinkClass('/')}>Home</Link>
          <Link to="/doctors" className={navLinkClass('/doctors')}>Appointments</Link>
          <Link to="/reviews" className={navLinkClass('/reviews')}>Reviews</Link>
        </div>

        {/* Instant Consultation Button */}
        <button 
          onClick={onInstantConsultation}
          className="ml-4 hidden md:flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider hover:bg-blue-700 transition-all shadow-sm active:scale-95"
        >
          <i className="fas fa-bolt"></i> Instant Consultation
        </button>

        {/* Auth / User Actions */}
        <div className="ml-auto flex items-center gap-4 lg:gap-6 relative" ref={panelRef}>
          {/* Notification Icon */}
          <div 
            className="relative cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-colors"
            onClick={() => setShowNotifPanel(!showNotifPanel)}
          >
            <i className="fas fa-bell text-xl text-gray-500"></i>
            {notifications.length > 0 && (
              <span className="absolute top-1 right-1 bg-blue-500 text-white text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {notifications.length}
              </span>
            )}
          </div>

          {user ? (
            <div className="flex items-center gap-4">
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="text-sm font-semibold border border-gray-200 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                  Welcome, {user.name.split(' ')[0]}
                </button>
                
                {showUserMenu && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 shadow-xl rounded-lg py-2 z-50 animate-slide-in">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">Your Profile</Link>
                    <Link to="/reports" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50">Medical Reports</Link>
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => { onLogout(); navigate('/'); }}
                className="text-sm font-bold text-blue-500 border border-blue-500 px-6 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-all active:scale-95 whitespace-nowrap"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 lg:gap-4">
              <Link 
                to="/login" 
                className="text-sm font-bold text-blue-500 border border-blue-500 px-4 lg:px-6 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-all active:scale-95 whitespace-nowrap"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="text-sm font-bold text-blue-500 border border-blue-500 px-4 lg:px-6 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-all active:scale-95 whitespace-nowrap"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Notification Panel */}
      {showNotifPanel && (
        <div className="absolute top-16 right-8 w-80 bg-white border border-gray-100 shadow-2xl rounded-xl z-50 overflow-hidden text-black animate-slide-in">
          <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider">Recent Activity</span>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-400">
                <p className="text-xs font-medium italic">No new notifications</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {notifications.slice().reverse().map((notif, idx) => (
                  <div key={idx} className="p-4 hover:bg-gray-50 transition-colors">
                    <p className="text-xs text-gray-800">{notif.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
