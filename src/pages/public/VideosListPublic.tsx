import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Search, Play } from 'lucide-react';
import type { VideoItem } from '../../types';
import { getPublishedVideos } from '../../data/storage';

const categories = ['Tümü', 'Maç Özeti', 'Transfer', 'Analiz', 'Antrenman', 'Goller', 'Program'];

export default function VideosListPublic() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Tümü');

  useEffect(() => {
    setVideos(getPublishedVideos());
  }, []);

  const filtered = videos.filter((v) => {
    const matchSearch =
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'Tümü' || v.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Videolar</h1>
        <p className="text-slate-500">En son video içeriklerini izleyin</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2.5">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Video ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-sm w-full text-slate-700"
          />
        </div>
      </div>

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
          <p>Video bulunamadı</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((video) => (
            <Link key={video.id} to={`/videolar/${video.id}`} className="group">
              <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-200">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition">
                    <Play size={20} fill="currentColor" className="text-slate-800 ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/75 text-white text-xs px-1.5 py-0.5 rounded">
                  {video.duration}
                </span>
              </div>
              <div className="mt-3">
                <span className="text-xs font-medium text-primary-600">{video.category}</span>
                <h3 className="text-sm font-semibold text-slate-800 line-clamp-2 mt-0.5 group-hover:text-primary-700 transition">
                  {video.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1">
                  <Eye size={12} /> {video.views.toLocaleString('tr-TR')} ·{' '}
                  {new Date(video.createdAt).toLocaleDateString('tr-TR')}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
