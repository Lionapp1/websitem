import { Link } from 'react-router-dom';
import { Newspaper } from 'lucide-react';

export default function PublicFooter() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center">
                <Newspaper className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white text-lg">skdesignsx</span>
            </div>
            <p className="text-sm leading-relaxed">
              Güncel haberler, videolar ve medya ağı. Güvenilir içerik platformu.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Keşfet</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition">Ana Sayfa</Link></li>
              <li><Link to="/haberler" className="hover:text-white transition">Haberler</Link></li>
              <li><Link to="/videolar" className="hover:text-white transition">Videolar</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Kategoriler</h4>
            <ul className="space-y-2 text-sm">
              <li>Transfer</li>
              <li>Maç</li>
              <li>Spor</li>
              <li>Lig</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">İletişim</h4>
            <ul className="space-y-2 text-sm">
              <li>info@skdesignsx.com</li>
              <li className="pt-3">
                <Link
                  to="/admin/login"
                  className="text-[11px] text-slate-600 hover:text-slate-400 transition"
                >
                  Yönetim
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© {new Date().getFullYear()} skdesignsx. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
