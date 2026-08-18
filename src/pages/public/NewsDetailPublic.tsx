import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Eye, Calendar, Tag } from 'lucide-react';
import type { NewsItem } from '../../types';
import { getNewsById, getPublishedNews } from '../../data/storage';

export default function NewsDetailPublic() {
  const { id } = useParams();
  const [item, setItem] = useState<NewsItem | null>(null);
  const [related, setRelated] = useState<NewsItem[]>([]);

  useEffect(() => {
    if (!id) return;
    const found = getNewsById(id);
    if (found && found.status === 'yayinda') {
      setItem(found);
      const others = getPublishedNews()
        .filter((n) => n.id !== id && n.category === found.category)
        .slice(0, 3);
      setRelated(others);
    } else {
      setItem(null);
    }
  }, [id]);

  if (!item) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center text-slate-400">
        <p className="mb-4">Haber bulunamadı veya yayınlanmamış.</p>
        <Link to="/haberler" className="text-primary-600 text-sm font-medium">
          Haberler listesine dön
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Link
        to="/haberler"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-6"
      >
        <ArrowLeft size={16} /> Haberler
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <article className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-56 sm:h-72 object-cover"
            />
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-4">
                <span className="flex items-center gap-1 bg-primary-50 text-primary-700 px-2.5 py-1 rounded-full font-medium">
                  <Tag size={12} /> {item.category}
                </span>
                <span className="flex items-center gap-1">
                  Kaynak: {item.source}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={13} />
                  {new Date(item.createdAt).toLocaleDateString('tr-TR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Eye size={13} /> {item.views.toLocaleString('tr-TR')}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug mb-4">
                {item.title}
              </h1>
              <p className="text-lg text-slate-600 font-medium mb-6">{item.summary}</p>
              <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed whitespace-pre-line">
                {item.content}
              </div>
            </div>
          </div>
        </article>

        {/* Sidebar related */}
        <aside className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
            <h3 className="font-semibold text-slate-800 mb-4">İlgili Haberler</h3>
            {related.length === 0 ? (
              <p className="text-sm text-slate-400">İlgili haber yok</p>
            ) : (
              <div className="space-y-4">
                {related.map((r) => (
                  <Link key={r.id} to={`/haberler/${r.id}`} className="flex gap-3 group">
                    <img
                      src={r.imageUrl}
                      alt=""
                      className="w-20 h-14 object-cover rounded-lg shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-sm font-medium text-slate-800 line-clamp-2 group-hover:text-primary-700 transition">
                        {r.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">
                        {new Date(r.createdAt).toLocaleDateString('tr-TR')}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
