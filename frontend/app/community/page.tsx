"use client";
import { useEffect, useState } from 'react';
import { api } from '../../lib/api';

export default function CommunityPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  async function load() {
    try {
      const data = await api.community.list();
      setPosts(data || []);
    } catch {}
  }

  useEffect(() => { load(); }, []);

  async function submit() {
    setLoading(true);
    try {
      await api.community.create(title, content);
      setTitle('');
      setContent('');
      await load();
    } finally {
      setLoading(false);
    }
  }

  async function upvote(id: string) {
    await api.community.upvote(id);
    await load();
  }

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-semibold">Community</h1>
        <p className="text-sm text-gray-500">Share coping strategies and tips</p>

        <div className="mt-6 card p-4 space-y-3">
          <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title" className="w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2" />
          <textarea value={content} onChange={(e)=>setContent(e.target.value)} placeholder="What helped you manage stress?" className="min-h-[100px] w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent p-3" />
          <div className="flex justify-end">
            <button className="btn-primary" onClick={submit} disabled={loading || !title || !content}>{loading?'Posting…':'Post'}</button>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {posts.map((p)=> (
            <div key={p._id} className="rounded-lg border border-gray-200 dark:border-gray-800 p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{p.title}</h3>
                <button onClick={()=>upvote(p._id)} className="rounded-md border px-2 py-1 text-xs border-gray-200 dark:border-gray-800">▲ {p.upvotes || 0}</button>
              </div>
              <div className="mt-1 whitespace-pre-wrap text-sm">{p.content}</div>
              {p.tags?.length ? <div className="mt-2 text-xs opacity-60">{p.tags.join(', ')}</div> : null}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

