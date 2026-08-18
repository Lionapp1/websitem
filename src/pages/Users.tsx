import { Users as UsersIcon, Mail, Shield, MoreVertical } from 'lucide-react';

const users = [
  { id: 1, name: 'Admin Kullanıcı', email: 'admin@medya.com', role: 'Süper Admin', status: 'aktif', avatar: 'AY' },
  { id: 2, name: 'Ayşe Yılmaz', email: 'ayse@medya.com', role: 'Editör', status: 'aktif', avatar: 'AY' },
  { id: 3, name: 'Mehmet Demir', email: 'mehmet@medya.com', role: 'Editör', status: 'aktif', avatar: 'MD' },
  { id: 4, name: 'Zeynep Kaya', email: 'zeynep@medya.com', role: 'Yazar', status: 'aktif', avatar: 'ZK' },
  { id: 5, name: 'Ali Çelik', email: 'ali@medya.com', role: 'Yazar', status: 'pasif', avatar: 'AÇ' },
];

export default function Users() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Toplam <span className="font-semibold text-slate-800">{users.length}</span> kullanıcı
        </p>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition">
          + Yeni Kullanıcı
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-slate-500 border-b border-slate-100">
              <th className="px-5 py-3 font-medium">Kullanıcı</th>
              <th className="px-5 py-3 font-medium hidden sm:table-cell">E-posta</th>
              <th className="px-5 py-3 font-medium">Rol</th>
              <th className="px-5 py-3 font-medium">Durum</th>
              <th className="px-5 py-3 font-medium text-right">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50/80">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-xs font-semibold">
                      {u.avatar}
                    </div>
                    <span className="font-medium text-slate-800">{u.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 hidden sm:table-cell text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <Mail size={14} className="text-slate-400" /> {u.email}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <span className="flex items-center gap-1.5 text-slate-600">
                    <Shield size={14} className="text-slate-400" /> {u.role}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      u.status === 'aktif'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {u.status === 'aktif' ? 'Aktif' : 'Pasif'}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <button className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
