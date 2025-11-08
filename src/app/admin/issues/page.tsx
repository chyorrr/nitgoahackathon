'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { Menu, Search, Filter, Download, Eye, CheckCircle, XCircle } from 'lucide-react';

interface Issue {
  id: string;
  title: string;
  category: string;
  location: string;
  status: 'pending' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high' | 'critical';
  reportedBy: string;
  date: string;
  upvotes: number;
}

const sampleIssues: Issue[] = [
  { id: '1', title: 'Large pothole on MG Road', category: 'Potholes', location: 'MG Road', status: 'pending', priority: 'high', reportedBy: 'Rajesh Kumar', date: '2024-11-08', upvotes: 142 },
  { id: '2', title: 'Street light not working', category: 'Street Lights', location: 'Panjim Circle', status: 'in-progress', priority: 'medium', reportedBy: 'Priya Singh', date: '2024-11-08', upvotes: 87 },
  { id: '3', title: 'Garbage pile near park', category: 'Garbage', location: 'Campal Gardens', status: 'pending', priority: 'critical', reportedBy: 'Amit Patel', date: '2024-11-07', upvotes: 203 },
  { id: '4', title: 'Broken water pipe', category: 'Infrastructure', location: 'Miramar Beach Road', status: 'resolved', priority: 'high', reportedBy: 'Sanjay Desai', date: '2024-11-06', upvotes: 156 },
  { id: '5', title: 'Illegal parking on sidewalk', category: 'Traffic', location: 'Dona Paula', status: 'pending', priority: 'low', reportedBy: 'Neha Sharma', date: '2024-11-08', upvotes: 45 },
];

export default function IssuesPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [adminRole, setAdminRole] = useState('');
  const [adminUsername, setAdminUsername] = useState('');
  const [issues, setIssues] = useState<Issue[]>(sampleIssues);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

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

  const handleStatusChange = (issueId: string, newStatus: 'pending' | 'in-progress' | 'resolved') => {
    setIssues(issues.map(issue => 
      issue.id === issueId ? { ...issue, status: newStatus } : issue
    ));
  };

  const filteredIssues = issues.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         issue.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || issue.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        adminRole={adminRole}
        adminUsername={adminUsername}
        onLogout={handleLogout}
        active="issues"
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
                <h1 className="text-2xl font-bold text-gray-900">Issues Management</h1>
                <p className="text-sm text-gray-600">View and manage reported issues</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Filters */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search issues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent outline-none"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent outline-none"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>

          {/* Issues Table */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Issue</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Location</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Priority</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Upvotes</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredIssues.map((issue) => (
                    <tr key={issue.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-gray-900">{issue.title}</p>
                          <p className="text-sm text-gray-600">{issue.reportedBy}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">{issue.category}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{issue.location}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          issue.priority === 'critical' ? 'bg-red-100 text-red-700' :
                          issue.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                          issue.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {issue.priority}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={issue.status}
                          onChange={(e) => handleStatusChange(issue.id, e.target.value as any)}
                          className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-gray-500 outline-none"
                        >
                          <option value="pending">Pending</option>
                          <option value="in-progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{issue.upvotes}</td>
                      <td className="px-4 py-3">
                        <button className="p-2 hover:bg-gray-100 rounded-lg">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                      </td>
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
