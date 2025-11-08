"use client";

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

// Dynamic import to avoid SSR issues with Leaflet
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

interface Issue {
  id: string | number;
  title: string;
  description: string;
  category: string;
  status: string;
  priority: string;
  location: string;
  coordinates: { lat: number; lng: number };
  date: string;
  reporter: string;
  upvotes: number;
}

interface AdminHotspotMapProps {
  issues: Issue[];
}

export default function AdminHotspotMap({ issues }: AdminHotspotMapProps) {
  const [isClient, setIsClient] = useState(false);
  const [L, setL] = useState<any>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Import Leaflet CSS and library
    const loadLeaflet = async () => {
      try {
        const leaflet = await import('leaflet');
        setL(leaflet.default);
        // Fix for default marker icon
        delete (leaflet.default.Icon.Default.prototype as any)._getIconUrl;
        leaflet.default.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });
        setMapReady(true);
      } catch (error) {
        console.error('Error loading Leaflet:', error);
      }
    };
    loadLeaflet();
  }, []);

  // Get custom icon based on priority
  const getMarkerIcon = (priority: string) => {
    if (!L) return undefined;

    const colors: { [key: string]: string } = {
      critical: '#ef4444',
      high: '#f59e0b',
      medium: '#3b82f6',
      low: '#10b981',
    };

    const color = colors[priority.toLowerCase()] || '#3b82f6';

    return new L.Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(`
        <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5 0C5.596 0 0 5.596 0 12.5c0 9.375 12.5 28.125 12.5 28.125S25 21.875 25 12.5C25 5.596 19.404 0 12.5 0z" fill="${color}"/>
          <circle cx="12.5" cy="12.5" r="6" fill="white"/>
        </svg>
      `)}`,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });
  };

  // Calculate center point from all issues
  const calculateCenter = (): [number, number] => {
    if (issues.length === 0) return [15.4909, 73.8278]; // Default to Goa

    const avgLat = issues.reduce((sum, issue) => sum + issue.coordinates.lat, 0) / issues.length;
    const avgLng = issues.reduce((sum, issue) => sum + issue.coordinates.lng, 0) / issues.length;

    return [avgLat, avgLng];
  };

  if (!isClient || !L || !mapReady) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-gray-600" />
          <p className="text-sm text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[400px] rounded-lg overflow-hidden relative">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.min.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossOrigin=""
      />
      
      <MapContainer
        center={calculateCenter()}
        zoom={12}
        style={{ width: '100%', height: '100%', minHeight: '400px' }}
        className="z-0"
        scrollWheelZoom={true}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {issues.map((issue) => (
          <Marker
            key={issue.id}
            position={[issue.coordinates.lat, issue.coordinates.lng]}
            icon={getMarkerIcon(issue.priority)}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-bold text-slate-900 mb-2">{issue.title}</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-700">Category:</span>
                    <span className="text-slate-600">{issue.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-700">Status:</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      issue.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      issue.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      issue.status === 'resolved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {issue.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-700">Priority:</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      issue.priority === 'critical' ? 'bg-red-100 text-red-800' :
                      issue.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                      issue.priority === 'medium' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {issue.priority}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-700">Location:</span>
                    <span className="text-slate-600 text-xs">{issue.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-700">Upvotes:</span>
                    <span className="text-slate-600">{issue.upvotes}</span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-200">
                    <p className="text-slate-600 text-xs">{issue.description}</p>
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 z-1000">
        <h4 className="text-xs font-bold text-gray-900 mb-2">Priority Levels</h4>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs text-gray-700">Critical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-xs text-gray-700">High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-xs text-gray-700">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-700">Low</span>
          </div>
        </div>
      </div>

      {/* Issue Count Badge */}
      <div className="absolute top-4 right-4 bg-gray-900/90 backdrop-blur-sm rounded-lg shadow-lg px-4 py-2 z-1000">
        <p className="text-sm font-semibold text-white">
          {issues.length} Issue{issues.length !== 1 ? 's' : ''} on Map
        </p>
      </div>
    </div>
  );
}
