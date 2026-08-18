import { Link } from 'react-router-dom';
import { Newspaper, Mail, MapPin, Phone } from 'lucide-react';

export default function PublicFooter() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo ve Açıklama */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center">
                <Newspaper className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white text-lg">skdesignsx</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Güncel haberler, videolar ve medya ağı. Güvenilir içerik platformu.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>© {new Date().getFullYear()} Tüm hakları saklıdır.</span>
            </div>
          </div>

          {/* Keşfet */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Keşfet</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/haberler" className="hover:text-emerald-400 transition flex items-center gap-2">
                  <Newspaper size={14} />
                  Haberler
                </Link>
              </li>
              <li>
                <Link to="/videolar" className="hover:text-emerald-400 transition flex items-center gap-2">
                  <Mail size={14} />
                  Videolar
                </Link>
              </li>
            </ul>
          </div>

          {/* Kategoriler */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Kategoriler</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-emerald-400 transition cursor-pointer">Transfer</li>
              <li className="hover:text-emerald-400 transition cursor-pointer">Maç</li>
              <li className="hover:text-emerald-400 transition cursor-pointer">Spor</li>
              <li className="hover:text-emerald-400 transition cursor-pointer">Lig</li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">İletişim</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-emerald-500" />
                <a href="mailto:info@skdesignsx.com" className="hover:text-emerald-400 transition">
                  info@skdesignsx.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-emerald-500" />
                <a href="tel:+908501234567" className="hover:text-emerald-400 transition">
                  +90 850 123 45 67
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-emerald-500" />
                <span>İstanbul, Türkiye</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p className="text-slate-500">
            skdesignsx - Güvenilir Haber Platformu
          </p>
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:text-emerald-400 transition">Gizlilik Politikası</Link>
            <Link to="/" className="hover:text-emerald-400 transition">Kullanım Şartları</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
