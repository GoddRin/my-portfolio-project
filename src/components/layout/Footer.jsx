import { Code2, Link, Mail } from 'lucide-react'
import { site } from '../../data/site.js'

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-white/70 dark:bg-black/40">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="flex items-center justify-end gap-3">
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 border border-white/10 text-text hover:bg-white/10 transition"
            aria-label="GitHub"
            data-cursor="active"
          >
            <Code2 className="h-4 w-4" />
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 border border-white/10 text-text hover:bg-white/10 transition"
            aria-label="LinkedIn"
            data-cursor="active"
          >
            <Link className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${site.email}`}
            className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 border border-white/10 text-text hover:bg-white/10 transition"
            aria-label="Email"
            data-cursor="active"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <div>© 2026 {site.name}. All rights reserved.</div>
          <div>Built with React + Framer Motion</div>
        </div>
      </div>
    </footer>
  )
}

