import { SPORTS } from '../data'
import { useStore } from '../store'
import type { Sport } from '../types'

export default function Profile() {
  const { bookings, favs, owner, toggleOwner } = useStore()
  const by: Partial<Record<Sport, number>> = { Football: 12, Badminton: 9, Cricket: 5, Tennis: 3 }
  bookings.filter(b => b.status !== 'cancelled').forEach(b => { by[b.venue.sport] = (by[b.venue.sport] ?? 0) + 1 })
  const entries = Object.entries(by) as [Sport, number][]
  const total = entries.reduce((a, [, n]) => a + n, 0), max = Math.max(...entries.map(([, n]) => n))
  const stats: [string | number, string][] = [[total, 'Games played'], ['96%', 'Show-up rate'], [bookings.filter(b => b.status === 'up').length, 'Upcoming'], [favs.length, 'Saved venues']]
  return (
    <>
      <div className="flex flex-wrap items-center gap-4 rounded-md border border-line bg-card p-4">
        <div className="grid size-[72px] place-items-center rounded-md bg-pri font-display text-3xl font-bold text-on">AS</div>
        <div className="flex-1"><h2>Aarav Singh</h2><div className="text-sm text-mut">Kanpur · Plays weekends · Level: Intermediate</div>
          <div className="mt-1.5 flex flex-wrap gap-1.5">{entries.map(([s]) => <span key={s} className="badge">{s}</span>)}</div></div>
        <button className="btn btn-ghost" onClick={toggleOwner}>{owner ? 'Switch to player view' : 'Switch to owner view'}</button>
      </div>
      <div className="my-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map(([n, l]) => <div key={l} className="rounded-md border border-line bg-card p-4 text-center"><b className="block font-display text-4xl">{n}</b><span className="text-sm text-mut">{l}</span></div>)}
      </div>
      <div className="rounded-md border border-line bg-card p-4"><h3>Games by sport</h3>
        {entries.map(([s, n]) => (
          <div key={s} className="my-2.5"><div className="flex justify-between"><span>{s}</span><b>{n}</b></div>
            <div className="h-2.5 overflow-hidden rounded bg-line"><i className="block h-full" style={{ width: `${(n / max) * 100}%`, background: SPORTS[s].color }} /></div></div>
        ))}
      </div>
    </>
  )
}
