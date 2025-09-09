"use client";
import { useEffect, useRef, useState } from 'react';

function format(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function PomodoroTimer() {
  const [duration, setDuration] = useState(25 * 60);
  const [remaining, setRemaining] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, [running]);

  useEffect(() => {
    if (remaining === 0) setRunning(false);
  }, [remaining]);

  function reset(newDuration?: number) {
    const d = newDuration ?? duration;
    setDuration(d);
    setRemaining(d);
    setRunning(false);
  }

  return (
    <div>
      <h2 className="font-semibold">Pomodoro Timer</h2>
      <p className="mt-1 text-sm text-gray-500">Stay focused with structured breaks</p>
      <div className="mt-4 flex items-center gap-4">
        <div className="h-20 w-28 grid place-items-center rounded-lg border border-gray-200 dark:border-gray-800 text-2xl font-bold">
          {format(remaining)}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <button className="btn-primary" onClick={() => setRunning((v) => !v)}>
            {running ? 'Pause' : 'Start'}
          </button>
          <button
            className="rounded-lg border px-3 py-2 border-gray-200 dark:border-gray-800"
            onClick={() => reset()}
          >
            Reset
          </button>
          <select
            value={duration}
            onChange={(e) => reset(Number(e.target.value))}
            className="rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-2 py-1"
          >
            <option value={25 * 60}>25m Focus</option>
            <option value={50 * 60}>50m Focus</option>
            <option value={5 * 60}>5m Break</option>
            <option value={10 * 60}>10m Break</option>
          </select>
        </div>
      </div>
    </div>
  );
}

