"use client";
import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import AnalyticsChart from '@/components/AnalyticsChart';
import { useMockAuth } from '@/lib/useMockAuth';

type Issue = {
  id: string;
  title: string;
  status: string;
  category?: string;
  location?: string;
  createdAt?: string;
};

export default function AdminDashboardPage() {
  const { role, setMockRole } = useMockAuth();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchIssues();
  }, []);

  async function fetchIssues() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/issues');
      const data = await res.json();
      setIssues(data.issues || []);
    } finally {
      setLoading(false);
    }
  }

  if (!role) return <div className="p-8">Checking role...</div>;
  if (role !== 'admin' && role !== 'moderator') {
    return (
      <div className="p-8">
        <h2 className="text-xl font-semibold">Access denied</h2>
        <p className="mt-2">You need admin or moderator access to view this page.</p>
        <div className="mt-4">
          <button onClick={() => setMockRole('admin')} className="px-3 py-2 bg-[#00C853] text-white rounded">Switch to Admin (demo)</button>
        </div>
      </div>
    );
  }

  const counts = issues.reduce((acc, i) => {
    acc[i.status] = (acc[i.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const series = [
    { label: 'Open', value: counts['open'] || 0, color: '#FF7043' },
    { label: 'In-Progress', value: counts['in-progress'] || 0, color: '#FFA726' },
    { label: 'Verified', value: counts['verified'] || 0, color: '#42A5F5' },
    { label: 'Resolved', value: counts['resolved'] || 0, color: '#66BB6A' },
  ];

  async function updateStatus(id: string, status: string) {
    const res = await fetch('/api/admin/issues', { method: 'PATCH', body: JSON.stringify({ id, patch: { status } }), headers: { 'Content-Type': 'application/json' } });
    const data = await res.json();
    if (data.issue) {
      setIssues((prev) => prev.map((p) => (p.id === id ? data.issue : p)));
    }
  }

  return (
  <div className="bg-white min-h-screen pt-20 p-6 text-slate-900">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <AdminSidebar active="dashboard" />
        </div>
        <div className="col-span-9">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded border"> 
              <div className="text-sm text-slate-700">Total Issues</div>
              <div className="text-2xl font-bold">{issues.length}</div>
            </div>
            <div className="bg-white p-4 rounded border">
              <div className="text-sm text-slate-700">Open</div>
              <div className="text-2xl font-bold">{counts['open'] || 0}</div>
            </div>
            <div className="bg-white p-4 rounded border">
              <div className="text-sm text-slate-700">Resolved</div>
              <div className="text-2xl font-bold">{counts['resolved'] || 0}</div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Issue Trends</h3>
            <AnalyticsChart series={series} />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Recent Issues</h3>
            <div className="space-y-3">
              {loading && <div>Loading...</div>}
              {!loading && issues.map((issue) => (
                <div key={issue.id} className="bg-white rounded p-4 border flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{issue.title}</div>
                    <div className="text-xs text-slate-600">{issue.category} • {issue.location} • {new Date(issue.createdAt || '').toLocaleDateString()}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1 rounded text-sm bg-slate-100">{issue.status}</div>
                    <button onClick={() => updateStatus(issue.id, 'verified')} className="px-3 py-1 bg-[#00C853] text-white rounded text-sm">Verify</button>
                    <button onClick={() => updateStatus(issue.id, 'resolved')} className="px-3 py-1 bg-[#2979FF] text-white rounded text-sm">Mark Resolved</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
