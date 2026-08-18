import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Public
import PublicLayout from './layouts/PublicLayout';
import NewsListPublic from './pages/public/NewsListPublic';
import NewsDetailPublic from './pages/public/NewsDetailPublic';
import VideosListPublic from './pages/public/VideosListPublic';
import VideoDetailPublic from './pages/public/VideoDetailPublic';

// Admin
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NewsList from './pages/NewsList';
import NewsForm from './pages/NewsForm';
import NewsDetail from './pages/NewsDetail';
import VideoList from './pages/VideoList';
import VideoForm from './pages/VideoForm';
import VideoDetail from './pages/VideoDetail';
import Stats from './pages/Stats';
import Users from './pages/Users';
import Settings from './pages/Settings';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public site - redirect root to news */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Navigate to="/haberler" replace />} />
            <Route path="/haberler" element={<NewsListPublic />} />
            <Route path="/haberler/:id" element={<NewsDetailPublic />} />
            <Route path="/videolar" element={<VideosListPublic />} />
            <Route path="/videolar/:id" element={<VideoDetailPublic />} />
          </Route>

          {/* Admin login (no layout) */}
          <Route path="/admin/login" element={<Login />} />

          {/* Admin panel (protected) */}
          <Route path="/admin" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="haberler" element={<NewsList />} />
            <Route path="haberler/yeni" element={<NewsForm />} />
            <Route path="haberler/duzenle/:id" element={<NewsForm />} />
            <Route path="haberler/:id" element={<NewsDetail />} />
            <Route path="videolar" element={<VideoList />} />
            <Route path="videolar/yeni" element={<VideoForm />} />
            <Route path="videolar/duzenle/:id" element={<VideoForm />} />
            <Route path="videolar/:id" element={<VideoDetail />} />
            <Route path="istatistikler" element={<Stats />} />
            <Route path="kullanicilar" element={<Users />} />
            <Route path="ayarlar" element={<Settings />} />
          </Route>

          {/* Fallback - redirect to news page as main */}
          <Route path="*" element={<Navigate to="/haberler" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
