import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Booking, Game, Venue, View } from './types'
import { INITIAL_BOOKINGS, INITIAL_GAMES, slotKey } from './data'

interface Store {
  view: View; go: (v: View) => void
  toasts: { id: number; msg: string }[]; toast: (m: string) => void
  sheet: Venue | null; openVenue: (v: Venue | null) => void
  bookings: Booking[]; book: (v: Venue, day: number, hour: number, paid: number) => void; cancel: (id: number) => void
  games: Game[]; toggleJoin: (id: number) => void; addGame: (g: Omit<Game, 'id' | 'requested' | 'mine' | 'host'>) => void; delGame: (id: number) => void
  favs: number[]; toggleFav: (id: number) => void
  blocked: string[]; toggleBlock: (key: string) => void
  owner: boolean; toggleOwner: () => void
}
const Ctx = createContext<Store>(null!)
export const useStore = () => useContext(Ctx)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<View>('home')
  const [toasts, setToasts] = useState<Store['toasts']>([])
  const [sheet, openVenue] = useState<Venue | null>(null)
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS)
  const [games, setGames] = useState(INITIAL_GAMES)
  const [favs, setFavs] = useState<number[]>([])
  const [blocked, setBlocked] = useState<string[]>([])
  const [owner, setOwner] = useState(false)

  const toast = (msg: string) => {
    const id = Date.now() + Math.random()
    setToasts(t => [...t, { id, msg }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2400)
  }
  const go = (v: View) => { setView(v); window.scrollTo(0, 0) }
  const toggle = <T,>(list: T[], x: T) => (list.includes(x) ? list.filter(i => i !== x) : [...list, x])

  const value: Store = {
    view, go, toasts, toast, sheet, openVenue, bookings, games, favs, blocked, owner,
    book: (venue, day, hour, paid) => {
      setBookings(b => [{ id: Date.now(), venue, day, hour, paid, status: 'up' }, ...b])
      setBlocked(b => [...b, slotKey(venue.id, day, hour)]); toast('Booking confirmed')
    },
    cancel: id => {
      const b = bookings.find(x => x.id === id)!
      setBookings(l => l.map(x => (x.id === id ? { ...x, status: 'cancelled' } : x)))
      setBlocked(l => l.filter(k => k !== slotKey(b.venue.id, b.day, b.hour))); toast('Booking cancelled. Refund in 3 days')
    },
    toggleJoin: id => {
      const g = games.find(x => x.id === id)!
      setGames(l => l.map(x => (x.id === id ? { ...x, requested: !x.requested } : x)))
      toast(g.requested ? 'Request withdrawn' : `Request sent to ${g.host}`)
    },
    addGame: g => { setGames(l => [{ ...g, id: Date.now(), requested: false, mine: true, host: 'You' }, ...l]); toast('Game posted') },
    delGame: id => { setGames(l => l.filter(x => x.id !== id)); toast('Game removed') },
    toggleFav: id => { toast(favs.includes(id) ? 'Removed from saved' : 'Saved venue'); setFavs(f => toggle(f, id)) },
    toggleBlock: key => { toast(blocked.includes(key) ? 'Slot reopened' : 'Slot blocked'); setBlocked(b => toggle(b, key)) },
    toggleOwner: () => {
      toast(owner ? 'Back to player view' : 'Owner view on. See the new Owner tab')
      if (owner && view === 'owner') setView('profile')
      setOwner(o => !o)
    },
    openVenue,
  }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
