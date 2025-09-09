"use client";
import { useEffect, useRef, useState } from 'react';

export default function BreathingExercise() {
  const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [secondsLeft, setSecondsLeft] = useState(4);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function next() {
      setPhase((prev) => (prev === 'Inhale' ? 'Hold' : prev === 'Hold' ? 'Exhale' : 'Inhale'));
      setSecondsLeft((prev) => (phase === 'Inhale' ? 7 : phase === 'Hold' ? 8 : 4));
    }

    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          next();
          return s; // will be replaced by next's set
        }
        return s - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [phase]);

  return (
    <div>
      <h2 className="font-semibold">Breathing Exercise</h2>
      <p className="mt-1 text-sm text-gray-500">4-7-8 method to reduce stress</p>
      <div className="mt-4 flex items-center gap-4">
        <div className="h-24 w-24 rounded-full bg-brand/20 grid place-items-center text-brand text-xl font-bold animate-pulse">
          {secondsLeft}
        </div>
        <div className="text-xl font-semibold">{phase}</div>
      </div>
    </div>
  );
}

