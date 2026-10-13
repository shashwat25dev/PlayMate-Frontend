import { useState } from 'react'
import { SPORTS, VENUES } from '../data'
import { useStore } from '../store'
import type { Sport } from '../types'
import Modal from './Modal'

export default function Players() {
  const { games, toggleJoin, delGame, addGame, toast } = useStore()
  const [open, setOpen] = useState(false)
  const [f, setF] = useState({ title: '', when: '', sport: 'Football' as Sport, level: 'Casual', venueId: 1, need: 2 })
  const save = () => {
    if (!f.title.trim() || !f.when.trim()) return toast('Add a title and a time first')
    addGame({ title: f.title.trim(), when: f.when.trim(), sport: f.sport, level: f.level, need: f.need || 1, venue: VENUES.find(v => v.id === f.venueId)! })
    setOpen(false); setF({ ...f, title: '', when: '' })
  }
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <div><h1>Find players</h1><p className="text-mut">Games near you that need one more.</p></div>
        <button className="btn" onClick={() => setOpen(true)}>Post a game</button>
      </div>
      <div className="mt-4 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        {games.map(g => (
          <div key={g.id} className="rounded-md border border-line bg-card p-4">
            <div className="flex justify-between"><span className="badge">{g.sport}</span><span className="badge">{g.level}</span></div>
            <h3 className="mt-2">{g.title}</h3>
            <div className="text-sm text-mut">{g.venue.name} · {g.when}</div>
            <div className="text-sm text-mut">Hosted by {g.host} · <b>{g.need} spot{g.need > 1 ? 's' : ''} left</b></div>
            {g.mine
              ? <button className="btn btn-bad mt-3 w-full" onClick={() => delGame(g.id)}>Remove my game</button>
              : <button className={`btn mt-3 w-full ${g.requested ? '!bg-acc !text-black' : ''}`} onClick={() => toggleJoin(g.id)}>{g.requested ? 'Request Sent' : 'Join'}</button>}
          </div>
        ))}
      </div>
      {open && (
        <Modal onClose={() => setOpen(false)}>
          <div className="p-4">
            <h2>Post a game</h2>
            <div className="my-3 grid grid-cols-2 gap-3">
              <div className="col-span-2"><label className="label">Title</label><input className="field" placeholder="e.g. Friday night 5-a-side" value={f.title} onChange={e => setF({ ...f, title: e.target.value })} /></div>
              <div><label className="label">Sport</label><select className="field" value={f.sport} onChange={e => setF({ ...f, sport: e.target.value as Sport })}>{Object.keys(SPORTS).map(s => <option key={s}>{s}</option>)}</select></div>
              <div><label className="label">Level</label><select className="field" value={f.level} onChange={e => setF({ ...f, level: e.target.value })}>{['Casual', 'Beginner', 'Intermediate', 'Competitive'].map(l => <option key={l}>{l}</option>)}</select></div>
              <div><label className="label">Venue</label><select className="field" value={f.venueId} onChange={e => setF({ ...f, venueId: +e.target.value })}>{VENUES.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}</select></div>
              <div><label className="label">When</label><input className="field" placeholder="Sat 6 PM" value={f.when} onChange={e => setF({ ...f, when: e.target.value })} /></div>
              <div><label className="label">Players needed</label><input className="field" type="number" min={1} max={20} value={f.need} onChange={e => setF({ ...f, need: +e.target.value })} /></div>
            </div>
            <div className="flex gap-2"><button className="btn" onClick={save}>Post game</button><button className="btn btn-ghost" onClick={() => setOpen(false)}>Cancel</button></div>
          </div>
        </Modal>
      )}
    </>
  )
}
