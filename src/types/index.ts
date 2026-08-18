export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  imageUrl: string;
  source: string;
  status: 'yayinda' | 'taslak' | 'arsiv';
  createdAt: string;
  updatedAt: string;
  views: number;
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
  category: string;
  source: string;
  status: 'yayinda' | 'taslak' | 'arsiv';
  createdAt: string;
  updatedAt: string;
  views: number;
}

export interface AdminCredentials {
  email: string;
  password: string;
  displayName: string;
}
