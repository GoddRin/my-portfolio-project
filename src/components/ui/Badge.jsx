import clsx from 'clsx'

export function Badge({ className, children, dot, ...props }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium tracking-wide',
        'bg-white/6 border border-white/10 text-text',
        className,
      )}
      {...props}
    >
      {dot ? <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_6px_rgba(16,185,129,0.12)]" /> : null}
      {children}
    </span>
  )
}

