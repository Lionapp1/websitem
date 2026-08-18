import type { NewsItem, VideoItem } from '../types';
import { initialNews, initialVideos } from './mockData';

const NEWS_KEY = 'skdx_news';
const VIDEOS_KEY = 'skdx_videos';

function migrateNews(list: any[]): NewsItem[] {
  return list.map((n) => ({
    ...n,
    source: n.source || n.author || 'SK Designs X',
  }));
}

function migrateVideos(list: any[]): VideoItem[] {
  return list.map((v) => ({
    ...v,
    source: v.source || v.author || 'SK Designs X',
  }));
}

export function getNews(): NewsItem[] {
  const stored = localStorage.getItem(NEWS_KEY) || localStorage.getItem('admin_news');
  if (stored) {
    try {
      const parsed = migrateNews(JSON.parse(stored));
      localStorage.setItem(NEWS_KEY, JSON.stringify(parsed));
      return parsed;
    } catch {
      return initialNews;
    }
  }
  localStorage.setItem(NEWS_KEY, JSON.stringify(initialNews));
  return initialNews;
}

export function saveNews(list: NewsItem[]) {
  localStorage.setItem(NEWS_KEY, JSON.stringify(list));
}

export function getPublishedNews(): NewsItem[] {
  return getNews().filter((n) => n.status === 'yayinda');
}

export function getNewsById(id: string): NewsItem | undefined {
  return getNews().find((n) => n.id === id);
}

export function getVideos(): VideoItem[] {
  const stored = localStorage.getItem(VIDEOS_KEY) || localStorage.getItem('admin_videos');
  if (stored) {
    try {
      const parsed = migrateVideos(JSON.parse(stored));
      localStorage.setItem(VIDEOS_KEY, JSON.stringify(parsed));
      return parsed;
    } catch {
      return initialVideos;
    }
  }
  localStorage.setItem(VIDEOS_KEY, JSON.stringify(initialVideos));
  return initialVideos;
}

export function saveVideos(list: VideoItem[]) {
  localStorage.setItem(VIDEOS_KEY, JSON.stringify(list));
}

export function getPublishedVideos(): VideoItem[] {
  return getVideos().filter((v) => v.status === 'yayinda');
}

export function getVideoById(id: string): VideoItem | undefined {
  return getVideos().find((v) => v.id === id);
}
