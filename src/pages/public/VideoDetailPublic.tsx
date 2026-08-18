import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Eye, Calendar, Tag, Clock, Play } from 'lucide-react';
import type { VideoItem } from '../../types';
import { getVideoById, getPublishedVideos } from '../../data/storage';
import VideoPlayer from '../../components/VideoPlayer';

export default function VideoDetailPublic() {
  const { id } = useParams();
  const [item, setItem] = useState<VideoItem | null>(null);
  const [related, setRelated] = useState<VideoItem[]>([]);

  useEffect(() => {
    if (!id) return;
    const found = getVideoById(id);
    if (found && found.status === 'yayinda') {
      setItem(found);
      setRelated(getPublishedVideos().filter((v) => v.id !== id).slice(0, 4));
    } else {
      setItem(null);
    }
  }, [id]);

  if (!item) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center text-slate-400">
        <p className="mb-4">Video bulunamadı veya yayınlanmamış.</p>
        <Link to="/videolar" className="text-primary-600 text-sm font-medium">
          Videolar listesine dön
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Link
        to="/videolar"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 mb-6"
      >
        <ArrowLeft size={16} /> Videolar
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-black rounded-2xl overflow-hidden aspect-video">
            <VideoPlayer url={item.videoUrl} title={item.title} />
          </div>
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-3">
              <span className="flex items-center gap-1 bg-primary-50 text-primary-700 px-2.5 py-1 rounded-full font-medium">
                <Tag size={12} /> {item.category}
              </span>
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
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3">{item.title}</h1>
            <p className="text-slate-600 leading-relaxed">{item.description}</p>
          </div>
        </div>

        <aside>
          <h3 className="font-semibold text-slate-800 mb-4">Diğer Videolar</h3>
          <div className="space-y-4">
            {related.map((v) => (
              <Link key={v.id} to={`/videolar/${v.id}`} className="flex gap-3 group">
                <div className="relative shrink-0 w-32 aspect-video rounded-lg overflow-hidden bg-slate-200">
                  <img src={v.thumbnailUrl} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition">
                    <Play size={16} fill="white" className="text-white" />
                  </div>
                  <span className="absolute bottom-1 right-1 bg-black/75 text-white text-[10px] px-1 rounded">
                    {v.duration}
                  </span>
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-medium text-slate-800 line-clamp-2 group-hover:text-primary-700 transition">
                    {v.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    {v.views.toLocaleString('tr-TR')} görüntülenme
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
