# Community Feed Feature

## Overview
The Community Feed is a Facebook-style feed that displays all issues reported by users in the community. Users can:
- View all reported issues with full details
- Upvote issues to bring them more attention
- Filter by category
- Sort by trending (most upvoted) or recent
- View issue location on the map
- See issue status (Pending, In Progress, Resolved)

## Features

### 1. **Issue Cards**
Each issue is displayed as a card containing:
- Author information and avatar
- Time posted (e.g., "2 hours ago")
- Issue title and description
- Category badge
- Location information
- Status badge (color-coded)
- Uploaded images (if any)
- Interaction buttons (Upvote, Comment, Share)
- "View on Map" link

### 2. **Upvoting System**
- Click the upvote button to support an issue
- Upvote count updates in real-time
- Visual feedback when upvoted (red highlight)
- Click again to remove upvote

### 3. **Filtering & Sorting**
- **Filter by Category**: All, Potholes, Street Lights, Garbage, Water Supply, Others
- **Sort Options**:
  - **Trending**: Shows issues with most upvotes first
  - **Recent**: Shows newest issues first

### 4. **Status Indicators**
Issues are color-coded by status:
- 🟡 **Pending**: Yellow badge - Issue awaiting action
- 🔵 **In Progress**: Blue badge - Issue being worked on
- 🟢 **Resolved**: Green badge - Issue has been fixed

### 5. **Navigation**
- Access the feed from:
  - Navbar (new "Feed" link)
  - Hero section ("View Community Feed" button)
  - User profile menu ("Community Feed")

## File Structure

```
src/
├── app/
│   └── feed/
│       └── page.tsx          # Main feed page component
├── components/
│   ├── Navbar.tsx            # Updated with Feed link
│   └── Hero.tsx              # Updated with Feed CTA
```

## How to Use

### Accessing the Feed
1. Navigate to `/feed` in your browser
2. Or click "Feed" in the navbar
3. Or click "View Community Feed" on the homepage

### Interacting with Issues
1. **Upvote**: Click the upvote arrow icon to support an issue
2. **Comment**: Click the comment icon (functionality to be implemented)
3. **Share**: Click the share icon (functionality to be implemented)
4. **View Location**: Click "View on Map" to see the issue location

### Filtering Issues
1. Click the "Filter" dropdown (top right)
2. Select a category to filter
3. Only issues in that category will be displayed

### Sorting Issues
1. Click the "Sort" dropdown (top left)
2. Choose "Trending" to see most upvoted issues first
3. Choose "Recent" to see newest issues first

## Sample Data

The feed currently displays 5 sample issues covering different categories:
1. Pothole on MG Road
2. Street light issue on Park Avenue
3. Garbage collection problem
4. Water supply disruption
5. Broken footpath

## Future Enhancements

### Planned Features
- [ ] Comment system implementation
- [ ] Share functionality
- [ ] Real-time updates using WebSockets
- [ ] Infinite scroll / pagination
- [ ] Backend integration for persistent data
- [ ] User authentication for personalized feed
- [ ] Push notifications for updates on upvoted issues
- [ ] Image zoom/preview functionality
- [ ] Advanced filters (date range, distance from user)
- [ ] User profiles and activity history

### Integration Points
- Connect to backend API for real issue data
- Integrate with map page for seamless navigation
- Link to authentication system
- Add analytics for trending issues

## Technical Details

### State Management
- Uses React `useState` for local state
- Issue upvotes toggle locally
- Filter and sort states managed independently

### Animations
- Framer Motion for smooth card animations
- Staggered entrance animations for issue cards
- Dropdown transitions

### Responsive Design
- Mobile-first approach
- Adapts image grid based on image count
- Responsive button layouts
- Collapsible filters on mobile

### Performance Considerations
- Lightweight component structure
- Optimized re-renders
- Lazy loading ready for images
- Prepared for pagination

## Styling

### Color Scheme
- Primary: Red (#DC2626) for upvotes and CTAs
- Status Colors:
  - Pending: Yellow (#FEF3C7 / #92400E)
  - In Progress: Blue (#DBEAFE / #1E40AF)
  - Resolved: Green (#D1FAE5 / #065F46)
- Neutral: Slate grays for text and backgrounds

### Typography
- Headlines: Bold, 18-24px
- Body text: Regular, 14px
- Metadata: Small, 12px

## Dependencies
- React
- Next.js (App Router)
- Framer Motion (animations)
- Lucide React (icons)
- Tailwind CSS (styling)

---

**Note**: This feature currently uses mock data. For production, integrate with your backend API to fetch real issues and persist upvotes.
