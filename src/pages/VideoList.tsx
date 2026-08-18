import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Eye, Edit2, Trash2, MoreVertical, Video, Play } from 'lucide-react';
import type { VideoItem } from '../types';
import { getVideos, saveVideos } from '../data/storage';

const statusLabels = {
  yayinda: { label: 'Yayında', class: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
  taslak: { label: 'Taslak', class: 'bg-amber-50 text-amber-700 border border-amber-200' },
  arsiv: { label: 'Arşiv', class: 'bg-slate-100 text-slate-600 border border-slate-200' },
};

export default function VideoList() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setVideos(getVideos());
  }, []);

  const filtered = videos.filter((v) => {
    const matchSearch =
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || v.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleDelete = (id: string) => {
    if (!confirm('Bu videoyu silmek istediğinize emin misiniz?')) return;
    const updated = videos.filter((v) => v.id !== id);
    setVideos(updated);
    saveVideos(updated);
    setMenuOpen(null);
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/videolar/duzenle/${id}`);
    setMenuOpen(null);
  };

  const handleView = (id: string) => {
    navigate(`/admin/videolar/${id}`);
    setMenuOpen(null);
  };


  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-sm text-slate-500">
          Toplam <span className="font-semibold text-slate-800">{videos.length}</span> video
        </p>
        <Link
          to="/admin/videolar/yeni"
          className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition shadow-sm"
        >
          <Plus size={18} /> Yeni Video Ekle
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2">
          <Search size={16} className="text-slate-400" />
          <input
            type="text"
            placeholder="Video ara..."
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

      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-100 p-16 text-center text-slate-400">
          <Video size={48} className="mx-auto mb-3 opacity-40" />
          <p>Video bulunamadı</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition group"
            >
              <div className="relative">
                <img src={video.thumbnailUrl} alt={video.title} className="w-full h-40 object-cover" />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <Link
                    to={`/admin/videolar/${video.id}`}
                    className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center text-slate-800"
                  >
                    <Play size={22} fill="currentColor" />
                  </Link>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/75 text-white text-xs px-1.5 py-0.5 rounded">
                  {video.duration}
                </span>
                <span className={`absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-medium ${statusLabels[video.status].class}`}>
                  {statusLabels[video.status].label}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-slate-800 text-sm line-clamp-2 mb-1">{video.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 mb-3">{video.description}</p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="bg-slate-100 px-2 py-0.5 rounded">{video.category}</span>
                  <span className="flex items-center gap-1">
                    <Eye size={12} /> {video.views.toLocaleString('tr-TR')}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-50">
                  <span className="text-xs text-slate-400">
                    {new Date(video.createdAt).toLocaleDateString('tr-TR')}
                  </span>
                  <div className="relative">
                    <button
                      onClick={() => setMenuOpen(menuOpen === video.id ? null : video.id)}
                      className="p-2 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors"
                    >
                      <MoreVertical size={18} />
                    </button>
                    {menuOpen === video.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(null)} />
                        <div className="absolute right-0 bottom-full mb-2 w-40 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-20 overflow-hidden">
                          <button
                            onClick={() => handleView(video.id)}
                            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                          >
                            <Eye size={16} className="text-emerald-600" /> Görüntüle
                          </button>
                          <button
                            onClick={() => handleEdit(video.id)}
                            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                          >
                            <Edit2 size={16} className="text-blue-600" /> Düzenle
                          </button>
                          <button
                            onClick={() => handleDelete(video.id)}
                            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={16} /> Sil
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
