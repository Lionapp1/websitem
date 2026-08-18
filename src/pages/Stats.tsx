import { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, Eye, Newspaper, Video } from 'lucide-react';
import type { NewsItem, VideoItem } from '../types';
import { getNews, getVideos } from '../data/storage';

function formatViews(n: number) {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.0', '') + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'B';
  return n.toLocaleString('tr-TR');
}

export default function Stats() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);

  useEffect(() => {
    setNews(getNews());
    setVideos(getVideos());
  }, []);

  const totalNewsViews = news.reduce((s, n) => s + n.views, 0);
  const totalVideoViews = videos.reduce((s, v) => s + v.views, 0);
  const total = totalNewsViews + totalVideoViews;
  const contentCount = news.length + videos.length || 1;

  const categoryCounts = news.reduce((acc, n) => {
    acc[n.category] = (acc[n.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topContent = [
    ...news.map((n) => ({ ...n, type: 'Haber' as const })),
    ...videos.map((v) => ({ ...v, type: 'Video' as const })),
  ]
    .sort((a, b) => b.views - a.views)
    .slice(0, 8);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
              <Newspaper size={22} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Haber Görüntülenme</p>
              <p className="text-xl font-bold text-slate-800">{formatViews(totalNewsViews)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-violet-50 text-violet-700 rounded-xl">
              <Video size={22} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Video Görüntülenme</p>
              <p className="text-xl font-bold text-slate-800">{formatViews(totalVideoViews)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-sky-50 text-sky-700 rounded-xl">
              <Eye size={22} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Toplam Görüntülenme</p>
              <p className="text-xl font-bold text-slate-800">{formatViews(total)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-50 text-amber-700 rounded-xl">
              <TrendingUp size={22} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Ortalama / İçerik</p>
              <p className="text-xl font-bold text-slate-800">
                {formatViews(Math.round(total / contentCount))}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
          <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <BarChart3 size={18} /> Haber Kategorileri
          </h3>
          <div className="space-y-3">
            {Object.entries(categoryCounts).length === 0 ? (
              <p className="text-sm text-slate-400">Veri yok</p>
            ) : (
              Object.entries(categoryCounts)
                .sort((a, b) => b[1] - a[1])
                .map(([cat, count]) => (
                  <div key={cat}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">{cat}</span>
                      <span className="font-medium text-slate-800">{count}</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all"
                        style={{ width: `${(count / (news.length || 1)) * 100}%` }}
                      />
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5">
          <h3 className="font-semibold text-slate-800 mb-4">En Çok İzlenen İçerikler</h3>
          <div className="space-y-3">
            {topContent.map((item, i) => (
              <div key={item.id} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs flex items-center justify-center font-semibold shrink-0">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{item.title}</p>
                  <p className="text-xs text-slate-400">{item.type}</p>
                </div>
                <span className="text-sm font-semibold text-slate-700 shrink-0">
                  {formatViews(item.views)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
