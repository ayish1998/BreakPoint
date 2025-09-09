"use client";
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import type { ReactNode } from 'react';

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');
  return (
    <div className="min-h-screen">
      {!isDashboard && <Navbar />}
      {children}
    </div>
  );
}

