import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpenIcon, DollarSignIcon, ShoppingCartIcon, LayoutDashboardIcon } from 'lucide-react';
const Sidebar: React.FC = () => {
  const location = useLocation();
  const navItems = [{
    path: '/',
    label: 'Dashboard',
    icon: <LayoutDashboardIcon className="w-5 h-5" />
  }, {
    path: '/inventory',
    label: 'Inventario',
    icon: <BookOpenIcon className="w-5 h-5" />
  }, {
    path: '/accounting',
    label: 'Contabilidad',
    icon: <DollarSignIcon className="w-5 h-5" />
  }, {
    path: '/orders',
    label: 'Pedidos',
    icon: <ShoppingCartIcon className="w-5 h-5" />
  }];
  return <aside className="bg-blue-800 text-white w-16 md:w-64 flex flex-col shrink-0">
      <div className="p-4 flex items-center justify-center md:justify-start">
        <span className="text-xl font-bold hidden md:block">
          Editorial Siriza Agaria
        </span>
        <span className="text-xl font-bold md:hidden">ESA</span>
      </div>
      <nav className="flex-1 mt-6">
        <ul>
          {navItems.map(item => <li key={item.path} className="mb-2">
              <Link to={item.path} className={`flex items-center py-3 px-4 rounded-lg ${location.pathname === item.path ? 'bg-blue-700' : 'hover:bg-blue-700'}`}>
                <span className="mr-3">{item.icon}</span>
                <span className="hidden md:block">{item.label}</span>
              </Link>
            </li>)}
        </ul>
      </nav>
    </aside>;
};
export default Sidebar;