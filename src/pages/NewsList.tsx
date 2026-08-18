import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Eye, Edit2, Trash2, MoreVertical, Newspaper } from 'lucide-react';
import type { NewsItem } from '../types';
import { getNews, saveNews } from '../data/storage';

const statusLabels = {
  yayinda: { label: 'Yayında', class: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
  taslak: { label: 'Taslak', class: 'bg-amber-50 text-amber-700 border border-amber-200' },
  arsiv: { label: 'Arşiv', class: 'bg-slate-100 text-slate-600 border border-slate-200' },
};

export default function NewsList() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setNews(getNews());
  }, []);

  const filtered = news.filter((n) => {
    const matchSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || n.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleDelete = (id: string) => {
    if (!confirm('Bu haberi silmek istediğinize emin misiniz?')) return;
    const updated = news.filter((n) => n.id !== id);
    setNews(updated);
    saveNews(updated);
    setMenuOpen(null);
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/haberler/duzenle/${id}`);
    setMenuOpen(null);
  };

  const handleView = (id: string) => {
    navigate(`/admin/haberler/${id}`);
    setMenuOpen(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-sm text-slate-500">
          Toplam <span className="font-semibold text-slate-800">{news.length}</span> haber
        </p>
        <Link
          to="/admin/haberler/yeni"
          className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition shadow-sm"
        >
          <Plus size={18} /> Yeni Haber Ekle
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2">
          <Search size={16} className="text-slate-400" />
          <input
            type="text"
            placeholder="Haber ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-sm w-full text-slate-700"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 outline-none"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="yayinda">Yayında</option>
            <option value="taslak">Taslak</option>
            <option value="arsiv">Arşiv</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left text-slate-500 border-b border-slate-100">
                <th className="px-5 py-3 font-medium">Haber</th>
                <th className="px-5 py-3 font-medium hidden md:table-cell">Kategori</th>
                <th className="px-5 py-3 font-medium hidden lg:table-cell">Kaynak</th>
                <th className="px-5 py-3 font-medium">Durum</th>
                <th className="px-5 py-3 font-medium hidden sm:table-cell">Görüntülenme</th>
                <th className="px-5 py-3 font-medium hidden xl:table-cell">Tarih</th>
                <th className="px-5 py-3 font-medium text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-slate-400">
                    <Newspaper size={40} className="mx-auto mb-3 opacity-40" />
                    <p>Haber bulunamadı</p>
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.imageUrl}
                          alt=""
                          className="w-14 h-10 object-cover rounded-md shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-slate-800 truncate max-w-[200px] lg:max-w-[280px]">
                            {item.title}
                          </p>
                          <p className="text-xs text-slate-400 truncate max-w-[200px]">{item.summary}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 hidden md:table-cell">
                      <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-xs">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-5 py-3 hidden lg:table-cell text-slate-600">{item.source}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusLabels[item.status].class}`}>
                        {statusLabels[item.status].label}
                      </span>
                    </td>
                    <td className="px-5 py-3 hidden sm:table-cell text-slate-600">
                      <span className="flex items-center gap-1">
                        <Eye size={14} className="text-slate-400" />
                        {item.views.toLocaleString('tr-TR')}
                      </span>
                    </td>
                    <td className="px-5 py-3 hidden xl:table-cell text-slate-500 text-xs">
                      {new Date(item.createdAt).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="relative inline-block">
                        <button
                          onClick={() => setMenuOpen(menuOpen === item.id ? null : item.id)}
                          className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
                        >
                          <MoreVertical size={18} />
                        </button>
                        {menuOpen === item.id && (
                          <>
                            <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(null)} />
                            <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-20 overflow-hidden">
                              <button
                                onClick={() => handleView(item.id)}
                                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                              >
                                <Eye size={16} className="text-emerald-600" /> Görüntüle
                              </button>
                              <button
                                onClick={() => handleEdit(item.id)}
                                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                              >
                                <Edit2 size={16} className="text-blue-600" /> Düzenle
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                              >
                                <Trash2 size={16} /> Sil
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
