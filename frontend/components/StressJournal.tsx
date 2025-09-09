"use client";
import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function StressJournal() {
  const [entry, setEntry] = useState('');
  const [saving, setSaving] = useState(false);
  const [entries, setEntries] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await api.journal.list();
        setEntries(data || []);
      } catch {}
    })();
  }, []);

  async function save() {
    setSaving(true);
    try {
      const created = await api.journal.create(entry);
      setEntry('');
      setEntries((e) => [created, ...e]);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h2 className="font-semibold">Stress Journal</h2>
      <p className="mt-1 text-sm text-gray-500">Write freely, no judgments.</p>
      <textarea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="What are you feeling right now?"
        className="mt-4 min-h-[120px] w-full resize-y rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent p-3 focus:outline-none focus:ring-2 focus:ring-brand"
      />
      <div className="mt-3 flex justify-end">
        <button onClick={save} className="btn-primary" disabled={saving || !entry.trim()}>
          {saving ? 'Saving…' : 'Save Entry'}
        </button>
      </div>
      <div className="mt-6 space-y-3">
        {entries.map((it) => (
          <div key={it._id} className="rounded-lg border border-gray-200 dark:border-gray-800 p-3">
            <div className="text-xs text-gray-500">{new Date(it.createdAt).toLocaleString()}</div>
            <div className="mt-1 whitespace-pre-wrap text-sm">{it.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

