'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

interface MapComponentProps {
  onReportIssue: () => void;
  searchQuery?: string;
  category?: string;
  status?: string;
}

// Sample issue markers
const sampleIssues = [
  { id: 1, lat: 15.4909, lng: 73.8278, type: 'pothole', status: 'pending', title: 'Pothole on Main Road' },
  { id: 2, lat: 15.4989, lng: 73.8258, type: 'streetlight', status: 'resolved', title: 'Street Light Issue' },
  { id: 3, lat: 15.4859, lng: 73.8318, type: 'garbage', status: 'in-progress', title: 'Garbage Collection' },
  { id: 4, lat: 15.4939, lng: 73.8198, type: 'water', status: 'pending', title: 'Water Supply Problem' },
  { id: 5, lat: 15.5019, lng: 73.8338, type: 'other', status: 'resolved', title: 'Other Issue' },
];

export default function MapComponent({ onReportIssue, searchQuery, category, status }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !mapRef.current) return;

    // Dynamically import Leaflet only on client side
    import('leaflet').then((L) => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }

      if (!mapRef.current) return;

      // Initialize map centered on Goa, India
      const map = L.map(mapRef.current).setView([15.4909, 73.8278], 13);
      mapInstanceRef.current = map;

      // Add tile layer with a clean, modern style
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 20,
      }).addTo(map);

      // Custom marker icons based on status
      const getMarkerIcon = (issueStatus: string) => {
        const colors: { [key: string]: string } = {
          'pending': '#EF4444', // Red
          'in-progress': '#F59E0B', // Orange/Yellow
          'resolved': '#00C853', // Green
        };

        const color = colors[issueStatus] || '#757575';
        
        return L.divIcon({
          html: `
            <div style="
              background-color: ${color};
              width: 32px;
              height: 32px;
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg);
              border: 3px solid white;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
            ">
              <div style="
                transform: rotate(45deg);
                color: white;
                font-size: 16px;
                font-weight: bold;
              ">!</div>
            </div>
          `,
          className: 'custom-marker',
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        });
      };

      // Add markers for sample issues
      sampleIssues.forEach((issue) => {
        const marker = L.marker([issue.lat, issue.lng], {
          icon: getMarkerIcon(issue.status)
        }).addTo(map);

        marker.bindPopup(`
          <div style="font-family: system-ui, -apple-system, sans-serif; min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #212121;">${issue.title}</h3>
            <p style="margin: 0 0 8px 0; font-size: 12px; color: #757575;">
              Status: <span style="
                display: inline-block;
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 11px;
                font-weight: 500;
                background-color: ${issue.status === 'resolved' ? '#00C853' : issue.status === 'in-progress' ? '#F59E0B' : '#EF4444'};
                color: white;
              ">${issue.status}</span>
            </p>
            <p style="margin: 0 0 8px 0; font-size: 12px; color: #757575;">Type: ${issue.type}</p>
            <button 
              onclick="window.location.href='/issue/${issue.id}'"
              style="
                width: 100%;
                padding: 6px 12px;
                background-color: #2979FF;
                color: white;
                border: none;
                border-radius: 6px;
                font-size: 12px;
                font-weight: 500;
                cursor: pointer;
                margin-top: 4px;
              "
            >View Details</button>
          </div>
        `);
      });

      // Add floating Report Issue button on map
      const reportButtonControl = L.Control.extend({
        options: {
          position: 'bottomright'
        },
        onAdd: function() {
          const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
          container.innerHTML = `
            <button 
              id="report-issue-btn"
              style="
                background-color: #EF4444;
                color: white;
                border: none;
                border-radius: 50%;
                width: 64px;
                height: 64px;
                font-size: 24px;
                cursor: pointer;
                box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
              "
              onmouseover="this.style.transform='scale(1.1)'; this.style.boxShadow='0 6px 16px rgba(239, 68, 68, 0.5)';"
              onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 12px rgba(239, 68, 68, 0.4)';"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </button>
          `;
          
          L.DomEvent.disableClickPropagation(container);
          
          return container;
        }
      });

      map.addControl(new reportButtonControl());

      // Add click handler for report button
      setTimeout(() => {
        const btn = document.getElementById('report-issue-btn');
        if (btn) {
          btn.addEventListener('click', onReportIssue);
        }
      }, 100);

      return () => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
      };
    });
  }, [isClient, onReportIssue]);

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
    <div className="w-full h-full relative">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}
