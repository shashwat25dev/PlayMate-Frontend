import { useEffect, type ReactNode } from 'react'
export default function Modal({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h)
  }, [onClose])
  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/55 md:items-center" onClick={e => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" className="max-h-[92%] w-full max-w-xl overflow-auto rounded-t-2xl bg-bg pb-[env(safe-area-inset-bottom)] md:max-h-[88%] md:rounded-2xl">{children}</div>
    </div>
  )
}
