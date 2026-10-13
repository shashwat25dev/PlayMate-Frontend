import { useMemo, useState } from 'react'
import { HOURS, VENUES, isTaken } from '../data'
import { useStore } from '../store'
import CourtArt from './CourtArt'
import type { Sport } from '../types'

type Sort = 'rating' | 'dist' | 'price'
const SPORT_LIST: (Sport | 'All')[] = ['All', 'Football', 'Cricket', 'Badminton', 'Tennis', 'Basketball', 'Padel']

export default function Home() {
  const { openVenue, favs, toggleFav, blocked, toast } = useStore()
  const [q, setQ] = useState(''); const [sport, setSport] = useState<Sport | 'All'>('All')
  const [dist, setDist] = useState(10); const [price, setPrice] = useState(1600); const [sort, setSort] = useState<Sort>('rating')

  const list = useMemo(() => VENUES
    .filter(v => (sport === 'All' || v.sport === sport) && v.dist <= dist && v.price <= price && (v.name + v.area).toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => sort === 'rating' ? b.rating - a.rating : sort === 'dist' ? a.dist - b.dist : a.price - b.price), [q, sport, dist, price, sort])
  const reset = () => { setQ(''); setSport('All'); setDist(10); setPrice(1600); toast('Filters cleared') }

  return (
    <>
      <h1>Grounds near Kanpur</h1>
      <p className="text-mut">Filter by sport, how far you will travel and what you will pay.</p>
      <div className="my-4 grid gap-3 rounded-md border border-line bg-card p-4">
        <input className="field" placeholder="Search venue or area" aria-label="Search" value={q} onChange={e => setQ(e.target.value)} />
        <div className="flex flex-wrap gap-2">
          {SPORT_LIST.map(s => <button key={s} className={`chip ${sport === s ? 'chip-on' : ''}`} onClick={() => setSport(s)}>{s}</button>)}
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div><label className="label">Within <b>{dist}</b> km</label><input type="range" min={1} max={10} value={dist} onChange={e => setDist(+e.target.value)} className="w-full accent-pri" /></div>
          <div><label className="label">Up to ₹<b>{price}</b> /hr</label><input type="range" min={300} max={1600} step={50} value={price} onChange={e => setPrice(+e.target.value)} className="w-full accent-pri" /></div>
          <div><label className="label">Sort by</label>
            <select className="field" value={sort} onChange={e => setSort(e.target.value as Sort)}>
              <option value="rating">Top rated</option><option value="dist">Nearest</option><option value="price">Cheapest</option>
            </select></div>
        </div>
      </div>

      {list.length === 0 ? (
        <div className="rounded-md border-[1.5px] border-dashed border-line px-4 py-10 text-center">
          <h3>Nothing fits those filters</h3>
          <p className="mb-3 text-mut">Widen the distance or raise the budget{sport !== 'All' && `, or look beyond ${sport}`}.</p>
          <button className="btn" onClick={reset}>Reset filters</button>
        </div>
      ) : (
        <>
          <p className="mb-1 text-sm text-mut">{list.length} of {VENUES.length} venues</p>
          <div className="border-t border-line">
            {list.map(v => (
              <article key={v.id} tabIndex={0} onClick={() => openVenue(v)} onKeyDown={e => e.key === 'Enter' && openVenue(v)}
                className="group grid cursor-pointer grid-cols-[92px_1fr_auto] items-center gap-3 border-b border-line py-3.5 md:grid-cols-[132px_1fr_auto] md:gap-4">
                <CourtArt sport={v.sport} className="h-[68px] md:h-[84px]" />
                <div><h3 className="group-hover:text-pri">{v.name}</h3>
                  <div className="text-sm text-mut">{v.sport}, {v.area}, {v.dist} km</div>
                  <div className="text-sm text-mut">{HOURS.filter(h => !isTaken(v.id, 0, h, blocked)).length} slots open today, rated {v.rating}</div></div>
                <div className="flex flex-col items-end gap-0.5">
                  <span className="font-display text-2xl font-bold">₹{v.price}</span><span className="text-sm text-mut">per hour</span>
                  <button className="cursor-pointer font-semibold text-pri underline" onClick={e => { e.stopPropagation(); toggleFav(v.id) }}>{favs.includes(v.id) ? 'Saved' : 'Save'}</button>
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </>
  )
}
