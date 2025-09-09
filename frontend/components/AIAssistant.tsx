"use client";
import { useState } from 'react';
import { api } from '../lib/api';

export default function AIAssistant() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [includeJournal, setIncludeJournal] = useState(false);

  async function send() {
    if (!input.trim()) return;
    const question = input;
    setInput('');
    setMessages((m) => [...m, { role: 'user', content: question }]);
    setLoading(true);
    try {
      setError(null);
      const response = await api.ai.chat(
        messages.concat({ role: 'user', content: question })
      );
      setMessages((m) => [...m, { role: 'assistant', content: response.content }]);
    } catch (e: any) {
      setError(e?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold">AI Assistant</h2>
        <div className="flex items-center gap-2 text-xs">
          <label className="opacity-70">Mode</label>
          <select
            value={depth}
            onChange={(e) => setDepth(e.target.value as any)}
            className="rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-2 py-1"
          >
            <option value="fast">Fast (gpt-oss-20b)</option>
            <option value="deep">Deep (gpt-oss-120b)</option>
          </select>
        </div>
      </div>

      {error && <div className="mt-2 text-sm text-red-500">{error}</div>}
      <div className="mt-3 max-h-56 overflow-auto space-y-2">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
              m.role === 'assistant'
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100'
                : 'bg-brand text-white'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2 text-xs">
          <label className="flex items-center gap-1">
            <input type="checkbox" checked={includeJournal} onChange={(e)=>setIncludeJournal(e.target.checked)} />
            Include journal context
          </label>
        </div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Ask for a quick tip or reflective prompt…"
          className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
        />
        <button className="btn-primary" onClick={send} disabled={loading}>
          {loading ? 'Thinking…' : 'Send'}
        </button>
      </div>
    </div>
  );
}

