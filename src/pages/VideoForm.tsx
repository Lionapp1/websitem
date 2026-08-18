import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import type { VideoItem } from '../types';
import { getVideos, saveVideos } from '../data/storage';
import { toEmbedUrl, safeImageUrl } from '../utils/media';

const categories = ['Maç Özeti', 'Transfer', 'Analiz', 'Antrenman', 'Goller', 'Program', 'Röportaj'];

export default function VideoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: '',
    description: '',
    thumbnailUrl: '',
    videoUrl: '',
    duration: '',
    category: 'Teknoloji',
    source: 'SK Designs X',
    status: 'taslak' as VideoItem['status'],
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      const item = getVideos().find((v) => v.id === id);
      if (item) {
        setForm({
          title: item.title,
          description: item.description,
          thumbnailUrl: item.thumbnailUrl,
          videoUrl: item.videoUrl,
          duration: item.duration,
          category: item.category,
          source: item.source,
          status: item.status,
        });
      }
    }
  }, [id, isEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.videoUrl.trim()) {
      alert('Başlık ve video URL zorunludur.');
      return;
    }
    setSaving(true);
    let list = getVideos();
    const normalizedUrl = toEmbedUrl(form.videoUrl);

    if (isEdit && id) {
      list = list.map((v) =>
        v.id === id
          ? {
              ...v,
              ...form,
              videoUrl: normalizedUrl,
              thumbnailUrl: safeImageUrl(form.thumbnailUrl),
              updatedAt: new Date().toISOString(),
            }
          : v
      );
    } else {
      const newItem: VideoItem = {
        id: 'v' + Date.now().toString(),
        ...form,
        videoUrl: normalizedUrl,
        thumbnailUrl: safeImageUrl(form.thumbnailUrl),
        duration: form.duration || '00:00',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 0,
      };
      list = [newItem, ...list];
    }

    saveVideos(list);
    setTimeout(() => {
      setSaving(false);
      navigate('/admin/videolar');
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <div className="flex items-center gap-3">
        <Link
          to="/admin/videolar"
          className="p-2 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 text-slate-600 transition"
        >
          <ArrowLeft size={20} />
        </Link>
        <h2 className="text-lg font-semibold text-slate-800">
          {isEdit ? 'Videoyu Düzenle' : 'Yeni Video Ekle'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Başlık *</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Video başlığı"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Açıklama</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            placeholder="Video açıklaması"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none text-sm resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Video URL *</label>
          <div className="relative">
            <LinkIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              name="videoUrl"
              value={form.videoUrl}
              onChange={(e) => {
                const url = e.target.value;
                setForm((prev) => ({ ...prev, videoUrl: url }));
                
                // Otomatik thumbnail çıkarma - YouTube
                if (url.includes('youtube.com') || url.includes('youtu.be')) {
                  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/);
                  if (ytMatch && !form.thumbnailUrl) {
                    const videoId = ytMatch[1];
                    setForm((prev) => ({ 
                      ...prev, 
                      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
                    }));
                  }
                } 
                // Otomatik thumbnail çıkarma - Vimeo
                else if (url.includes('vimeo.com')) {
                  const vimeoMatch = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
                  if (vimeoMatch && !form.thumbnailUrl) {
                    const videoId = vimeoMatch[1];
                    setForm((prev) => ({ 
                      ...prev, 
                      thumbnailUrl: `https://vumbnail.com/${videoId}.jpg`
                    }));
                  }
                }
              }}
              placeholder="YouTube, Vimeo veya doğrudan video linki"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none text-sm"
              required
            />
          </div>
          <p className="text-xs text-slate-400 mt-1">
            YouTube/Vimeo linkini yapıştırınca otomatik olarak kapak resmi eklenir
          </p>
          {form.videoUrl && (
            <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-xs text-slate-600 font-medium mb-2">Önizleme:</p>
              <div className="aspect-video bg-slate-200 rounded-lg overflow-hidden">
                <iframe
                  src={toEmbedUrl(form.videoUrl)}
                  title="Video önizleme"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Kapak Görseli URL</label>
          <div className="relative">
            <ImageIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              name="thumbnailUrl"
              value={form.thumbnailUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 outline-none text-sm"
            />
          </div>
          {form.thumbnailUrl && (
            <img
              src={safeImageUrl(form.thumbnailUrl)}
              alt="Önizleme"
              className="mt-3 h-32 object-cover rounded-lg border"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Süre</label>
            <input
              name="duration"
              value={form.duration}
              onChange={handleChange}
              placeholder="12:45"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Kategori</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 outline-none text-sm bg-white"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Durum</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 outline-none text-sm bg-white"
            >
              <option value="taslak">Taslak</option>
              <option value="yayinda">Yayında</option>
              <option value="arsiv">Arşiv</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Kaynak</label>
          <input
            name="source"
            value={form.source}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 outline-none text-sm"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
          <Link
            to="/admin/videolar"
            className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            İptal
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition"
          >
            <Save size={16} />
            {saving ? 'Kaydediliyor...' : isEdit ? 'Güncelle' : 'Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
}
