import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit2, Eye, Calendar, Tag } from 'lucide-react';
import type { NewsItem } from '../types';
import { getNewsById } from '../data/storage';

export default function NewsDetail() {
  const { id } = useParams();
  const [item, setItem] = useState<NewsItem | null>(null);

  useEffect(() => {
    if (id) setItem(getNewsById(id) || null);
  }, [id]);

  if (!item) {
    return (
      <div className="text-center py-20 text-slate-400">
        <p>Haber bulunamadı</p>
        <Link to="/admin/haberler" className="text-primary-600 text-sm mt-2 inline-block">
          Listeye dön
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <Link
          to="/admin/haberler"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800"
        >
          <ArrowLeft size={18} /> Listeye Dön
        </Link>
        <Link
          to={`/admin/haberler/duzenle/${item.id}`}
          className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700"
        >
          <Edit2 size={16} /> Düzenle
        </Link>
      </div>

      <article className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <img src={item.imageUrl} alt={item.title} className="w-full h-56 object-cover" />
        <div className="p-6 space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1"><Tag size={13} /> {item.category}</span>
            <span>Kaynak: {item.source}</span>
            <span className="flex items-center gap-1">
              <Calendar size={13} />
              {new Date(item.createdAt).toLocaleDateString('tr-TR', {
                day: 'numeric', month: 'long', year: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={13} /> {item.views.toLocaleString('tr-TR')} görüntülenme
            </span>
            <span
              className={`px-2 py-0.5 rounded-full font-medium ${
                item.status === 'yayinda'
                  ? 'bg-emerald-50 text-emerald-700'
                  : item.status === 'taslak'
                  ? 'bg-amber-50 text-amber-700'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {item.status === 'yayinda' ? 'Yayında' : item.status === 'taslak' ? 'Taslak' : 'Arşiv'}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 leading-snug">{item.title}</h1>
          <p className="text-slate-600 font-medium">{item.summary}</p>
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed whitespace-pre-line">
            {item.content}
          </div>
        </div>
      </article>
    </div>
  );
}
