"use client";
import Link from 'next/link';

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-5 border-t border-gray-200 bg-white/90 backdrop-blur dark:border-gray-800 dark:bg-gray-950/90 md:hidden">
      <Link href="#breathing" className="px-2 py-2 text-center text-xs">Breath</Link>
      <Link href="#mood" className="px-2 py-2 text-center text-xs">Mood</Link>
      <Link href="#journal" className="px-2 py-2 text-center text-xs">Journal</Link>
      <Link href="#ai" className="px-2 py-2 text-center text-xs">AI</Link>
      <Link href="#pomodoro" className="px-2 py-2 text-center text-xs">Timer</Link>
    </nav>
  );
}

