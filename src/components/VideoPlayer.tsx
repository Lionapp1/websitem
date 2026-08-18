import { toEmbedUrl, isDirectVideo } from '../utils/media';

interface Props {
  url: string;
  title?: string;
  className?: string;
}

export default function VideoPlayer({ url, title = 'Video', className = '' }: Props) {
  const embed = toEmbedUrl(url);

  if (!embed) {
    return (
      <div className={`bg-slate-900 flex items-center justify-center text-slate-400 text-sm ${className}`}>
        Video URL bulunamadı
      </div>
    );
  }

  if (isDirectVideo(embed)) {
    return (
      <video
        src={embed}
        controls
        className={`w-full h-full object-contain bg-black ${className}`}
        title={title}
      />
    );
  }

  return (
    <iframe
      src={embed}
      title={title}
      className={`w-full h-full ${className}`}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}
