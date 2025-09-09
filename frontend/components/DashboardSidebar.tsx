"use client";
import Link from 'next/link';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

export default function DashboardSidebar() {
  return (
    <aside className="hidden md:flex md:w-64 md:flex-col border-r border-gray-200 dark:border-gray-800 p-4 gap-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-6 w-6" />
          <span className="font-semibold">BreakPoint</span>
        </Link>
        <ThemeToggle />
      </div>
      <nav className="mt-4 space-y-1 text-sm">
        <Link className="block rounded-md px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-900" href="#breathing">Breathing</Link>
        <Link className="block rounded-md px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-900" href="#mood">Mood</Link>
        <Link className="block rounded-md px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-900" href="#journal">Journal</Link>
        <Link className="block rounded-md px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-900" href="#ai">AI Assistant</Link>
        <Link className="block rounded-md px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-900" href="#pomodoro">Pomodoro</Link>
      </nav>
      <div className="mt-auto text-xs text-gray-500">Stay calm and keep shipping 🚀</div>
    </aside>
  );
}

