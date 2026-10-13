export type SlotState = 'open' | 'booked' | 'selected'
interface Props { label: string; sub: string; state: SlotState; disabled?: boolean; onClick: () => void }
export default function SlotButton({ label, sub, state, disabled, onClick }: Props) {
  const cls = state === 'selected' ? 'border-pri bg-pri text-on'
    : state === 'booked' ? 'cursor-not-allowed text-mut line-through [background:repeating-linear-gradient(45deg,var(--bg),var(--bg)_6px,var(--line)_6px,var(--line)_12px)]'
    : 'border-line bg-card cursor-pointer hover:border-pri'
  return (
    <button disabled={disabled} onClick={onClick} className={`rounded-[5px] border px-1 py-2 text-center font-semibold ${cls}`}>
      {label}<small className="block font-normal opacity-80 no-underline">{sub}</small>
    </button>
  )
}
