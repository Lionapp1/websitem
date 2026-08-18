import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Search } from 'lucide-react';
import type { NewsItem } from '../../types';
import { getPublishedNews } from '../../data/storage';

const categories = ['Tümü', 'Transfer', 'Maç', 'Lig', 'Kulüp', 'Milli Takım', 'Analiz'];

export default function NewsListPublic() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Tümü');

  useEffect(() => {
    setNews(getPublishedNews());
  }, []);

  const filtered = news.filter((n) => {
    const matchSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.summary.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'Tümü' || n.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Haberler</h1>
        <p className="text-slate-500">En güncel haberleri keşfedin</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2.5">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Haber ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-sm w-full text-slate-700"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition ${
              category === cat
                ? 'bg-primary-600 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-primary-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <p>Haber bulunamadı</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <Link
              key={item.id}
              to={`/haberler/${item.id}`}
              className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition group"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-4">
                <span className="text-xs font-medium text-primary-600">{item.category}</span>
                <h3 className="font-semibold text-slate-800 mt-1 line-clamp-2 group-hover:text-primary-700 transition">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 mt-1.5 line-clamp-2">{item.summary}</p>
                <div className="flex items-center gap-3 mt-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Eye size={12} /> {item.views.toLocaleString('tr-TR')}
                  </span>
                  <span>{new Date(item.createdAt).toLocaleDateString('tr-TR')}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
