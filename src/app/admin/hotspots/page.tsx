'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import dynamic from 'next/dynamic';
import { Menu, MapPin, TrendingUp } from 'lucide-react';

const AdminHotspotMap = dynamic(() => import('@/components/AdminHotspotMap'), { ssr: false });

const sampleIssues = [
  {
    id: '1',
    title: 'Large pothole on MG Road',
    description: 'Large pothole causing traffic disruption',
    category: 'Potholes',
    location: 'MG Road',
    coordinates: { lat: 15.4909, lng: 73.8278 },
    status: 'pending',
    priority: 'high',
    reportedBy: 'Rajesh Kumar',
    reporter: 'Rajesh Kumar',
    date: '2024-11-08',
    upvotes: 142
  },
  {
    id: '2',
    title: 'Street light not working',
    description: 'Street light fixture broken',
    category: 'Street Lights',
    location: 'Panjim Circle',
    coordinates: { lat: 15.4989, lng: 73.8245 },
    status: 'in-progress',
    priority: 'medium',
    reportedBy: 'Priya Singh',
    reporter: 'Priya Singh',
    date: '2024-11-08',
    upvotes: 87
  },
  {
    id: '3',
    title: 'Garbage pile near park',
    description: 'Large pile of uncollected garbage',
    category: 'Garbage',
    location: 'Campal Gardens',
    coordinates: { lat: 15.4850, lng: 73.8200 },
    status: 'pending',
    priority: 'critical',
    reportedBy: 'Amit Patel',
    reporter: 'Amit Patel',
    date: '2024-11-07',
    upvotes: 203
  },
];

export default function HotspotsPage() {
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

  const hotspots = [
    { area: 'MG Road Area', issues: 8, severity: 'High' },
    { area: 'Panjim Circle', issues: 5, severity: 'Medium' },
    { area: 'Campal Gardens', issues: 12, severity: 'Critical' },
    { area: 'Miramar Beach Road', issues: 3, severity: 'Low' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        adminRole={adminRole}
        adminUsername={adminUsername}
        onLogout={handleLogout}
        active="hotspots"
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
                <h1 className="text-2xl font-bold text-gray-900">Hotspot Analysis</h1>
                <p className="text-sm text-gray-600">Geographic issue distribution</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Hotspot Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {hotspots.map((hotspot, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">{hotspot.area}</h3>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{hotspot.issues}</p>
                <p className="text-sm text-gray-600">Issues reported</p>
                <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${
                  hotspot.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                  hotspot.severity === 'High' ? 'bg-orange-100 text-orange-700' :
                  hotspot.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {hotspot.severity} Severity
                </span>
              </div>
            ))}
          </div>

          {/* Map */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-bold text-gray-900">Issue Hotspot Map</h2>
              </div>
            </div>
            <div className="h-[600px]">
              <AdminHotspotMap issues={sampleIssues} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
