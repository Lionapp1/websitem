import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Newspaper,
  Video,
  PlusCircle,
  Settings,
  Users,
  BarChart3,
  LogOut,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const menuItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { path: '/admin/haberler', label: 'Haberler', icon: Newspaper },
  { path: '/admin/haberler/yeni', label: 'Yeni Haber', icon: PlusCircle },
  { path: '/admin/videolar', label: 'Videolar', icon: Video },
  { path: '/admin/videolar/yeni', label: 'Yeni Video', icon: PlusCircle },
  { path: '/admin/istatistikler', label: 'İstatistikler', icon: BarChart3 },
  { path: '/admin/kullanicilar', label: 'Kullanıcılar', icon: Users },
  { path: '/admin/ayarlar', label: 'Ayarlar', icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const isActive = (path: string, end?: boolean) => {
    if (end) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full z-50
          bg-slate-900 text-slate-300
          transition-all duration-300 ease-in-out
          flex flex-col
          ${collapsed ? 'w-[72px]' : 'w-64'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700/50">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
                <Newspaper className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-white text-lg tracking-tight">skdesignsx</span>
            </div>
          )}
          {collapsed && (
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center mx-auto">
              <Newspaper className="w-5 h-5 text-white" />
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-md hover:bg-slate-800 text-slate-400"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto sidebar-scroll py-4 px-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path, item.end);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg
                  transition-all duration-200
                  ${active
                    ? 'bg-emerald-600 text-white shadow-lg shadow-primary-600/20'
                    : 'hover:bg-slate-800 hover:text-white text-slate-400'
                  }
                  ${collapsed ? 'justify-center' : ''}
                `}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={20} className="shrink-0" />
                {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              </NavLink>
            );
          })}

          <div className="pt-3 mt-3 border-t border-slate-700/50">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg
                hover:bg-slate-800 hover:text-white text-slate-400 transition
                ${collapsed ? 'justify-center' : ''}
              `}
              title={collapsed ? 'Siteyi Görüntüle' : undefined}
            >
              <ExternalLink size={20} className="shrink-0" />
              {!collapsed && <span className="text-sm font-medium">Siteyi Görüntüle</span>}
            </a>
          </div>
        </nav>

        <div className="border-t border-slate-700/50 p-3">
          {!collapsed ? (
            <div className="flex items-center gap-3 px-2 py-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center text-white font-semibold text-sm">
                AY
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">SK Designs X</p>
                <p className="text-xs text-slate-500 truncate">admin@skdesignsx.com</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-red-400 transition"
                title="Çıkış Yap"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full flex justify-center p-2 rounded-md hover:bg-slate-800 text-slate-400 hover:text-red-400"
              title="Çıkış Yap"
            >
              <LogOut size={20} />
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
