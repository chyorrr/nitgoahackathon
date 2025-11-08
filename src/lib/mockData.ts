export type IssueStatus = 'open' | 'in-progress' | 'resolved' | 'verified' | 'rejected';

export type Issue = {
  id: string;
  title: string;
  description?: string;
  status: IssueStatus;
  category?: string;
  location?: string; // simple textual area
  createdAt: string;
};

// In-memory mock dataset for demo purposes
export let mockIssues: Issue[] = [
  { id: '1', title: 'Pothole on 5th St', status: 'open', category: 'Road', location: '5th St', createdAt: new Date(Date.now()-1000*60*60*24*3).toISOString() },
  { id: '2', title: 'Broken streetlight', status: 'in-progress', category: 'Lighting', location: 'Elm Park', createdAt: new Date(Date.now()-1000*60*60*24*5).toISOString() },
  { id: '3', title: 'Overflowing drain', status: 'verified', category: 'Drainage', location: 'Riverside', createdAt: new Date(Date.now()-1000*60*60*24*1).toISOString() },
  { id: '4', title: 'Graffiti on wall', status: 'resolved', category: 'Sanitation', location: 'Market Area', createdAt: new Date(Date.now()-1000*60*60*24*10).toISOString() },
  { id: '5', title: 'Illegal dumping', status: 'open', category: 'Sanitation', location: 'North End', createdAt: new Date().toISOString() },
];

export function getIssues() {
  // Return a copy to avoid accidental mutation
  return mockIssues.slice();
}

export function updateIssue(id: string, patch: Partial<Issue>) {
  const idx = mockIssues.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  mockIssues[idx] = { ...mockIssues[idx], ...patch };
  return mockIssues[idx];
}
