import { dayName, fmtHour } from '../data'
import { useStore } from '../store'
import type { Booking } from '../types'

function Row({ b }: { b: Booking }) {
  const { cancel, openVenue } = useStore()
  const up = b.status === 'up'
  const tone = up ? 'bg-[#CFEBDD] text-[#0F4D36]' : b.status === 'cancelled' ? 'bg-[#F6D3CC] text-[#8A2616]' : ''
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-line bg-card p-4">
      <div><h3>{b.venue.name}</h3><div className="text-sm text-mut">{dayName(b.day)} · {fmtHour(b.hour)} · ₹{b.paid}</div></div>
      <div className="flex items-center gap-2">
        <span className={`badge ${tone}`}>{up ? 'Upcoming' : b.status === 'cancelled' ? 'Cancelled' : 'Completed'}</span>
        {up ? <button className="btn btn-bad" onClick={() => window.confirm(`Cancel this booking at ${b.venue.name}?`) && cancel(b.id)}>Cancel</button>
          : <button className="btn btn-ghost" onClick={() => openVenue(b.venue)}>Book again</button>}
      </div>
    </div>
  )
}

export default function Bookings() {
  const { bookings, go } = useStore()
  const upcoming = bookings.filter(b => b.status === 'up'), past = bookings.filter(b => b.status !== 'up')
  const Section = ({ title, items, empty }: { title: string; items: Booking[]; empty: React.ReactNode }) => (
    <section className="mt-5"><h2 className="mb-2">{title}</h2>
      {items.length ? <div className="grid gap-3 md:grid-cols-2">{items.map(b => <Row key={b.id} b={b} />)}</div>
        : <div className="rounded-md border border-line bg-card p-6 text-center text-mut">{empty}</div>}
    </section>
  )
  return (
    <>
      <h1>My bookings</h1>
      <Section title="Upcoming" items={upcoming} empty={<>Nothing booked. <button className="font-semibold text-pri underline" onClick={() => go('home')}>Find a venue</button></>} />
      <Section title="Past" items={past} empty="No past bookings yet." />
    </>
  )
}
