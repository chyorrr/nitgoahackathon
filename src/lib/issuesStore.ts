// Simple localStorage-based issue storage
export interface Issue {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  coordinates: { lat: number; lng: number };
  upvotes: number;
  comments: number;
  status: 'pending' | 'in-progress' | 'resolved';
  timeAgo: string;
  date: string;
  reportedBy: string;
  images: string[];
  hasUpvoted?: boolean;
}

// Default issues scattered around Goa
export const defaultIssues: Issue[] = [
  {
    id: '1',
    title: 'Large pothole on MG Road',
    description: 'Deep pothole causing traffic issues',
    category: 'Potholes',
    location: 'MG Road, Panaji',
    coordinates: { lat: 15.4909, lng: 73.8278 },
    upvotes: 142,
    comments: 23,
    status: 'in-progress',
    timeAgo: '2 hours ago',
    date: new Date().toISOString(),
    reportedBy: 'Rajesh Kumar',
    images: [],
    hasUpvoted: false
  },
  {
    id: '2',
    title: 'Street light not working',
    description: 'Broken street light making area unsafe at night',
    category: 'Street Lights',
    location: 'Altinho, Panaji',
    coordinates: { lat: 15.4989, lng: 73.8258 },
    upvotes: 89,
    comments: 15,
    status: 'pending',
    timeAgo: '5 hours ago',
    date: new Date().toISOString(),
    reportedBy: 'Priya Sharma',
    images: [],
    hasUpvoted: false
  },
  {
    id: '3',
    title: 'Garbage pile near market',
    description: 'Uncollected garbage creating hygiene issues',
    category: 'Garbage',
    location: 'Municipal Market',
    coordinates: { lat: 15.4859, lng: 73.8318 },
    upvotes: 67,
    comments: 8,
    status: 'pending',
    timeAgo: '1 day ago',
    date: new Date().toISOString(),
    reportedBy: 'Amit Patel',
    images: [],
    hasUpvoted: false
  },
  {
    id: '4',
    title: 'Water pipeline leakage',
    description: 'Continuous water leakage wasting resources',
    category: 'Water Supply',
    location: 'Campal Area',
    coordinates: { lat: 15.4939, lng: 73.8198 },
    upvotes: 103,
    comments: 19,
    status: 'in-progress',
    timeAgo: '3 hours ago',
    date: new Date().toISOString(),
    reportedBy: 'Sneha Desai',
    images: [],
    hasUpvoted: false
  },
  {
    id: '5',
    title: 'Broken manhole cover',
    description: 'Dangerous open manhole on main road',
    category: 'Others',
    location: 'Miramar Beach Road',
    coordinates: { lat: 15.5019, lng: 73.8338 },
    upvotes: 234,
    comments: 45,
    status: 'resolved',
    timeAgo: '2 days ago',
    date: new Date().toISOString(),
    reportedBy: 'Municipal Officer',
    images: [],
    hasUpvoted: false
  },
  {
    id: '6',
    title: 'Overflowing drainage',
    description: 'Sewage overflow during rain',
    category: 'Water Supply',
    location: 'Dona Paula',
    coordinates: { lat: 15.4535, lng: 73.8065 },
    upvotes: 178,
    comments: 32,
    status: 'pending',
    timeAgo: '6 hours ago',
    date: new Date().toISOString(),
    reportedBy: 'Ramesh Naik',
    images: [],
    hasUpvoted: false
  },
  {
    id: '7',
    title: 'Damaged road divider',
    description: 'Broken divider causing accidents',
    category: 'Others',
    location: 'Kadamba Plateau',
    coordinates: { lat: 15.4750, lng: 73.8150 },
    upvotes: 95,
    comments: 18,
    status: 'in-progress',
    timeAgo: '8 hours ago',
    date: new Date().toISOString(),
    reportedBy: 'Kavita Singh',
    images: [],
    hasUpvoted: false
  },
  {
    id: '8',
    title: 'No street lights in colony',
    description: 'Entire street has no lighting',
    category: 'Street Lights',
    location: 'Caranzalem',
    coordinates: { lat: 15.4980, lng: 73.8380 },
    upvotes: 156,
    comments: 28,
    status: 'pending',
    timeAgo: '12 hours ago',
    date: new Date().toISOString(),
    reportedBy: 'Sunil Rao',
    images: [],
    hasUpvoted: false
  },
  {
    id: '9',
    title: 'Multiple potholes',
    description: 'Road full of potholes after monsoon',
    category: 'Potholes',
    location: 'Ribandar',
    coordinates: { lat: 15.4890, lng: 73.8490 },
    upvotes: 201,
    comments: 41,
    status: 'in-progress',
    timeAgo: '1 day ago',
    date: new Date().toISOString(),
    reportedBy: 'Anjali Deshmukh',
    images: [],
    hasUpvoted: false
  },
  {
    id: '10',
    title: 'Stray dog menace',
    description: 'Large number of stray dogs causing problems',
    category: 'Others',
    location: 'Tonca',
    coordinates: { lat: 15.4670, lng: 73.8290 },
    upvotes: 89,
    comments: 15,
    status: 'pending',
    timeAgo: '4 hours ago',
    date: new Date().toISOString(),
    reportedBy: 'Prakash Kamat',
    images: [],
    hasUpvoted: false
  },
  {
    id: '11',
    title: 'Garbage bins overflowing',
    description: 'No collection for past 4 days',
    category: 'Garbage',
    location: 'Santa Cruz',
    coordinates: { lat: 15.4820, lng: 73.8200 },
    upvotes: 123,
    comments: 22,
    status: 'pending',
    timeAgo: '7 hours ago',
    date: new Date().toISOString(),
    reportedBy: 'Maria Fernandes',
    images: [],
    hasUpvoted: false
  },
  {
    id: '12',
    title: 'Footpath encroachment',
    description: 'Vendors blocking entire footpath',
    category: 'Others',
    location: '18th June Road',
    coordinates: { lat: 15.4920, lng: 73.8260 },
    upvotes: 67,
    comments: 11,
    status: 'pending',
    timeAgo: '9 hours ago',
    date: new Date().toISOString(),
    reportedBy: 'Deepak Shetty',
    images: [],
    hasUpvoted: false
  }
];

const STORAGE_KEY = 'cityvoice_reported_issues';

// Get all reported issues (user's own reports)
export function getReportedIssues(): Issue[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading reported issues:', error);
    return [];
  }
}

// Get all issues (default + user reported)
export function getAllIssues(): Issue[] {
  const reported = getReportedIssues();
  return [...defaultIssues, ...reported];
}

// Add a new reported issue
export function addReportedIssue(issue: Omit<Issue, 'id' | 'date' | 'timeAgo' | 'upvotes' | 'comments' | 'status' | 'hasUpvoted'>): Issue {
  const newIssue: Issue = {
    ...issue,
    id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    date: new Date().toISOString(),
    timeAgo: 'Just now',
    upvotes: 0,
    comments: 0,
    status: 'pending',
    hasUpvoted: true
  };

  const currentIssues = getReportedIssues();
  const updatedIssues = [newIssue, ...currentIssues];
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedIssues));
  } catch (error) {
    console.error('Error saving issue:', error);
  }

  return newIssue;
}

// Remove a reported issue
export function removeReportedIssue(id: string): void {
  const currentIssues = getReportedIssues();
  const updatedIssues = currentIssues.filter(issue => issue.id !== id);
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedIssues));
  } catch (error) {
    console.error('Error removing issue:', error);
  }
}
