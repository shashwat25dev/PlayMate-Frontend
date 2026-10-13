# PlayMate

Book local grounds and courts, and find players for your game. Frontend only, dummy data.

**Stack:** React 18, TypeScript, Tailwind CSS v4, Vite.

## Run
```
npm install
npm run dev      # local dev server
npm run build    # type-check and production build into dist/
```
Deploy: import the repo in Vercel or Netlify (build `npm run build`, output `dist`).

## Folder structure
```
src/
  main.tsx        entry, wraps the app in StoreProvider
  App.tsx         picks the page for the current tab, mounts the venue sheet and toasts
  store.tsx       one React context: bookings, games, favourites, blocked slots, toasts
  data.ts         dummy venues, court drawings, slot helpers and pricing rules
  types.ts        shared TypeScript types
  index.css       Tailwind import, colour tokens (light/dark), small component classes
  components/     one file per screen or shared piece
```
Why: all shared state sits in one store so a booking made in the venue sheet instantly appears in My Bookings, frees up on cancel, and shows in the owner view. Data and types are kept out of components so a real API can replace `data.ts` later.

## Components
Header (tabs, bottom bar on mobile) · Home (search, filters, list, empty state) · VenueSheet (details, slots, split cost, confirm) · Players (list, Join/Request Sent, post a game) · Bookings (upcoming/past, cancel) · Profile (stats, owner switch) · Owner (dashboard) · SlotButton · CourtArt · Modal · Toasts

## What I added and why
- **Split the cost:** choose how many players and see each person's share. Group sports are mostly about sharing the bill.
- **Peak pricing:** slots from 6 PM are 25% higher, so owners can steer demand to quiet hours.
- **Owner view:** revenue, occupancy, and blocking slots for maintenance. A blocked slot shows as booked to players.
- **Live availability:** cards show slots open today; booking or cancelling updates every screen.
- **Withdraw a join request, remove your own game, Book again, Save venue.**
- **Court drawings per sport** instead of stock photos, so there are no broken images.
