const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

async function request(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    credentials: 'include',
  });
  if (!res.ok) {
    let message = `Request failed: ${res.status}`;
    try {
      const data = await res.json();
      message = data?.error || message;
    } catch {}
    throw new Error(message);
  }
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export const api = {
  auth: {
    login: (email: string, password: string) =>
      request('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    register: (email: string, password: string) =>
      request('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }),
    logout: () => request('/api/auth/logout', { method: 'POST' }),
  },
  journal: {
    list: () => request('/api/journal'),
    create: (content: string, mood?: string, tags?: string[]) =>
      request('/api/journal', {
        method: 'POST',
        body: JSON.stringify({ content, mood, tags }),
      }),
  },
  community: {
    list: () => request('/api/community'),
    create: (title: string, content: string, tags?: string[]) =>
      request('/api/community', {
        method: 'POST',
        body: JSON.stringify({ title, content, tags }),
      }),
    upvote: (id: string) => request(`/api/community/${id}/upvote`, { method: 'POST' }),
  },
  ai: {
    chat: (
      messages: { role: 'system' | 'user' | 'assistant'; content: string }[],
      includeJournal?: boolean
    ) =>
      request('/api/ai/chat', {
        method: 'POST',
        body: JSON.stringify({ messages, includeJournal }),
      }),
  },
};

export default api;

