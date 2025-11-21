export function HangingLantern({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 140" className={className} fill="currentColor">
      <path d="M45 0 H55 V10 H45 Z" fill="#d97706" />
      <path d="M20 30 Q50 5 80 30 L90 40 H10 L20 30 Z" fill="#b45309" />
      <path d="M10 40 H90 L80 100 H20 L10 40 Z" fill="url(#lanternGradient)" stroke="#d97706" strokeWidth="2" />
      <path d="M20 100 L50 130 L80 100 Z" fill="#b45309" />
      <path d="M30 50 H70 L65 90 H35 L30 50 Z" fill="#fffbeb" opacity="0.8" />
      <defs>
        <linearGradient id="lanternGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
    </svg>
  )
}
