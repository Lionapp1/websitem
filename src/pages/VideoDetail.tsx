import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Edit2, Eye, Calendar, Tag, Clock } from 'lucide-react';
import type { VideoItem } from '../types';
import { getVideoById } from '../data/storage';
import VideoPlayer from '../components/VideoPlayer';

export default function VideoDetail() {
  const { id } = useParams();
  const [item, setItem] = useState<VideoItem | null>(null);

  useEffect(() => {
    if (id) setItem(getVideoById(id) || null);
  }, [id]);

  if (!item) {
    return (
      <div className="text-center py-20 text-slate-400">
        <p>Video bulunamadı</p>
        <Link to="/admin/videolar" className="text-primary-600 text-sm mt-2 inline-block">
          Listeye dön
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <Link
          to="/admin/videolar"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800"
        >
          <ArrowLeft size={18} /> Listeye Dön
        </Link>
        <Link
          to={`/admin/videolar/duzenle/${item.id}`}
          className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700"
        >
          <Edit2 size={16} /> Düzenle
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="aspect-video bg-black">
          <VideoPlayer url={item.videoUrl} title={item.title} />
        </div>
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
            <span className="flex items-center gap-1"><Clock size={13} /> {item.duration}</span>
            <span className="flex items-center gap-1">
              <Eye size={13} /> {item.views.toLocaleString('tr-TR')}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">{item.title}</h1>
          <p className="text-slate-600 leading-relaxed">{item.description}</p>
        </div>
      </div>
    </div>
  );
}
