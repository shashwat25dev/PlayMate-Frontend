import { useStore } from '../store'
import type { View } from '../types'

export default function Header() {
  const { view, go, owner } = useStore()
  const tabs: [View, string][] = [['home', 'Venues'], ['players', 'Players'], ['bookings', 'Bookings'], ['profile', 'Profile']]
  if (owner) tabs.push(['owner', 'Owner'])
  return (
    <header className="sticky top-[env(safe-area-inset-top)] z-10 border-b border-line bg-bg">
      <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-2.5">
        <div className="font-display text-2xl font-bold text-pri">Play<b className="text-ink">Mate</b></div>
        <nav className="fixed inset-x-0 bottom-0 z-20 flex justify-around border-t border-line bg-card p-1.5 pb-[calc(0.375rem+env(safe-area-inset-bottom))] md:static md:ml-auto md:justify-start md:gap-1 md:border-0 md:bg-transparent md:p-0">
          {tabs.map(([k, label]) => (
            <button key={k} onClick={() => go(k)}
              className={`flex-1 cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold md:flex-none md:text-base ${view === k ? 'bg-pri text-on' : 'text-mut'}`}>{label}</button>
          ))}
        </nav>
      </div>
    </header>
  )
}
