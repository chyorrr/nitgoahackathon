'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { Menu, TrendingUp, TrendingDown, BarChart3, PieChart } from 'lucide-react';

export default function AnalyticsPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [adminRole, setAdminRole] = useState('');
  const [adminUsername, setAdminUsername] = useState('');

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

  const categoryStats = [
    { category: 'Potholes', count: 45, percentage: 35 },
    { category: 'Street Lights', count: 32, percentage: 25 },
    { category: 'Garbage', count: 28, percentage: 22 },
    { category: 'Infrastructure', count: 15, percentage: 12 },
    { category: 'Traffic', count: 8, percentage: 6 },
  ];

  const monthlyTrends = [
    { month: 'Jun', reported: 85, resolved: 72 },
    { month: 'Jul', reported: 92, resolved: 78 },
    { month: 'Aug', reported: 78, resolved: 85 },
    { month: 'Sep', reported: 95, resolved: 82 },
    { month: 'Oct', reported: 110, resolved: 95 },
    { month: 'Nov', reported: 128, resolved: 68 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        adminRole={adminRole}
        adminUsername={adminUsername}
        onLogout={handleLogout}
        active="analytics"
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
                <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
                <p className="text-sm text-gray-600">Performance metrics and trends</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <TrendingUp className="w-8 h-8 text-green-600" />
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">+12%</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">87.5%</p>
              <p className="text-sm text-gray-600">Resolution Rate</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <BarChart3 className="w-8 h-8 text-blue-600" />
                <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">+8%</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">2.4 days</p>
              <p className="text-sm text-gray-600">Avg Response Time</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <PieChart className="w-8 h-8 text-purple-600" />
                <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">+15%</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">128</p>
              <p className="text-sm text-gray-600">Monthly Reports</p>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <TrendingDown className="w-8 h-8 text-orange-600" />
                <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full">-5%</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">60</p>
              <p className="text-sm text-gray-600">Pending Issues</p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Category Distribution */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Issues by Category</h2>
              <div className="space-y-4">
                {categoryStats.map((stat) => (
                  <div key={stat.category}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{stat.category}</span>
                      <span className="text-sm font-bold text-gray-900">{stat.count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gray-900 h-2 rounded-full"
                        style={{ width: `${stat.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Trends */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Monthly Trends</h2>
              <div className="space-y-3">
                {monthlyTrends.map((trend) => (
                  <div key={trend.month} className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-600 w-12">{trend.month}</span>
                    <div className="flex-1">
                      <div className="flex gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                          <div
                            className="bg-red-500 h-full rounded-full flex items-center justify-end pr-2"
                            style={{ width: `${(trend.reported / 130) * 100}%` }}
                          >
                            <span className="text-xs font-medium text-white">{trend.reported}</span>
                          </div>
                        </div>
                        <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                          <div
                            className="bg-green-500 h-full rounded-full flex items-center justify-end pr-2"
                            style={{ width: `${(trend.resolved / 130) * 100}%` }}
                          >
                            <span className="text-xs font-medium text-white">{trend.resolved}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">Reported</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">Resolved</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Performance Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-gray-600 mb-1">Total Resolved</p>
                <p className="text-2xl font-bold text-green-700">480</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-sm text-gray-600 mb-1">In Progress</p>
                <p className="text-2xl font-bold text-yellow-700">68</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm text-gray-600 mb-1">Pending</p>
                <p className="text-2xl font-bold text-red-700">60</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
