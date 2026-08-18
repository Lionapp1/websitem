import { Mail, Shield, MoreVertical, Plus, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

const initialUsers = [
  { id: 1, name: 'Admin Kullanıcı', email: 'admin@skdesignsx.com', role: 'Süper Admin', status: 'aktif', avatar: 'AY' },
  { id: 2, name: 'Ayşe Yılmaz', email: 'ayse@skdesignsx.com', role: 'Editör', status: 'aktif', avatar: 'AY' },
  { id: 3, name: 'Mehmet Demir', email: 'mehmet@skdesignsx.com', role: 'Editör', status: 'aktif', avatar: 'MD' },
  { id: 4, name: 'Zeynep Kaya', email: 'zeynep@skdesignsx.com', role: 'Yazar', status: 'aktif', avatar: 'ZK' },
  { id: 5, name: 'Ali Çelik', email: 'ali@skdesignsx.com', role: 'Yazar', status: 'pasif', avatar: 'AÇ' },
];

export default function Users() {
  const [users, setUsers] = useState(initialUsers);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setEditingUser(null);
    setShowModal(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Kullanıcılar</h2>
          <p className="text-sm text-slate-500 mt-1">
            Toplam <span className="font-semibold text-slate-700">{users.length}</span> kullanıcı yönetin
          </p>
        </div>
        <button 
          onClick={handleAddNew}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition shadow-lg shadow-emerald-600/20 flex items-center gap-2"
        >
          <Plus size={18} /> Yeni Kullanıcı
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-slate-50 to-slate-50/50 text-left text-slate-600 border-b border-slate-100">
                <th className="px-6 py-4 font-semibold">Kullanıcı</th>
                <th className="px-6 py-4 font-semibold hidden sm:table-cell">E-posta</th>
                <th className="px-6 py-4 font-semibold">Rol</th>
                <th className="px-6 py-4 font-semibold">Durum</th>
                <th className="px-6 py-4 font-semibold text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center text-white text-sm font-bold shadow-md">
                        {u.avatar}
                      </div>
                      <span className="font-semibold text-slate-800">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <span className="flex items-center gap-2 text-slate-600">
                      <Mail size={15} className="text-slate-400" /> {u.email}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-2 text-slate-600">
                      <Shield size={15} className="text-slate-400" /> 
                      <span className="font-medium">{u.role}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        u.status === 'aktif'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}
                    >
                      {u.status === 'aktif' ? '✓ Aktif' : '○ Pasif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEdit(u)}
                        className="p-2 rounded-lg hover:bg-blue-50 text-slate-500 hover:text-blue-600 transition"
                        title="Düzenle"
                      >
                        <Pencil size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(u.id)}
                        className="p-2 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-600 transition"
                        title="Sil"
                      >
                        <Trash2 size={16} />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition lg:hidden">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              {editingUser ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı Ekle'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Ad Soyad</label>
                <input 
                  type="text" 
                  defaultValue={editingUser?.name}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
                  placeholder="Örn: Ahmet Yılmaz"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">E-posta</label>
                <input 
                  type="email" 
                  defaultValue={editingUser?.email}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
                  placeholder="ornek@skdesignsx.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Rol</label>
                <select 
                  defaultValue={editingUser?.role || 'Yazar'}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
                >
                  <option value="Süper Admin">Süper Admin</option>
                  <option value="Editör">Editör</option>
                  <option value="Yazar">Yazar</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Durum</label>
                <select 
                  defaultValue={editingUser?.status || 'aktif'}
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition"
                >
                  <option value="aktif">Aktif</option>
                  <option value="pasif">Pasif</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-slate-700 font-medium hover:bg-slate-50 transition"
              >
                İptal
              </button>
              <button 
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition shadow-lg shadow-emerald-600/20"
              >
                {editingUser ? 'Güncelle' : 'Ekle'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
