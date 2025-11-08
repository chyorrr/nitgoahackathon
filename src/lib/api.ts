export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function request(path: string, opts: RequestInit = {}) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, opts);
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    const data = await res.json();
    if (!res.ok) throw data;
    return data;
  }
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res;
}

export async function register(payload: { username?: string; email: string; password: string; role?: string }) {
  return request('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
}

export async function login(payload: { email: string; password: string }) {
  return request('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
}

export async function getIssues() {
  return request('/api/issues');
}

export async function createIssue(formData: FormData) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const headers: Record<string, string> = {};
  if (token) headers['x-auth-token'] = token;
  return request('/api/issues', {
    method: 'POST',
    headers,
    body: formData as any
  });
}

export default {
  API_BASE,
  register,
  login,
  getIssues,
  createIssue
};
