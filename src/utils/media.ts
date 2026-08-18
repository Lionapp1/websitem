/**
 * Converts common video share URLs into embeddable iframe src URLs.
 * Supports: YouTube (watch, youtu.be, shorts), Vimeo, and direct mp4/webm links.
 */
export function toEmbedUrl(url: string): string {
  if (!url || !url.trim()) return '';
  const u = url.trim();

  // Already embed
  if (u.includes('youtube.com/embed/') || u.includes('player.vimeo.com/')) {
    return u;
  }

  // YouTube watch?v=
  const ytWatch = u.match(/(?:youtube\.com\/watch\?v=|youtube\.com\/watch\?.+&v=)([a-zA-Z0-9_-]{11})/);
  if (ytWatch) return `https://www.youtube.com/embed/${ytWatch[1]}`;

  // youtu.be/
  const ytShort = u.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (ytShort) return `https://www.youtube.com/embed/${ytShort[1]}`;

  // YouTube shorts
  const ytShorts = u.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (ytShorts) return `https://www.youtube.com/embed/${ytShorts[1]}`;

  // Vimeo
  const vimeo = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;

  // Direct video file – return as-is (will use <video> tag)
  if (/\.(mp4|webm|ogg)(\?|$)/i.test(u)) return u;

  // Fallback: return original
  return u;
}

export function isDirectVideo(url: string): boolean {
  return /\.(mp4|webm|ogg)(\?|$)/i.test(url || '');
}

/** Safe image URL or placeholder */
export function safeImageUrl(url: string | undefined, fallback?: string): string {
  if (url && (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:'))) {
    return url;
  }
  return fallback || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80';
}
