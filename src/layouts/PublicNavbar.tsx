import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Newspaper, Search, Video, Bell, HelpCircle } from 'lucide-react';

const navItems = [
  { path: '/haberler', label: 'Haberler' },
  { path: '/videolar', label: 'Videolar' },
];

export default function PublicNavbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Arama fonksiyonu buraya eklenebilir
      console.log('Aranıyor:', searchQuery);
      setSearchOpen(false);
    }
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/haberler" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center shadow-md shadow-primary-600/20">
              <Newspaper className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-slate-900 text-lg tracking-tight">
              skdesignsx
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                {item.path === '/haberler' && <Newspaper size={16} />}
                {item.path === '/videolar' && <Video size={16} />}
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Arama Butonu ve Input */}
            <div className="relative hidden sm:block">
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Haber ara..."
                    className="w-48 lg:w-64 px-4 py-2 pr-10 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X size={16} />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-emerald-600 transition"
                  aria-label="Ara"
                >
                  <Search size={20} />
                </button>
              )}
            </div>

            {/* Bildirimler */}
            <button
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-emerald-600 transition relative"
              aria-label="Bildirimler"
            >
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Yardım */}
            <button
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-emerald-600 transition hidden sm:flex"
              aria-label="Yardım"
            >
              <HelpCircle size={20} />
            </button>

            {/* Mobil Menü */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Menü"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="md:hidden border-t border-slate-100 py-3 space-y-1">
            {/* Mobil Arama */}
            <form onSubmit={handleSearch} className="px-4 py-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Haber ara..."
                className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </form>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`
                }
              >
                {item.path === '/haberler' && <Newspaper size={16} />}
                {item.path === '/videolar' && <Video size={16} />}
                {item.label}
              </NavLink>
            ))}
            {/* Mobil Yardım ve Bildirim */}
            <div className="px-4 py-2 flex items-center gap-2 border-t border-slate-100 mt-2">
              <button className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg text-sm">
                <Bell size={16} />
                Bildirimler
              </button>
              <button className="flex items-center gap-2 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg text-sm">
                <HelpCircle size={16} />
                Yardım
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
