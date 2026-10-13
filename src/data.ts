import type { Booking, Game, Sport, Venue } from './types'

const box = '<rect x="6" y="6" width="188" height="108"/>'
export const SPORTS: Record<Sport, { color: string; art: string }> = {
  Football: { color: '#1E7A4F', art: box + '<path d="M100 6v108"/><circle cx="100" cy="60" r="16"/><rect x="6" y="34" width="28" height="52"/><rect x="166" y="34" width="28" height="52"/>' },
  Cricket: { color: '#2F7D6B', art: box + '<circle cx="100" cy="60" r="46"/><rect x="90" y="22" width="20" height="76"/><path d="M90 30h20M90 90h20"/>' },
  Badminton: { color: '#C9822B', art: box + '<rect x="18" y="18" width="164" height="84"/><path d="M100 6v108M18 60h164M60 18v84M140 18v84"/>' },
  Tennis: { color: '#B5512F', art: box + '<rect x="6" y="20" width="188" height="80"/><path d="M100 6v108M52 20v80M148 20v80M52 60h96"/>' },
  Basketball: { color: '#C26A2C', art: box + '<path d="M100 6v108M6 36h44v48H6M194 36h-44v48h44"/><circle cx="100" cy="60" r="14"/>' },
  Padel: { color: '#2E6F9E', art: box + '<path d="M100 6v108M44 6v108M156 6v108M44 60h112"/>' },
}
const v = (id: number, name: string, sport: Sport, price: number, dist: number, rating: number, area: string, am: string): Venue =>
  ({ id, name, sport, price, dist, rating, area, amenities: am.split(',') })
export const VENUES: Venue[] = [
  v(1, 'Greenfield Turf', 'Football', 1200, 2.1, 4.7, 'Civil Lines', 'Floodlights,Parking,Showers'),
  v(2, 'Shuttle Hub Arena', 'Badminton', 400, 1.4, 4.5, 'Swaroop Nagar', 'Wooden court,AC,Rackets on rent'),
  v(3, 'Kanpur Cricket Nets', 'Cricket', 800, 3.8, 4.2, 'Kalyanpur', 'Bowling machine,Pavilion'),
  v(4, 'Ace Tennis Club', 'Tennis', 650, 5.2, 4.8, 'Arya Nagar', 'Clay court,Coach available'),
  v(5, 'Hoops Yard', 'Basketball', 500, 2.9, 4.1, 'Kidwai Nagar', 'Open air,Scoreboard'),
  v(6, 'Smash Padel', 'Padel', 1500, 7.5, 4.6, 'Govind Nagar', 'Glass court,Lockers,Cafe'),
  v(7, 'Rush Arena 5-a-side', 'Football', 900, 6.3, 4.0, 'Barra', 'Floodlights,Bibs provided'),
  v(8, 'Smash Shuttle Zone', 'Badminton', 350, 9.8, 3.9, 'Panki', 'Parking,Water'),
]
export const HOURS = [6, 7, 8, 9, 16, 17, 18, 19, 20, 21]
export const fmtHour = (h: number) => `${h % 12 || 12} ${h < 12 ? 'AM' : 'PM'}`
export const dayName = (i: number) =>
  i < 0 ? `${-i} days ago` : i === 0 ? 'Today' : i === 1 ? 'Tomorrow'
  : new Date(Date.now() + i * 864e5).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
export const slotKey = (venueId: number, day: number, hour: number) => `${venueId}-${day}-${hour}`
/** Seeded "already booked by someone else" pattern */
export const seededTaken = (venueId: number, day: number, hour: number) => (venueId * 7 + hour * 3 + day * 5) % 4 === 0
export const isTaken = (venueId: number, day: number, hour: number, blocked: string[]) =>
  seededTaken(venueId, day, hour) || blocked.includes(slotKey(venueId, day, hour))
export const slotPrice = (ven: Venue, hour: number) => Math.round((ven.price * (hour >= 18 ? 1.25 : 1)) / 10) * 10

export const INITIAL_BOOKINGS: Booking[] = [
  { id: 101, venue: VENUES[0], day: 2, hour: 18, paid: 1500, status: 'up' },
  { id: 102, venue: VENUES[1], day: 4, hour: 7, paid: 400, status: 'up' },
  { id: 103, venue: VENUES[3], day: -3, hour: 17, paid: 650, status: 'past' },
  { id: 104, venue: VENUES[4], day: -9, hour: 19, paid: 620, status: 'past' },
]
const g = (id: number, title: string, sport: Sport, venue: Venue, when: string, need: number, level: string, host: string): Game =>
  ({ id, title, sport, venue, when, need, level, host, requested: false })
export const INITIAL_GAMES: Game[] = [
  g(1, 'Sunday 5-a-side, need keeper', 'Football', VENUES[0], 'Sun 7 PM', 2, 'Casual', 'Rohit'),
  g(2, 'Doubles partner wanted', 'Badminton', VENUES[1], 'Tomorrow 7 AM', 1, 'Intermediate', 'Neha'),
  g(3, 'Net session, all levels', 'Cricket', VENUES[2], 'Sat 4 PM', 4, 'Beginner', 'Imran'),
  g(4, '3v3 half-court run', 'Basketball', VENUES[4], 'Today 6 PM', 3, 'Casual', 'Dev'),
]
