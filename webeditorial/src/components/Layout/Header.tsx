import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BellIcon, UserIcon, LogOutIcon, SettingsIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
const Header: React.FC = () => {
  const {
    user,
    logout
  } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-semibold text-gray-800">
          Sistema de Gestión Editorial
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-700">
          <BellIcon className="w-5 h-5" />
        </button>
        <div className="relative" ref={menuRef}>
          <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center space-x-2 focus:outline-none">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <UserIcon className="w-5 h-5" />
            </div>
            <span className="hidden md:block">{user?.name || 'Admin'}</span>
          </button>
          {showUserMenu && <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
              <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                <SettingsIcon className="w-4 h-4 mr-2" />
                Configuración
              </Link>
              <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                <LogOutIcon className="w-4 h-4 mr-2" />
                Cerrar sesión
              </button>
            </div>}
        </div>
      </div>
    </header>;
};
export default Header;