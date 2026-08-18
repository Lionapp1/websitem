import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react';
import type { NewsItem } from '../types';
import { getNews, saveNews } from '../data/storage';
import { safeImageUrl } from '../utils/media';

const categories = ['Transfer', 'Maç', 'Lig', 'Kulüp', 'Milli Takım', 'Analiz', 'Antrenman'];

export default function NewsForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: '',
    summary: '',
    content: '',
    category: 'Teknoloji',
    imageUrl: '',
    source: 'SK Designs X',
    status: 'taslak' as NewsItem['status'],
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      const item = getNews().find((n) => n.id === id);
      if (item) {
        setForm({
          title: item.title,
          summary: item.summary,
          content: item.content,
          category: item.category,
          imageUrl: item.imageUrl,
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
    if (!form.title.trim() || !form.content.trim()) {
      alert('Başlık ve içerik zorunludur.');
      return;
    }
    setSaving(true);
    let list = getNews();

    if (isEdit && id) {
      list = list.map((n) =>
        n.id === id
          ? {
              ...n,
              ...form,
              imageUrl: safeImageUrl(form.imageUrl),
              updatedAt: new Date().toISOString(),
            }
          : n
      );
    } else {
      const newItem: NewsItem = {
        id: Date.now().toString(),
        ...form,
        imageUrl: safeImageUrl(form.imageUrl),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 0,
      };
      list = [newItem, ...list];
    }

    saveNews(list);
    setTimeout(() => {
      setSaving(false);
      navigate('/admin/haberler');
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <div className="flex items-center gap-3">
        <Link
          to="/admin/haberler"
          className="p-2 rounded-lg hover:bg-white border border-transparent hover:border-slate-200 text-slate-600 transition"
        >
          <ArrowLeft size={20} />
        </Link>
        <h2 className="text-lg font-semibold text-slate-800">
          {isEdit ? 'Haberi Düzenle' : 'Yeni Haber Ekle'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Başlık *</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Haber başlığını girin"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Özet</label>
          <textarea
            name="summary"
            value={form.summary}
            onChange={handleChange}
            rows={2}
            placeholder="Kısa özet"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">İçerik *</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows={8}
            placeholder="Haber içeriği..."
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none text-sm transition resize-y"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Kapak Görseli URL</label>
          <div className="relative">
            <ImageIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="https://... (görsel linki)"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 outline-none text-sm"
            />
          </div>
          {form.imageUrl && (
            <img
              src={safeImageUrl(form.imageUrl)}
              alt="Önizleme"
              className="mt-3 h-36 object-cover rounded-lg border border-slate-100"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80';
              }}
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Kaynak</label>
          <input
            name="source"
            value={form.source}
            onChange={handleChange}
            placeholder="Haber kaynağı"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 outline-none text-sm"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
          <Link
            to="/admin/haberler"
            className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition"
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
