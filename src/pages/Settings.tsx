import { useState } from 'react';
import { Save, Globe, Bell, Shield, User, Key } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Settings() {
  const { credentials, updateCredentials } = useAuth();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    displayName: credentials.displayName,
    email: credentials.email,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [pwdError, setPwdError] = useState('');

  const handleSaveProfile = () => {
    if (!form.email.trim() || !form.displayName.trim()) {
      alert('Ad ve e-posta zorunludur.');
      return;
    }
    updateCredentials({
      displayName: form.displayName.trim(),
      email: form.email.trim(),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleChangePassword = () => {
    setPwdError('');
    if (form.currentPassword !== credentials.password) {
      setPwdError('Mevcut şifre hatalı.');
      return;
    }
    if (form.newPassword.length < 6) {
      setPwdError('Yeni şifre en az 6 karakter olmalı.');
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setPwdError('Yeni şifreler eşleşmiyor.');
      return;
    }
    updateCredentials({ password: form.newPassword });
    setForm((f) => ({ ...f, currentPassword: '', newPassword: '', confirmPassword: '' }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-5">
          <User size={18} /> Hesap Bilgileri
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Görünen Ad</label>
            <input
              value={form.displayName}
              onChange={(e) => setForm({ ...form, displayName: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">E-posta (giriş için)</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 outline-none text-sm"
            />
          </div>
          <button
            onClick={handleSaveProfile}
            className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition"
          >
            <Save size={16} /> {saved ? 'Kaydedildi!' : 'Profili Kaydet'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-5">
          <Key size={18} /> Şifre Değiştir
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Mevcut Şifre</label>
            <input
              type="password"
              value={form.currentPassword}
              onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Yeni Şifre</label>
            <input
              type="password"
              value={form.newPassword}
              onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Yeni Şifre (Tekrar)</label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 outline-none text-sm"
            />
          </div>
          {pwdError && <p className="text-sm text-red-600">{pwdError}</p>}
          <button
            onClick={handleChangePassword}
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition"
          >
            <Shield size={16} /> Şifreyi Güncelle
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-5">
          <Globe size={18} /> Site Ayarları
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Site Adı</label>
            <input
              defaultValue="skdesignsx"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 outline-none text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Açıklama</label>
            <textarea
              defaultValue="Güncel haberler, videolar ve medya ağı."
              rows={2}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 outline-none text-sm resize-none"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-5">
          <Bell size={18} /> Bildirimler
        </h3>
        <div className="space-y-3">
          {['Yeni içerik yayınlandığında bildirim', 'Haftalık özet raporu', 'Sistem uyarıları'].map(
            (label) => (
              <label key={label} className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-slate-700">{label}</span>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary-600" />
              </label>
            )
          )}
        </div>
      </div>
    </div>
  );
}
