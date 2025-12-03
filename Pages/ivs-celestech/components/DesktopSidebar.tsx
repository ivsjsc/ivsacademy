
import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Briefcase, PlusCircle, Settings, Rocket } from 'lucide-react';
import { Translation } from '../types';

interface DesktopSidebarProps {
  trans: Translation;
}

const DesktopNavLink = ({ to, icon, label }: { to: string, icon: React.ReactNode, label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
        isActive
          ? 'bg-secondary text-white shadow-md'
          : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
      }`
    }
  >
    {icon}
    <span className="ml-4 font-semibold text-sm">{label}</span>
  </NavLink>
);

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ trans }) => {
  return (
    <aside className="hidden md:flex flex-col w-64 bg-surface dark:bg-dark-surface border-r border-borderSub dark:border-dark-border p-4 flex-shrink-0">
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
          <Rocket className="text-white w-6 h-6" />
        </div>
        <span className="font-bold text-primary dark:text-dark-text text-lg">IVS Celestech</span>
      </div>

      <nav className="flex flex-col gap-2">
        <DesktopNavLink to="/dashboard" icon={<LayoutDashboard size={20} />} label={trans.dashboard} />
        <DesktopNavLink to="/services" icon={<Briefcase size={20} />} label={trans.services} />
        <DesktopNavLink to="/create" icon={<PlusCircle size={20} />} label={trans.create} />
        <DesktopNavLink to="/settings" icon={<Settings size={20} />} label={trans.support} />
      </nav>

      <div className="mt-auto p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 IVS Celestech. All rights reserved.</p>
      </div>
    </aside>
  );
};

export default DesktopSidebar;
