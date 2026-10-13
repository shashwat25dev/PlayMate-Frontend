import { useState } from 'react'
import { HOURS, dayName, fmtHour, isTaken, slotPrice } from '../data'
import { useStore } from '../store'
import type { Venue } from '../types'
import CourtArt from './CourtArt'
import SlotButton from './SlotButton'

export default function VenueSheet({ venue: v }: { venue: Venue }) {
  const { book, openVenue, blocked, go } = useStore()
  const [day, setDay] = useState(0); const [slot, setSlot] = useState<number | null>(null)
  const [split, setSplit] = useState(1); const [done, setDone] = useState<{ day: number; hour: number; price: number } | null>(null)
  const price = slot !== null ? slotPrice(v, slot) : 0

  if (done) return (
    <div className="m-5 rounded border-[1.5px] border-dashed border-mut bg-card p-8 text-center">
      <span className="text-sm text-mut">Ref PM-{String(Date.now()).slice(-5)}</span>
      <h2>Slot confirmed</h2>
      <p>{v.name}<br />{dayName(done.day)}, {fmtHour(done.hour)}<br /><b>₹{done.price}</b>{split > 1 && ` (₹${Math.ceil(done.price / split)} each for ${split})`}</p>
      <div className="mt-3 flex justify-center gap-2">
        <button className="btn" onClick={() => { openVenue(null); go('bookings') }}>View bookings</button>
        <button className="btn btn-ghost" onClick={() => openVenue(null)}>Done</button>
      </div>
    </div>
  )
  return (
    <>
      <CourtArt sport={v.sport} className="h-44 !rounded-none" />
      <div className="flex gap-2 overflow-auto px-4 py-2">
        {['Pitch', 'Entrance', 'Changing room', 'Parking'].map((p, i) => (
          <CourtArt key={p} sport={v.sport} className="h-14 w-[90px] flex-none p-1 text-[11px] text-white"><span className="relative" style={{ opacity: 1 }}>{p}</span></CourtArt>
        ))}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between"><h2>{v.name}</h2><button className="btn btn-ghost" onClick={() => openVenue(null)}>Close</button></div>
        <p className="text-mut">{v.area} · {v.dist} km · ★ {v.rating} · from ₹{v.price}/hr</p>
        <div className="my-3 flex flex-wrap gap-2">{v.amenities.map(a => <span key={a} className="badge">{a}</span>)}</div>
        <label className="label">Pick a day</label>
        <div className="mb-3 flex gap-2 overflow-auto">
          {[0, 1, 2, 3, 4].map(d => <button key={d} className={`chip ${day === d ? 'chip-on' : ''}`} onClick={() => { setDay(d); setSlot(null) }}>{dayName(d)}</button>)}
        </div>
        <label className="label">Available slots <span className="font-normal">(evening is peak, +25%)</span></label>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(98px,1fr))] gap-2">
          {HOURS.map(h => {
            const taken = isTaken(v.id, day, h, blocked)
            return <SlotButton key={h} label={fmtHour(h)} sub={taken ? 'Booked' : `₹${slotPrice(v, h)}`} disabled={taken}
              state={taken ? 'booked' : slot === h ? 'selected' : 'open'} onClick={() => setSlot(h)} />
          })}
        </div>
        {slot === null ? <p className="mt-3 text-mut">Select a slot to see the price.</p> : (
          <div className="mt-4 rounded-md border border-line bg-card p-4">
            <div className="flex items-center justify-between"><b>{dayName(day)}, {fmtHour(slot)} to {fmtHour(slot + 1)}</b><span className="font-display text-2xl font-bold">₹{price}</span></div>
            <div className="my-3 flex items-center justify-between"><span>Split between</span>
              <span className="flex items-center gap-2">
                <button className="chip" aria-label="Fewer" onClick={() => setSplit(s => Math.max(1, s - 1))}>−</button><b>{split}</b>
                <button className="chip" aria-label="More" onClick={() => setSplit(s => Math.min(12, s + 1))}>+</button></span></div>
            <p className="text-sm text-mut">{split > 1 ? `Each player pays ₹${Math.ceil(price / split)}` : 'Paying solo. Add players to split the cost.'}</p>
            <button className="btn mt-3 w-full" onClick={() => { book(v, day, slot, price); setDone({ day, hour: slot, price }) }}>Confirm booking · ₹{price}</button>
          </div>
        )}
      </div>
    </>
  )
}
