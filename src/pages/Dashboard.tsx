import { useEffect, useState } from 'react';
import {
  Newspaper,
  Video,
  Eye,
  Users,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Trophy,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { NewsItem, VideoItem } from '../types';
import { getNews, getVideos } from '../data/storage';

function formatViews(n: number) {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.0', '') + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'B';
  return n.toLocaleString('tr-TR');
}

export default function Dashboard() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);

  useEffect(() => {
    setNews(getNews());
    setVideos(getVideos());
  }, []);

  const totalViews =
    news.reduce((s, n) => s + n.views, 0) + videos.reduce((s, v) => s + v.views, 0);
  const publishedNews = news.filter((n) => n.status === 'yayinda').length;
  const publishedVideos = videos.filter((v) => v.status === 'yayinda').length;

  const stats = [
    {
      label: 'Toplam Haber',
      value: news.length,
      sub: `${publishedNews} yayında`,
      change: '+12%',
      up: true,
      icon: Newspaper,
      color: 'bg-emerald-500',
    },
    {
      label: 'Toplam Video',
      value: videos.length,
      sub: `${publishedVideos} yayında`,
      change: '+8%',
      up: true,
      icon: Video,
      color: 'bg-violet-500',
    },
    {
      label: 'Toplam Görüntülenme',
      value: formatViews(totalViews),
      sub: 'Tüm içerikler',
      change: '+23%',
      up: true,
      icon: Eye,
      color: 'bg-sky-500',
    },
    {
      label: 'Aktif Yayın',
      value: publishedNews + publishedVideos,
      sub: 'Canlı içerik',
      change: '+5%',
      up: true,
      icon: Trophy,
      color: 'bg-amber-500',
    },
  ];

  const recentNews = news.slice(0, 4);
  const recentVideos = videos.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-green-600 rounded-2xl p-6 text-white shadow-lg shadow-emerald-600/20">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-1">Hoş geldiniz 👋</h2>
            <p className="text-emerald-100 text-sm">
              {new Date().toLocaleDateString('tr-TR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              · skdesignsx yönetim paneli
            </p>
          </div>
          <Trophy className="w-10 h-10 text-emerald-200/80 hidden sm:block" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{stat.sub}</p>
                  <div
                    className={`flex items-center gap-1 mt-2 text-xs font-medium ${
                      stat.up ? 'text-emerald-600' : 'text-red-500'
                    }`}
                  >
                    {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {stat.change} geçen aya göre
                  </div>
                </div>
                <div className={`${stat.color} p-3 rounded-xl text-white`}>
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">Son Haberler</h3>
            <Link to="/admin/haberler" className="text-sm text-emerald-700 hover:text-emerald-800 font-medium">
              Tümünü Gör
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {recentNews.map((n) => (
              <div key={n.id} className="flex items-center gap-4 p-4 hover:bg-slate-50 transition">
                <img src={n.imageUrl} alt="" className="w-16 h-12 object-cover rounded-lg shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{n.title}</p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                    <span className="bg-slate-100 px-2 py-0.5 rounded">{n.category}</span>
                    <span className="flex items-center gap-1">
                      <Eye size={12} /> {formatViews(n.views)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {new Date(n.createdAt).toLocaleDateString('tr-TR')}
                    </span>
                  </div>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ${
                    n.status === 'yayinda'
                      ? 'bg-emerald-50 text-emerald-700'
                      : n.status === 'taslak'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {n.status === 'yayinda' ? 'Yayında' : n.status === 'taslak' ? 'Taslak' : 'Arşiv'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">Son Videolar</h3>
            <Link to="/admin/videolar" className="text-sm text-emerald-700 hover:text-emerald-800 font-medium">
              Tümünü Gör
            </Link>
          </div>
          <div className="p-4 space-y-4">
            {recentVideos.map((v) => (
              <div key={v.id} className="flex gap-3">
                <div className="relative shrink-0">
                  <img src={v.thumbnailUrl} alt="" className="w-24 h-14 object-cover rounded-lg" />
                  <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1 rounded">
                    {v.duration}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-800 line-clamp-2">{v.title}</p>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <Eye size={12} /> {formatViews(v.views)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/admin/haberler/yeni"
          className="flex items-center gap-4 bg-white rounded-xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition group"
        >
          <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl group-hover:bg-emerald-100 transition">
            <Newspaper size={24} />
          </div>
          <div>
            <p className="font-semibold text-slate-800">Yeni Haber Ekle</p>
            <p className="text-sm text-slate-500">Transfer, maç, analiz yazısı yayınla</p>
          </div>
        </Link>
        <Link
          to="/admin/videolar/yeni"
          className="flex items-center gap-4 bg-white rounded-xl p-5 border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition group"
        >
          <div className="p-3 bg-violet-50 text-violet-700 rounded-xl group-hover:bg-violet-100 transition">
            <Video size={24} />
          </div>
          <div>
            <p className="font-semibold text-slate-800">Yeni Video Ekle</p>
            <p className="text-sm text-slate-500">Maç özeti, röportaj, gol derlemesi</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
