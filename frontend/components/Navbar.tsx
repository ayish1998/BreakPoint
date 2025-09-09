"use client";
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';
import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function Navbar() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const me = await apiRequestMe();
        setUser(me);
      } catch {}
    })();
  }, []);

  async function apiRequestMe() {
    try {
      const data = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/auth/me', {
        credentials: 'include',
      }).then((r) => (r.ok ? r.json() : Promise.reject(new Error('not auth'))));
      return data;
    } catch {
      return null;
    }
  }

  async function logout() {
    try {
      await api.auth.logout();
      window.location.href = '/';
    } catch {}
  }

  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="font-semibold">BreakPoint</span>
        </Link>
        <nav className="flex items-center gap-3">
          <ThemeToggle />
          {user ? (
            <div className="flex items-center gap-3 text-sm">
              <span className="opacity-80">{user.email}</span>
              <button onClick={logout} className="rounded-md border px-3 py-1.5 border-gray-200 dark:border-gray-800">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm">
              <Link href="/login" className="btn-primary">Log in</Link>
              <Link href="/signup" className="rounded-md border px-3 py-1.5 border-gray-200 dark:border-gray-800">Sign up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

