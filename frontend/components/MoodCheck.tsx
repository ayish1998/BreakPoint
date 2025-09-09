"use client";
import { useState } from 'react';

const MOODS = [
  { id: 'great', label: 'Great', color: 'text-emerald-500' },
  { id: 'ok', label: 'Okay', color: 'text-brand' },
  { id: 'stressed', label: 'Stressed', color: 'text-orange-500' },
  { id: 'burned', label: 'Burned out', color: 'text-red-500' },
];

export default function MoodCheck() {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div>
      <h2 className="font-semibold">Mood Check</h2>
      <p className="mt-1 text-sm text-gray-500">How are you feeling?</p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {MOODS.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelected(m.id)}
            className={`rounded-lg border px-3 py-2 text-left transition-colors ${
              selected === m.id
                ? 'border-brand bg-brand/10'
                : 'border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            <div className={`font-medium ${m.color}`}>{m.label}</div>
            <div className="text-xs text-gray-500">Tap to select</div>
          </button>
        ))}
      </div>
    </div>
  );
}

