export default function Logo({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="bp_grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#A5B4FC" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="52" height="52" rx="12" fill="url(#bp_grad)" opacity="0.15" />
      <path d="M20 18h12c7 0 12 4 12 10s-5 10-12 10h-6v8h-6V18Zm12 14c3.3 0 6-1.8 6-4s-2.7-4-6-4h-6v8h6Z" fill="url(#bp_grad)" />
      <circle cx="46" cy="46" r="6" fill="#10B981" />
    </svg>
  );
}

