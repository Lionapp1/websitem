import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Clock, ArrowRight, Play, Newspaper, Video, Trophy, Zap } from 'lucide-react';
import type { NewsItem, VideoItem } from '../../types';
import { getPublishedNews, getPublishedVideos } from '../../data/storage';

function formatViews(n: number) {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.0', '') + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'B';
  return n.toLocaleString('tr-TR');
}

export default function Home() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);

  useEffect(() => {
    setNews(getPublishedNews());
    setVideos(getPublishedVideos());
  }, []);

  const featured = news[0];
  const sideNews = news.slice(1, 5);
  const latestVideos = videos.slice(0, 4);

  return (
    <div>
      {/* Top ticker */}
      <div className="bg-emerald-900 text-emerald-100 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center gap-3 overflow-hidden">
          <span className="shrink-0 flex items-center gap-1.5 bg-emerald-500 text-white px-2 py-0.5 rounded font-semibold text-[11px]">
            <Zap size={12} /> CANLI
          </span>
          <div className="truncate">
            Süper Lig · Transfer dönemi · Milli Takım aday kadrosu açıklandı · Derbi cumartesi 20:00
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/50 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Trophy size={18} className="text-emerald-400" />
              <span className="text-emerald-400 text-xs font-semibold tracking-wider uppercase">
                Futbol · Transfer · Analiz
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 tracking-tight">
              Futbolun nabzı<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300">
                skdesignsx
              </span>
              &apos;te
            </h1>
            <p className="text-slate-400 text-base sm:text-lg mb-8 leading-relaxed max-w-lg">
              Transfer bombaları, maç özetleri, taktik analizler ve milli takım. Hepsi tek adreste.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/haberler"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-semibold transition shadow-lg shadow-emerald-600/25"
              >
                <Newspaper size={18} /> Haberler
              </Link>
              <Link
                to="/videolar"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white px-5 py-2.5 rounded-xl font-semibold transition border border-white/15"
              >
                <Video size={18} /> Videolar
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-14">
        {/* Manşet */}
        {featured && (
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="w-1 h-6 bg-emerald-600 rounded-full" />
                Manşet
              </h2>
              <Link to="/haberler" className="text-sm text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1">
                Tümü <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
              <Link
                to={`/haberler/${featured.id}`}
                className="lg:col-span-3 group relative rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] bg-slate-200 shadow-md"
              >
                <img
                  src={featured.imageUrl}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                  <span className="inline-block bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded mb-2 uppercase tracking-wide">
                    {featured.category}
                  </span>
                  <h3 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold leading-snug mb-2 group-hover:text-emerald-200 transition">
                    {featured.title}
                  </h3>
                  <p className="text-slate-300 text-sm line-clamp-2 hidden sm:block mb-3 max-w-xl">
                    {featured.summary}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Eye size={13} /> {formatViews(featured.views)}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} />
                      {new Date(featured.createdAt).toLocaleDateString('tr-TR')}
                    </span>
                    <span className="hidden sm:inline">{featured.source}</span>
                  </div>
                </div>
              </Link>

              <div className="lg:col-span-2 flex flex-col gap-3">
                {sideNews.map((item) => (
                  <Link
                    key={item.id}
                    to={`/haberler/${item.id}`}
                    className="flex gap-3 group bg-white rounded-xl border border-slate-100 p-2.5 hover:border-emerald-200 hover:shadow-sm transition"
                  >
                    <img
                      src={item.imageUrl}
                      alt=""
                      className="w-28 h-20 object-cover rounded-lg shrink-0"
                    />
                    <div className="min-w-0 flex flex-col justify-center">
                      <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide">
                        {item.category}
                      </span>
                      <h4 className="text-sm font-semibold text-slate-800 line-clamp-2 group-hover:text-emerald-800 transition leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                        <span className="flex items-center gap-0.5"><Eye size={11} /> {formatViews(item.views)}</span>
                        <span>{new Date(item.createdAt).toLocaleDateString('tr-TR')}</span>
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Son Haberler */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-1 h-6 bg-emerald-600 rounded-full" />
              Son Haberler
            </h2>
            <Link to="/haberler" className="text-sm text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1">
              Tümü <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {news.slice(0, 6).map((item) => (
              <Link
                key={item.id}
                to={`/haberler/${item.id}`}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md hover:border-emerald-100 transition group"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    {item.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 line-clamp-2 group-hover:text-emerald-800 transition leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1.5 line-clamp-2">{item.summary}</p>
                  <div className="flex items-center gap-3 mt-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Eye size={12} /> {formatViews(item.views)}</span>
                    <span>{new Date(item.createdAt).toLocaleDateString('tr-TR')}</span>
                    <span className="truncate">{item.source}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Videolar */}
        {latestVideos.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="w-1 h-6 bg-emerald-600 rounded-full" />
                Videolar
              </h2>
              <Link to="/videolar" className="text-sm text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1">
                Tümü <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {latestVideos.map((video) => (
                <Link key={video.id} to={`/videolar/${video.id}`} className="group">
                  <div className="relative rounded-xl overflow-hidden aspect-video bg-slate-200 shadow-sm">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/95 flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                        <Play size={20} fill="currentColor" className="text-slate-900 ml-0.5" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[11px] font-medium px-1.5 py-0.5 rounded">
                      {video.duration}
                    </span>
                    <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                      {video.category}
                    </span>
                  </div>
                  <h3 className="mt-2.5 text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-emerald-800 transition">
                    {video.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                    <Eye size={12} /> {formatViews(video.views)} görüntülenme
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
