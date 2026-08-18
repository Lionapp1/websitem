import { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, Eye, Newspaper, Video, Activity, ArrowUpRight, Calendar, Clock, Trophy } from 'lucide-react';
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

  const videoCategoryCounts = videos.reduce((acc, v) => {
    acc[v.category] = (acc[v.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topContent = [
    ...news.map((n) => ({ ...n, type: 'Haber' as const })),
    ...videos.map((v) => ({ ...v, type: 'Video' as const })),
  ]
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  const statsCards = [
    { label: 'Toplam Haber', value: news.length, icon: Newspaper, color: 'from-emerald-500 to-green-600', bgColor: 'bg-emerald-50', textColor: 'text-emerald-700' },
    { label: 'Toplam Video', value: videos.length, icon: Video, color: 'from-violet-500 to-purple-600', bgColor: 'bg-violet-50', textColor: 'text-violet-700' },
    { label: 'Toplam Görüntülenme', value: formatViews(total), icon: Eye, color: 'from-sky-500 to-blue-600', bgColor: 'bg-sky-50', textColor: 'text-sky-700' },
    { label: 'Ortalama / İçerik', value: formatViews(Math.round(total / contentCount)), icon: TrendingUp, color: 'from-amber-500 to-orange-600', bgColor: 'bg-amber-50', textColor: 'text-amber-700' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-800">İstatistikler</h2>
        <p className="text-sm text-slate-500 mt-1">Detaylı analiz ve performans metrikleri</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2 text-xs font-semibold text-emerald-600">
                    <ArrowUpRight size={14} />
                    <span>+{Math.floor(Math.random() * 20) + 5}% bu ay</span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Haber Kategorileri */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl">
              <BarChart3 size={20} />
            </div>
            <h3 className="font-bold text-slate-800">Haber Kategorileri</h3>
          </div>
          <div className="space-y-4">
            {Object.entries(categoryCounts).length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Newspaper size={32} className="text-slate-400" />
                </div>
                <p className="text-slate-500 text-sm">Henüz haber verisi yok</p>
              </div>
            ) : (
              Object.entries(categoryCounts)
                .sort((a, b) => b[1] - a[1])
                .map(([cat, count], idx) => {
                  const colors = ['bg-emerald-500', 'bg-green-500', 'bg-teal-500', 'bg-cyan-500', 'bg-sky-500'];
                  return (
                    <div key={cat}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-slate-700">{cat}</span>
                        <span className="text-slate-500">{count} haber</span>
                      </div>
                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${colors[idx % colors.length]} rounded-full transition-all duration-500`}
                          style={{ width: `${(count / (news.length || 1)) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        </div>

        {/* Video Kategorileri */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="p-2.5 bg-violet-50 text-violet-700 rounded-xl">
              <Video size={20} />
            </div>
            <h3 className="font-bold text-slate-800">Video Kategorileri</h3>
          </div>
          <div className="space-y-4">
            {Object.entries(videoCategoryCounts).length === 0 ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Video size={32} className="text-slate-400" />
                </div>
                <p className="text-slate-500 text-sm">Henüz video verisi yok</p>
              </div>
            ) : (
              Object.entries(videoCategoryCounts)
                .sort((a, b) => b[1] - a[1])
                .map(([cat, count], idx) => {
                  const colors = ['bg-violet-500', 'bg-purple-500', 'bg-fuchsia-500', 'bg-pink-500', 'bg-rose-500'];
                  return (
                    <div key={cat}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium text-slate-700">{cat}</span>
                        <span className="text-slate-500">{count} video</span>
                      </div>
                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${colors[idx % colors.length]} rounded-full transition-all duration-500`}
                          style={{ width: `${(count / (videos.length || 1)) * 100}%` }}
                        />
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        </div>
      </div>

      {/* En Çok İzlenen İçerikler */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div className="p-2.5 bg-amber-50 text-amber-700 rounded-xl">
              <Trophy size={20} />
            </div>
            <h3 className="font-bold text-slate-800">En Popüler İçerikler</h3>
          </div>
          <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
            Top 10
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                <th className="pb-3 pl-2">#</th>
                <th className="pb-3">İçerik</th>
                <th className="pb-3">Tip</th>
                <th className="pb-3">Kategori</th>
                <th className="pb-3 text-right pr-2">Görüntülenme</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {topContent.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500 text-sm">
                    Henüz içerik verisi yok
                  </td>
                </tr>
              ) : (
                topContent.map((item, i) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="py-3 pl-2">
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                        i < 3 
                          ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white' 
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
                      </span>
                    </td>
                    <td className="py-3">
                      <p className="text-sm font-semibold text-slate-800 truncate max-w-md group-hover:text-emerald-700 transition-colors">
                        {item.title}
                      </p>
                    </td>
                    <td className="py-3">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        item.type === 'Haber' 
                          ? 'bg-emerald-50 text-emerald-700' 
                          : 'bg-violet-50 text-violet-700'
                      }`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className="text-sm text-slate-600">{item.category}</span>
                    </td>
                    <td className="py-3 text-right pr-2">
                      <span className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-700">
                        <Eye size={14} className="text-slate-400" />
                        {formatViews(item.views)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Aktivite Özeti */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl p-5 text-white shadow-lg shadow-emerald-500/20">
          <div className="flex items-center gap-3 mb-3">
            <Calendar size={20} className="text-emerald-100" />
            <span className="font-semibold text-emerald-50">Bu Ay</span>
          </div>
          <p className="text-3xl font-bold">{news.filter(n => new Date(n.createdAt).getMonth() === new Date().getMonth()).length + videos.filter(v => new Date(v.createdAt).getMonth() === new Date().getMonth()).length}</p>
          <p className="text-sm text-emerald-100 mt-1">yeni içerik eklendi</p>
        </div>
        <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-5 text-white shadow-lg shadow-violet-500/20">
          <div className="flex items-center gap-3 mb-3">
            <Activity size={20} className="text-violet-100" />
            <span className="font-semibold text-violet-50">Aktif İçerik</span>
          </div>
          <p className="text-3xl font-bold">{news.filter(n => n.status === 'yayinda').length + videos.filter(v => v.status === 'yayinda').length}</p>
          <p className="text-sm text-violet-100 mt-1">yayında</p>
        </div>
        <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-5 text-white shadow-lg shadow-sky-500/20">
          <div className="flex items-center gap-3 mb-3">
            <Clock size={20} className="text-sky-100" />
            <span className="font-semibold text-sky-50">Son Güncelleme</span>
          </div>
          <p className="text-lg font-bold truncate">
            {news.length > 0 || videos.length > 0 
              ? new Date(Math.max(...news.map(n => new Date(n.createdAt).getTime()), ...videos.map(v => new Date(v.createdAt).getTime()))).toLocaleDateString('tr-TR')
              : '—'
            }
          </p>
          <p className="text-sm text-sky-100 mt-1">tarihinde</p>
        </div>
      </div>
    </div>
  );
}
