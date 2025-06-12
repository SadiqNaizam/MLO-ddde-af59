import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, UsersRound, BarChart3, Hospital } from 'lucide-react';
import { cn } from '@/lib/utils'; // For combining class names

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/patient-summary', label: 'Patient Summary', icon: Users },
  { href: '/staff-directory', label: 'Staff Directory', icon: UsersRound },
  { href: '/advanced-analytics', label: 'Analytics', icon: BarChart3 },
];

const DashboardSidebar: React.FC = () => {
  console.log('DashboardSidebar loaded');
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-slate-900 text-slate-50 shadow-xl transition-transform duration-300 ease-in-out">
      <div className="flex h-full flex-col">
        {/* Logo/Header */}
        <div className="flex h-20 items-center justify-center border-b border-slate-700 p-4">
          <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-white">
            <Hospital className="h-8 w-8 text-sky-400" />
            <span>Hospital Ops</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "group flex items-center rounded-md px-3 py-2.5 text-sm font-medium text-slate-300 transition-all duration-200 ease-in-out hover:bg-sky-500 hover:text-white hover:shadow-lg hover:scale-105",
                    location.pathname === item.href ? "bg-sky-600 text-white shadow-md scale-105" : "hover:bg-slate-700"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Optional Footer Section in Sidebar */}
        <div className="mt-auto border-t border-slate-700 p-4">
          <p className="text-center text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Hospital Systems
          </p>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;