import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '../contexts/AuthContext';

const titles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/haberler': 'Haber Yönetimi',
  '/admin/haberler/yeni': 'Yeni Haber Ekle',
  '/admin/videolar': 'Video Yönetimi',
  '/admin/videolar/yeni': 'Yeni Video Ekle',
  '/admin/istatistikler': 'İstatistikler',
  '/admin/kullanicilar': 'Kullanıcı Yönetimi',
  '/admin/ayarlar': 'Ayarlar',
};

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const title =
    titles[location.pathname] ||
    (location.pathname.includes('/haberler/duzenle')
      ? 'Haberi Düzenle'
      : location.pathname.includes('/haberler/')
      ? 'Haber Detayı'
      : location.pathname.includes('/videolar/duzenle')
      ? 'Videoyu Düzenle'
      : location.pathname.includes('/videolar/')
      ? 'Video Detayı'
      : 'Yönetim Paneli');

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div
        className={`
          transition-all duration-300
          ${collapsed ? 'lg:ml-[72px]' : 'lg:ml-64'}
        `}
      >
        <Header setMobileOpen={setMobileOpen} title={title} />
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
