'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { Menu, Search, UserCheck, UserX, Shield, User } from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  reportsCount: number;
  joinedDate: string;
}

const sampleUsers: UserData[] = [
  { id: '1', name: 'Rajesh Kumar', email: 'rajesh@example.com', role: 'Citizen', status: 'active', reportsCount: 12, joinedDate: '2024-06-15' },
  { id: '2', name: 'Priya Singh', email: 'priya@example.com', role: 'Citizen', status: 'active', reportsCount: 8, joinedDate: '2024-07-20' },
  { id: '3', name: 'Amit Patel', email: 'amit@example.com', role: 'Citizen', status: 'active', reportsCount: 15, joinedDate: '2024-05-10' },
  { id: '4', name: 'Sanjay Desai', email: 'sanjay@example.com', role: 'Citizen', status: 'inactive', reportsCount: 5, joinedDate: '2024-08-05' },
  { id: '5', name: 'Neha Sharma', email: 'neha@example.com', role: 'Citizen', status: 'active', reportsCount: 20, joinedDate: '2024-04-12' },
];

export default function UsersPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [adminRole, setAdminRole] = useState('');
  const [adminUsername, setAdminUsername] = useState('');
  const [users, setUsers] = useState<UserData[]>(sampleUsers);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const authState = localStorage.getItem('adminAuth');
    const role = localStorage.getItem('adminRole');
    const username = localStorage.getItem('adminUsername');

    if (authState === 'true' && role && username) {
      setAdminRole(role);
      setAdminUsername(username);
    } else {
      router.push('/admin/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminRole');
    localStorage.removeItem('adminUsername');
    router.push('/admin/login');
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        adminRole={adminRole}
        adminUsername={adminUsername}
        onLogout={handleLogout}
        active="users"
      />

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
                <p className="text-sm text-gray-600">Manage platform users</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-2">
                <User className="w-8 h-8 text-gray-600" />
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <p className="text-sm text-gray-600">Total Users</p>
            </div>

            <div className="bg-white rounded-lg border border-green-200 p-5">
              <div className="flex items-center gap-3 mb-2">
                <UserCheck className="w-8 h-8 text-green-600" />
                <p className="text-2xl font-bold text-green-700">{stats.active}</p>
              </div>
              <p className="text-sm text-gray-600">Active Users</p>
            </div>

            <div className="bg-white rounded-lg border border-red-200 p-5">
              <div className="flex items-center gap-3 mb-2">
                <UserX className="w-8 h-8 text-red-600" />
                <p className="text-2xl font-bold text-red-700">{stats.inactive}</p>
              </div>
              <p className="text-sm text-gray-600">Inactive Users</p>
            </div>
          </div>

          {/* Search */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">User</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Role</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Reports</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                          <span className="font-medium text-gray-900">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{user.email}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{user.reportsCount}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{user.joinedDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
