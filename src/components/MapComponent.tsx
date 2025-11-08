'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocation } from '@/contexts/LocationContext';

// Exporting the props interface so it can be used for typed dynamic import
export interface MapComponentProps {
  onReportIssue: () => void;
  searchQuery?: string;
  category?: string;
  status?: string;
  onLocationSelected?: (coords: { lat: number; lng: number }) => void;
}

// Sample issue markers
const sampleIssues = [
  { id: 1, lat: 15.4909, lng: 73.8278, type: 'pothole', status: 'pending', title: 'Pothole on Main Road' },
  { id: 2, lat: 15.4989, lng: 73.8258, type: 'streetlight', status: 'resolved', title: 'Street Light Issue' },
  { id: 3, lat: 15.4859, lng: 73.8318, type: 'garbage', status: 'in-progress', title: 'Garbage Collection' },
  { id: 4, lat: 15.4939, lng: 73.8198, type: 'water', status: 'pending', title: 'Water Supply Problem' },
  { id: 5, lat: 15.5019, lng: 73.8338, type: 'other', status: 'resolved', title: 'Other Issue' },
];

// Minimal loader to inject Google Maps JS API without extra deps
function loadGoogleMaps(apiKey: string): Promise<typeof google> {
  if (typeof window === 'undefined') return Promise.reject('No window');
  const w = window as any;
  if (w.google && w.google.maps) return Promise.resolve(w.google);

  const existing = document.getElementById('google-maps-js');
  if (existing) {
    return new Promise((resolve, reject) => {
      (w as any).initMap = () => resolve(w.google);
      existing.addEventListener('error', reject);
    });
  }

  return new Promise((resolve, reject) => {
    (w as any).initMap = () => resolve(w.google);
    const script = document.createElement('script');
    script.id = 'google-maps-js';
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&callback=initMap`; // add &libraries=places if needed
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export default function MapComponent({ onReportIssue, onLocationSelected }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { userLocation } = useLocation();
  const onReportIssueRef = useRef(onReportIssue);
  const onLocationSelectedRef = useRef(onLocationSelected);

  useEffect(() => { onReportIssueRef.current = onReportIssue; }, [onReportIssue]);
  useEffect(() => { onLocationSelectedRef.current = onLocationSelected; }, [onLocationSelected]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !mapRef.current) return;

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.warn('Missing NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env.local');
      setErrorMessage('Google Maps API key is missing. Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to .env.local and restart.');
      return;
    }

  let reportButtonEl: HTMLDivElement | null = null;
  let typeToggleEl: HTMLDivElement | null = null;
  let locationMarker: google.maps.Marker | null = null;
    let listeners: Array<google.maps.MapsEventListener> = [];

    loadGoogleMaps(apiKey)
      .then((g) => {
        if (!mapRef.current) return;
        // Initialize map once
        if (!mapInstanceRef.current) {
          // Use user's location if available, otherwise use default (Goa)
          const initialCenter = userLocation 
            ? { lat: userLocation.lat, lng: userLocation.lng }
            : { lat: 15.4909, lng: 73.8278 };
            
          mapInstanceRef.current = new g.maps.Map(mapRef.current, {
            center: initialCenter,
            zoom: userLocation ? 15 : 13, // Zoom in more if we have user location
            mapTypeControl: true,
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeId: 'roadmap',
            mapTypeControlOptions: {
              position: g.maps.ControlPosition.TOP_RIGHT,
              mapTypeIds: ['roadmap', 'satellite'],
            },
          });
          
          // Add user location marker if available
          if (userLocation) {
            new g.maps.Marker({
              position: { lat: userLocation.lat, lng: userLocation.lng },
              map: mapInstanceRef.current,
              icon: {
                path: g.maps.SymbolPath.CIRCLE,
                fillColor: '#2563eb',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 3,
                scale: 8,
              },
              title: 'Your Location',
            });
          }
        }
        const map = mapInstanceRef.current;

        const statusColors: Record<string, string> = {
          pending: '#EF4444',
          'in-progress': '#F59E0B',
          resolved: '#00C853',
        };

        const makeMarkerIcon = (color: string): google.maps.Symbol => ({
          path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z',
          fillColor: color,
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
          anchor: new g.maps.Point(12, 22),
          scale: 1.2,
        });

        // Add sample markers
        sampleIssues.forEach((issue) => {
          const color = statusColors[issue.status] || '#757575';
          const marker = new g.maps.Marker({
            position: { lat: issue.lat, lng: issue.lng },
            map,
            icon: makeMarkerIcon(color),
            title: issue.title,
          });

          const info = new g.maps.InfoWindow({
            content: `
              <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; min-width: 220px;">
                <h3 style="margin:0 0 6px; font-size:14px; font-weight:600; color:#111827;">${issue.title}</h3>
                <div style="font-size:12px; color:#4B5563; margin-bottom:6px;">
                  Status:
                  <span style="display:inline-block; padding:2px 8px; border-radius:9999px; color:#fff; background:${color}; font-size:11px; margin-left:6px;">${issue.status}</span>
                </div>
                <div style="font-size:12px; color:#6B7280;">Type: ${issue.type}</div>
              </div>
            `,
          });
          listeners.push(
            marker.addListener('click', () => {
              info.open({ map, anchor: marker });
            })
          );
        });

        // Create floating report button as a custom control
        reportButtonEl = document.createElement('div');
        reportButtonEl.style.margin = '16px';
        reportButtonEl.innerHTML = `
          <button id="gm-report-issue-btn" style="
            background:#EF4444; color:#fff; border:none; border-radius:50%; width:56px; height:56px;
            cursor:pointer; box-shadow:0 4px 12px rgba(239,68,68,0.3); display:flex; align-items:center; justify-content:center;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </button>`;
        map.controls[g.maps.ControlPosition.RIGHT_BOTTOM].push(reportButtonEl);

        setTimeout(() => {
          const btn = document.getElementById('gm-report-issue-btn');
          if (btn) btn.addEventListener('click', () => onReportIssueRef.current && onReportIssueRef.current());
        }, 0);

        // Add map-type toggle (Road vs Satellite) as a custom control
        typeToggleEl = document.createElement('div');
        typeToggleEl.style.margin = '16px';
        typeToggleEl.style.background = 'white';
        typeToggleEl.style.border = '1px solid #e5e7eb';
        typeToggleEl.style.borderRadius = '8px';
        typeToggleEl.style.boxShadow = '0 1px 2px rgba(0,0,0,0.06)';
        typeToggleEl.style.display = 'flex';
        typeToggleEl.style.overflow = 'hidden';
        typeToggleEl.innerHTML = `
          <button id="gm-type-road" style="padding:8px 10px; font-size:12px; background:#111827; color:#fff; border:none; cursor:pointer">Road</button>
          <button id="gm-type-sat" style="padding:8px 10px; font-size:12px; background:#ffffff; color:#111827; border:none; cursor:pointer">Satellite</button>
        `;
        map.controls[g.maps.ControlPosition.TOP_RIGHT].push(typeToggleEl);
        setTimeout(() => {
          const roadBtn = document.getElementById('gm-type-road');
          const satBtn = document.getElementById('gm-type-sat');
          if (roadBtn && satBtn) {
            roadBtn.addEventListener('click', () => {
              map.setMapTypeId('roadmap');
              roadBtn.setAttribute('style', "padding:8px 10px; font-size:12px; background:#111827; color:#fff; border:none; cursor:pointer");
              satBtn.setAttribute('style', "padding:8px 10px; font-size:12px; background:#ffffff; color:#111827; border:none; cursor:pointer");
            });
            satBtn.addEventListener('click', () => {
              map.setMapTypeId('satellite');
              satBtn.setAttribute('style', "padding:8px 10px; font-size:12px; background:#111827; color:#fff; border:none; cursor:pointer");
              roadBtn.setAttribute('style', "padding:8px 10px; font-size:12px; background:#ffffff; color:#111827; border:none; cursor:pointer");
            });
          }
        }, 0);

        // Map click to select location for reporting
        listeners.push(
          g.maps.event.addListener(map, 'click', (e: google.maps.MapMouseEvent) => {
            if (!e.latLng) return;
            const pos = e.latLng;
            if (!locationMarker) {
              locationMarker = new g.maps.Marker({
                position: pos,
                map,
                icon: {
                  path: g.maps.SymbolPath.CIRCLE,
                  fillColor: '#2563eb',
                  fillOpacity: 0.9,
                  strokeColor: '#ffffff',
                  strokeWeight: 2,
                  scale: 6,
                },
              });
            } else {
              locationMarker.setPosition(pos);
            }
            if (onLocationSelectedRef.current) {
              const { lat, lng } = pos.toJSON();
              onLocationSelectedRef.current({ lat, lng });
            }
          })
        );
      })
      .catch((e) => {
        console.error('Failed to load Google Maps', e);
        setErrorMessage('Failed to load Google Maps. Check your API key and network.');
      });

    return () => {
      // Only remove controls and listeners, keep map instance to avoid re-initialization lag
      if (reportButtonEl && reportButtonEl.parentElement) reportButtonEl.parentElement.removeChild(reportButtonEl);
      if (typeToggleEl && typeToggleEl.parentElement) typeToggleEl.parentElement.removeChild(typeToggleEl);
      listeners.forEach((l) => l.remove());
    };
  }, [isClient]);

  if (!isClient) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#00C853] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#757575]">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full" style={{ height: '100%', minHeight: 'calc(100vh - 64px)' }}>
      <div ref={mapRef} className="absolute inset-0" />
      {errorMessage && (
        <div className="absolute inset-0 flex items-center justify-center bg-white">
          <div className="text-center px-6">
            <div className="text-sm text-slate-700 mb-2">{errorMessage}</div>
            <div className="text-xs text-slate-500">If you just added the key, stop and restart the dev server.</div>
          </div>
        </div>
      )}
    </div>
  );
}
