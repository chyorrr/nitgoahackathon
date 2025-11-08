'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserLocation {
  lat: number;
  lng: number;
  timestamp: number;
}

interface LocationContextType {
  userLocation: UserLocation | null;
  setUserLocation: (location: UserLocation | null) => void;
  requestLocation: () => Promise<UserLocation | null>;
  hasRequestedLocation: boolean;
  setHasRequestedLocation: (value: boolean) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [hasRequestedLocation, setHasRequestedLocation] = useState(false);

  // Load location from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('userLocation');
    const hasRequested = localStorage.getItem('hasRequestedLocation');
    
    if (stored) {
      try {
        setUserLocation(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse stored location', e);
      }
    }
    
    if (hasRequested) {
      setHasRequestedLocation(true);
    }
  }, []);

  // Save location to localStorage whenever it changes
  useEffect(() => {
    if (userLocation) {
      localStorage.setItem('userLocation', JSON.stringify(userLocation));
    }
  }, [userLocation]);

  // Save hasRequestedLocation to localStorage
  useEffect(() => {
    localStorage.setItem('hasRequestedLocation', hasRequestedLocation.toString());
  }, [hasRequestedLocation]);

  const requestLocation = async (): Promise<UserLocation | null> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        console.error('Geolocation is not supported by this browser');
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location: UserLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            timestamp: Date.now(),
          };
          setUserLocation(location);
          setHasRequestedLocation(true);
          resolve(location);
        },
        (error) => {
          console.error('Error getting location:', error);
          setHasRequestedLocation(true);
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  };

  return (
    <LocationContext.Provider
      value={{
        userLocation,
        setUserLocation,
        requestLocation,
        hasRequestedLocation,
        setHasRequestedLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}
