export type Sport = 'Football' | 'Cricket' | 'Badminton' | 'Tennis' | 'Basketball' | 'Padel'
export type View = 'home' | 'players' | 'bookings' | 'profile' | 'owner'
export interface Venue { id: number; name: string; sport: Sport; price: number; dist: number; rating: number; area: string; amenities: string[] }
export interface Booking { id: number; venue: Venue; day: number; hour: number; paid: number; status: 'up' | 'past' | 'cancelled' }
export interface Game { id: number; title: string; sport: Sport; venue: Venue; when: string; need: number; level: string; host: string; requested: boolean; mine?: boolean }
