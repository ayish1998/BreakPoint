import Link from 'next/link';
import ThemeToggle from '../components/ThemeToggle';
import AnimatedIllustration from '../components/AnimatedIllustration';

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 select-none">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-indigo-50 dark:from-gray-950 dark:to-gray-900" />
          <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand/20 blur-3xl" />
        </div>
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-16 sm:px-6 md:grid-cols-2 md:gap-10 md:py-20">
          <div>
            <span className="inline-flex items-center rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs text-brand">Designed for developers</span>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight">
              Find your calm. Ship with focus.
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Breathing exercises, mood check-ins, journaling, Pomodoro, and an AI assistant — all in one dashboard.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/dashboard" className="btn-primary">Open Dashboard</Link>
              <Link href="/signup" className="rounded-lg border px-4 py-2 border-gray-200 dark:border-gray-800">Create account</Link>
            </div>
          </div>
          <div className="relative">
            <AnimatedIllustration />
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-24">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold">Everything you need to de-stress and deliver</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">A focused toolkit crafted for developers</p>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-4">
            {/* Breathing */}
            <div className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 p-6 transition hover:shadow-lg">
              <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-brand/10 blur-2xl transition group-hover:scale-125" />
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand/15 text-brand">
                  {/* lungs icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M11 3a1 1 0 0 1 1 1v8.268A2 2 0 0 0 13.106 14.4l2.828 2.828a1 1 0 1 1-1.414 1.414l-2.121-2.121V20a1 1 0 1 1-2 0v-3.479l-2.121 2.121a1 1 0 0 1-1.414-1.414l2.828-2.828A2 2 0 0 0 11 12.268V4a1 1 0 0 1 1-1Z"/></svg>
                </div>
                <h3 className="text-lg font-semibold">Breathing</h3>
              </div>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">Reset your nervous system with the proven 4-7-8 method.</p>
              <div className="mt-4 h-20 rounded-xl bg-gradient-to-br from-brand/20 to-brand/5" />
            </div>

            {/* Mood */}
            <div className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 p-6 transition hover:shadow-lg">
              <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-emerald-400/10 blur-2xl transition group-hover:scale-125" />
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-400/15 text-emerald-500">
                  {/* smile icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-3 7.5a.75.75 0 0 1 .75.75.75.75 0 0 1-1.5 0 .75.75 0 0 1 .75-.75Zm7.5.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm-9.28 4.03a.75.75 0 0 1 1.06.02A4.5 4.5 0 0 0 12 17.25a4.5 4.5 0 0 0 3.72-1.7.75.75 0 0 1 1.08 1.04A6 6 0 0 1 12 18.75a6 6 0 0 1-4.8-2.4.75.75 0 0 1 .02-1.06Z" clipRule="evenodd"/></svg>
                </div>
                <h3 className="text-lg font-semibold">Mood</h3>
              </div>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">Check-in fast to prevent burnout and notice trends over time.</p>
              <div className="mt-4 h-20 rounded-xl bg-gradient-to-br from-emerald-400/20 to-emerald-400/5" />
            </div>

            {/* Journal */}
            <div className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 p-6 transition hover:shadow-lg">
              <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-orange-400/10 blur-2xl transition group-hover:scale-125" />
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-orange-400/15 text-orange-500">
                  {/* notebook icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A2.5 2.5 0 0 1 19 5.5V20a1 1 0 0 1-1 1H7.5A1.5 1.5 0 0 1 6 19.5v-15Z"/><path d="M6 7.5h-1A1.5 1.5 0 0 0 3.5 9v6A1.5 1.5 0 0 0 5 16.5h1v-9Z"/></svg>
                </div>
                <h3 className="text-lg font-semibold">Journal</h3>
              </div>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">Write freely. Get clarity. Entries sync to your account.</p>
              <div className="mt-4 h-20 rounded-xl bg-gradient-to-br from-orange-400/20 to-orange-400/5" />
            </div>

            {/* Pomodoro */}
            <div className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 p-6 transition hover:shadow-lg">
              <div className="absolute -top-10 -right-10 h-24 w-24 rounded-full bg-pink-400/10 blur-2xl transition group-hover:scale-125" />
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-pink-400/15 text-pink-500">
                  {/* timer icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M9 2.25a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5H9Z"/><path fillRule="evenodd" d="M12 4.5a8.25 8.25 0 1 0 8.25 8.25A8.25 8.25 0 0 0 12 4.5Zm0 3a.75.75 0 0 1 .75.75v3.75h3a.75.75 0 0 1 0 1.5h-3.75A.75.75 0 0 1 12 12V8.25A.75.75 0 0 1 12 7.5Z" clipRule="evenodd"/></svg>
                </div>
                <h3 className="text-lg font-semibold">Pomodoro</h3>
              </div>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">Work in focused intervals with intentional breaks built-in.</p>
              <div className="mt-4 h-20 rounded-xl bg-gradient-to-br from-pink-400/20 to-pink-400/5" />
            </div>
          </div>
        </section>
      </div>
      <footer className="border-t border-gray-200 dark:border-gray-800 py-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} BreakPoint — Built with ❤️ for developers.
      </footer>
    </main>
  );
}

