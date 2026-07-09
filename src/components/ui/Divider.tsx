interface DividerProps {
  label?: string
}

export default function Divider({ label }: DividerProps) {
  if (!label) {
    return <hr className="border-slate-200" />
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-slate-200" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white px-3 text-xs text-slate-500 uppercase tracking-wide">
          {label}
        </span>
      </div>
    </div>
  )
}
