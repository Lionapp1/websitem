import { Menu, Bell, Search, Sun, Moon, Globe, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  setMobileOpen: (v: boolean) => void;
  title: string;
}

export default function Header({ setMobileOpen, title }: HeaderProps) {
  const [dark, setDark] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-600 shrink-0"
          aria-label="Menü"
        >
          <Menu size={22} />
        </button>
        <h1 className="text-lg font-semibold text-slate-800 truncate">{title}</h1>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <div className="hidden md:flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2 w-56 lg:w-64">
          <Search size={16} className="text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Panelde ara..."
            className="bg-transparent border-none outline-none text-sm text-slate-700 placeholder:text-slate-400 w-full"
          />
        </div>

        <Link
          to="/"
          target="_blank"
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition"
          title="Siteyi aç"
        >
          <Globe size={20} />
        </Link>

        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition"
          title={dark ? 'Açık tema' : 'Koyu tema'}
        >
          {dark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition relative" title="Bildirimler">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>

        <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition hidden sm:flex" title="Yardım">
          <HelpCircle size={20} />
        </button>

        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center text-white text-xs font-bold ml-1 shrink-0">
          SK
        </div>
      </div>
    </header>
  );
}
