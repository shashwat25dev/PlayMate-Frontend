import { useStore } from '../store'
export default function Toasts() {
  const { toasts } = useStore()
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-24 z-50 flex flex-col items-center gap-2 md:bottom-8">
      {toasts.map(t => <div key={t.id} className="rounded-md bg-ink px-4 py-2.5 font-medium text-bg shadow-lg">{t.msg}</div>)}
    </div>
  )
}
