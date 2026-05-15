import { ExternalLink, Code2, ArrowRight } from 'lucide-react'
import { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { projects } from '../../data/projects.js'
import { RevealWrapper } from '../ui/RevealWrapper.jsx'
import { GlassCard } from '../ui/GlassCard.jsx'
import { Button } from '../ui/Button.jsx'
import { ProjectModal } from '../ui/ProjectModal.jsx'

function HoverImageShowcase({ images, fallbackImage, className }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval;
    if (isHovered && images && images.length > 1) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 1500);
    } else {
      setCurrentIndex(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, images]);

  const displayImages = images?.length > 0 ? images : [fallbackImage];

  return (
    <div 
      className={`relative overflow-hidden group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {displayImages.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`Project view ${i + 1}`}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-in-out ${
            i === currentIndex 
              ? 'opacity-100 scale-100 z-10' 
              : 'opacity-0 scale-110 z-0'
          } ${isHovered && i === currentIndex ? 'md:scale-[1.05]' : ''}`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-20 pointer-events-none" />
      
      {/* Progress indicator dots for multiple images */}
      {images && images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          {images.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/40'}`} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectCard({ p, onOpen }) {
  return (
    <GlassCard className="overflow-hidden p-0" hover>
      <button
        type="button"
        className="group block w-full text-left"
        onClick={() => onOpen(p)}
        aria-label={`Open ${p.name} details`}
        data-cursor="active"
      >
        <div className="relative">
          <HoverImageShowcase 
            images={p.screenshots} 
            fallbackImage={p.image} 
            className="h-48 w-full"
          />
          <div className="absolute left-4 top-4 z-30 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-muted pointer-events-none">
            {p.category}
          </div>
        </div>

        <div className="p-6">
          <div className="text-lg font-semibold text-text">{p.name}</div>
          <div className="mt-2 text-sm text-muted">{p.description}</div>

          <div className="mt-4 flex flex-wrap gap-2">
            {(p.stack ?? []).slice(0, 5).map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-muted"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <div onClick={(e) => e.stopPropagation()}>
              <Button as="a" href={p.liveUrl} target="_blank" rel="noreferrer" variant="primary" size="sm">
                View Live <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
            <div onClick={(e) => e.stopPropagation()}>
              <Button as="a" href={p.githubUrl} target="_blank" rel="noreferrer" variant="ghost" size="sm">
                GitHub <Code2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </button>
    </GlassCard>
  )
}

export function Projects() {
  const navigate = useNavigate()
  const featured = useMemo(() => projects.find((p) => p.featured) ?? projects[0], [])
  const rest = useMemo(() => projects.filter((p) => p.id !== featured.id), [featured.id])
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  const openProject = (p) => {
    setSelected(p)
    setOpen(true)
  }

  return (
    <section id="projects" className="relative z-10 mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
      <RevealWrapper>
        <h2
          className="font-heading font-bold text-text"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}
        >
          What I&apos;ve Built
        </h2>
        <p className="mt-3 text-muted">Production-oriented systems built for real environments</p>

        {/* Featured */}
        <div className="mt-10">
          <GlassCard className="overflow-hidden p-0" hover>
            <button
              type="button"
              className="group grid w-full gap-0 text-left md:grid-cols-12"
              onClick={() => openProject(featured)}
              aria-label={`Open ${featured.name} details`}
              data-cursor="active"
            >
              <div className="relative md:col-span-6 overflow-hidden">
                <div className="absolute left-0 top-0 h-full w-[6px] bg-gradient-to-b from-indigo-400 to-cyan-400 z-30" />
                <HoverImageShowcase 
                  images={featured.screenshots} 
                  fallbackImage={featured.image} 
                  className="h-full min-h-64 w-full"
                />
              </div>
              <div className="p-7 md:col-span-6">
                <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted">
                  {featured.category}
                </div>
                <div className="mt-3 text-2xl font-semibold text-text">{featured.name}</div>
                <div className="mt-3 text-sm text-muted">{featured.description}</div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {(featured.stack ?? []).map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <div onClick={(e) => e.stopPropagation()}>
                    <Button as="a" href={featured.liveUrl} target="_blank" rel="noreferrer" variant="primary">
                      View Live <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                  <div onClick={(e) => e.stopPropagation()}>
                    <Button as="a" href={featured.githubUrl} target="_blank" rel="noreferrer" variant="ghost">
                      GitHub <Code2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </button>
          </GlassCard>
        </div>

        {/* Grid */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <ProjectCard key={p.id} p={p} onOpen={openProject} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button variant="ghost" onClick={() => navigate('/projects')}>
            View All Projects <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </RevealWrapper>

      <ProjectModal
        key={`${selected?.id ?? 'none'}-${open ? 'open' : 'closed'}`}
        project={selected}
        open={open}
        onClose={() => setOpen(false)}
      />
    </section>
  )
}

