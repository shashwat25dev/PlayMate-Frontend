import { useStore } from './store'
import Header from './components/Header'
import Toasts from './components/Toasts'
import Modal from './components/Modal'
import VenueSheet from './components/VenueSheet'
import Home from './components/Home'
import Players from './components/Players'
import Bookings from './components/Bookings'
import Profile from './components/Profile'
import Owner from './components/Owner'

export default function App() {
  const { view, sheet, openVenue } = useStore()
  const Page = { home: Home, players: Players, bookings: Bookings, profile: Profile, owner: Owner }[view]
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-5 md:pb-8"><Page /></main>
      {sheet && <Modal onClose={() => openVenue(null)}><VenueSheet key={sheet.id} venue={sheet} /></Modal>}
      <Toasts />
    </>
  )
}
