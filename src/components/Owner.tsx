import { useState } from 'react'
import { HOURS, VENUES, dayName, fmtHour, seededTaken, slotKey, slotPrice } from '../data'
import { useStore } from '../store'
import SlotButton from './SlotButton'

export default function Owner() {
  const { blocked, toggleBlock } = useStore()
  const v = VENUES[0]; const [day, setDay] = useState(0)
  const booked = HOURS.filter(h => seededTaken(v.id, day, h))
  const revenue = booked.reduce((a, h) => a + slotPrice(v, h), 0)
  const mine = blocked.filter(k => k.startsWith(`${v.id}-`)).length
  const stats: [string, string][] = [[`₹${revenue}`, 'Revenue'], [`${Math.round((booked.length / HOURS.length) * 100)}%`, 'Occupancy'], [String(mine), 'Blocked or booked in app']]
  return (
    <>
      <h1>Owner dashboard</h1>
      <p className="text-mut">{v.name}. Tap an open slot to block it for maintenance.</p>
      <div className="my-3 grid grid-cols-3 gap-3">
        {stats.map(([n, l]) => <div key={l} className="rounded-md border border-line bg-card p-4 text-center"><b className="block font-display text-3xl">{n}</b><span className="text-sm text-mut">{l}</span></div>)}
      </div>
      <div className="mb-3 flex gap-2">{[0, 1, 2].map(d => <button key={d} className={`chip ${day === d ? 'chip-on' : ''}`} onClick={() => setDay(d)}>{dayName(d)}</button>)}</div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(98px,1fr))] gap-2">
        {HOURS.map(h => {
          const cust = seededTaken(v.id, day, h), bl = blocked.includes(slotKey(v.id, day, h))
          return <SlotButton key={h} label={fmtHour(h)} disabled={cust} state={cust ? 'booked' : bl ? 'selected' : 'open'}
            sub={cust ? 'Customer' : bl ? 'Blocked' : `Open ₹${slotPrice(v, h)}`} onClick={() => toggleBlock(slotKey(v.id, day, h))} />
        })}
      </div>
    </>
  )
}
