"use client";
import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function DashboardTopbar() {
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const me = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/auth/me', { credentials: 'include' }).then((r) => r.ok ? r.json() : null);
        setEmail(me?.email ?? null);
      } catch {}
    })();
  }, []);

  async function logout() {
    try {
      await api.auth.logout();
      window.location.href = '/';
    } catch {}
  }

  return (
    <div className="flex items-center justify-end gap-3 border-b border-gray-200 dark:border-gray-800 p-4">
      {email && <div className="text-sm opacity-80">{email}</div>}
      <button onClick={logout} className="rounded-md border px-3 py-1.5 border-gray-200 dark:border-gray-800 text-sm">Logout</button>
    </div>
  );
}

