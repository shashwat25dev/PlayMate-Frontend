import { SPORTS } from '../data'
import type { Sport } from '../types'
export default function CourtArt({ sport, className = '', children }: { sport: Sport; className?: string; children?: React.ReactNode }) {
  return (
    <div className={`relative overflow-hidden rounded ${className}`} style={{ background: SPORTS[sport].color }}>
      <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice" fill="none" stroke="rgba(255,255,255,.75)" strokeWidth="1.6"
        className="absolute inset-0 h-full w-full" dangerouslySetInnerHTML={{ __html: SPORTS[sport].art }} />
      {children}
    </div>
  )
}
