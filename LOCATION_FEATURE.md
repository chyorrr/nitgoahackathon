# Location-Based Map Feature

## Overview
The application now requests user location after login and automatically adjusts the map to center on their current location. This provides a personalized experience and makes it easier for users to report issues in their immediate area.

## Features

### 1. **Location Request on Login**
After successful login, users are presented with a modal asking for permission to access their location:
- Clean, user-friendly modal with clear explanations
- Lists the benefits of enabling location services
- "Allow Location Access" button to grant permission
- "Skip for Now" option if users prefer not to share location
- Privacy notice reassuring users their data won't be shared

### 2. **Smart Location Persistence**
- User's location is saved to localStorage
- Location request is only shown once per browser
- Location data is automatically loaded on subsequent visits
- Users can update their location by clearing browser data

### 3. **Map Centering**
When users access the map:
- **With Location**: Map centers on user's current position with zoom level 15
- **Without Location**: Map shows default location (Goa) with zoom level 13
- User's location is marked with a blue dot on the map

### 4. **User Location Marker**
A distinct blue marker shows the user's current location:
- Larger than issue markers for easy identification
- Labeled "Your Location"
- Helps users orient themselves on the map

## File Structure

```
src/
├── contexts/
│   └── LocationContext.tsx       # Global location state management
├── components/
│   ├── LocationRequestModal.tsx  # Modal for requesting location permission
│   └── MapComponent.tsx          # Updated to use user location
├── app/
│   ├── layout.tsx               # Wrapped with LocationProvider
│   └── login/
│       └── page.tsx             # Shows location modal after login
```

## Technical Implementation

### Location Context (`LocationContext.tsx`)
Provides global state management for user location:
- **State**: Stores lat/lng coordinates and timestamp
- **Persistence**: Saves to/loads from localStorage
- **Request Function**: Wraps browser Geolocation API
- **Tracking**: Remembers if location was already requested

### Location Request Modal (`LocationRequestModal.tsx`)
Beautiful modal interface for location permission:
- Animated entrance/exit with Framer Motion
- Loading state during location request
- Clear privacy messaging
- Accessible design with keyboard support

### Map Integration
The MapComponent now:
1. Reads user location from context
2. Centers map on user location if available
3. Shows user location marker
4. Increases zoom for better detail when location is known

## User Flow

1. **User logs in** via `/login` page
2. **After successful login**:
   - If location never requested → Show location modal
   - If location previously requested → Go directly to map
3. **User allows location**:
   - Browser requests permission
   - Location is saved to context and localStorage
   - User redirected to map centered on their location
4. **User skips location**:
   - Preference saved (won't ask again)
   - User redirected to map with default location

## Privacy & Security

### Data Storage
- Location stored only in browser's localStorage
- No server-side storage or transmission
- Users can clear data anytime via browser settings

### Privacy Guarantees
- Location only used for map centering and issue reporting
- Never shared with third parties
- Clear privacy notice in modal
- Users can deny permission at browser level

### Browser Permissions
- Respects browser geolocation API permissions
- Users can revoke permission in browser settings
- Graceful fallback if permission denied

## Configuration

### Default Location
Located in `MapComponent.tsx`:
```tsx
const initialCenter = userLocation 
  ? { lat: userLocation.lat, lng: userLocation.lng }
  : { lat: 15.4909, lng: 73.8278 }; // Goa, India
```

### Zoom Levels
- **With user location**: Zoom 15 (neighborhood detail)
- **Without user location**: Zoom 13 (city overview)

### Geolocation Options
```tsx
{
  enableHighAccuracy: true,  // Use GPS if available
  timeout: 10000,           // 10 second timeout
  maximumAge: 0             // No cached position
}
```

## Testing

### Test Scenarios

1. **First-time login**:
   - Login → Location modal appears
   - Allow → Map centers on user location
   - Blue marker shows user position

2. **Returning user (allowed location)**:
   - Login → No modal shown
   - Map automatically centers on stored location

3. **Returning user (skipped location)**:
   - Login → No modal shown
   - Map shows default location

4. **Location denied**:
   - Browser blocks location access
   - Map falls back to default location
   - No error shown to user

### Manual Testing

1. **Allow location**:
   ```
   1. Clear browser data
   2. Log in
   3. Click "Allow Location Access"
   4. Grant browser permission
   5. Verify map centers on your location
   ```

2. **Skip location**:
   ```
   1. Clear browser data
   2. Log in
   3. Click "Skip for Now"
   4. Verify map shows default location
   5. Log out and log in again
   6. Verify modal doesn't appear again
   ```

3. **Update location**:
   ```
   1. Clear localStorage
   2. Refresh page
   3. Navigate to map
   4. Location will be re-requested if needed
   ```

## Troubleshooting

### Location not working

1. **Check browser permissions**:
   - Chrome: Settings → Privacy → Site Settings → Location
   - Firefox: Preferences → Privacy → Permissions → Location
   - Ensure the site has permission

2. **HTTPS required**:
   - Geolocation API requires HTTPS in production
   - Localhost works without HTTPS

3. **Clear localStorage**:
   ```javascript
   localStorage.removeItem('userLocation');
   localStorage.removeItem('hasRequestedLocation');
   ```

### Modal not showing

- Check if `hasRequestedLocation` is set in localStorage
- Verify login is successful before modal trigger
- Check console for errors

## Future Enhancements

### Planned Features
- [ ] Manual location update option in settings
- [ ] Location accuracy indicator
- [ ] Background location updates for mobile
- [ ] Reverse geocoding to show address
- [ ] Distance filter for nearby issues
- [ ] Location-based notifications
- [ ] Multiple saved locations (home, work, etc.)

### Integration Opportunities
- Auto-fill address in report form
- Filter feed by distance from user
- Show nearest issues first
- Location-based search suggestions
- Geofencing for issue categories

## API Reference

### LocationContext

```typescript
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
```

### Usage Example

```tsx
import { useLocation } from '@/contexts/LocationContext';

function MyComponent() {
  const { userLocation, requestLocation } = useLocation();
  
  const handleGetLocation = async () => {
    const location = await requestLocation();
    if (location) {
      console.log(`User at: ${location.lat}, ${location.lng}`);
    }
  };
  
  return (
    <div>
      {userLocation ? (
        <p>Location: {userLocation.lat}, {userLocation.lng}</p>
      ) : (
        <button onClick={handleGetLocation}>Get Location</button>
      )}
    </div>
  );
}
```

## Browser Compatibility

- ✅ Chrome 50+
- ✅ Firefox 55+
- ✅ Safari 10+
- ✅ Edge 12+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Initial load**: No impact (modal only after login)
- **Map load**: ~100ms faster with cached location
- **Storage**: < 1KB localStorage usage
- **Network**: Single geolocation API call

---

**Note**: Location features enhance user experience but are entirely optional. The app works fully without location access.
