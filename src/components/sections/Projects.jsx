import { ExternalLink, Code2, ArrowRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { projects } from '../../data/projects.js'
import { RevealWrapper } from '../ui/RevealWrapper.jsx'
import { GlassCard } from '../ui/GlassCard.jsx'
import { Button } from '../ui/Button.jsx'
import { ProjectModal } from '../ui/ProjectModal.jsx'

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
        <div className="relative overflow-hidden">
          <img
            src={p.image}
            alt={`${p.name} cover`}
            loading="lazy"
            className="h-48 w-full object-cover md:transition md:duration-500 md:group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-muted">
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
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  
  // Find the initial featured project index
  const initialIndex = useMemo(() => {
    const idx = projects.findIndex(p => p.featured);
    return idx >= 0 ? idx : 0;
  }, []);
  
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const openProject = (p) => {
    setSelected(p)
    setOpen(true)
  }

  const handleCardClick = (index, p) => {
    if (index === activeIndex) {
      openProject(p);
    } else {
      setActiveIndex(index);
    }
  };

  const getCardClass = (index) => {
    if (index === activeIndex) return 'center';
    
    // Calculate relative position to handle wrapping
    const total = projects.length;
    // For 3 items, the one before is left, the one after is right
    if ((index + 1) % total === activeIndex) return 'left';
    if ((index - 1 + total) % total === activeIndex) return 'right';
    
    return 'hidden'; // Fallback if more than 3 items
  };

  return (
    <section id="projects" className="relative z-10 mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28 overflow-hidden">
      <RevealWrapper>
        <div className="text-center md:text-left mb-12">
          <h2
            className="font-heading font-bold text-text"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}
          >
            Featured Projects
          </h2>
          <p className="mt-3 text-muted">A layered showcase of my production-grade systems.</p>
        </div>

        {/* 3D Showcase Container */}
        <div className="showcase-container mt-10">
          {projects.map((p, index) => {
            const positionClass = getCardClass(index);
            if (positionClass === 'hidden') return null;

            return (
              <div 
                key={p.id} 
                className={`showcase-card ${positionClass}`}
                onClick={() => handleCardClick(index, p)}
              >
                <GlassCard className={`overflow-hidden p-0 h-full flex flex-col ${positionClass === 'center' ? 'ring-2 ring-indigo-500/50' : ''}`} hover>
                  <div className="relative overflow-hidden group">
                    <div className="absolute left-0 top-0 h-full w-[4px] bg-gradient-to-b from-indigo-400 to-cyan-400 z-10" />
                    <img
                      src={p.image}
                      alt={`${p.name} cover`}
                      loading="lazy"
                      className="h-56 md:h-64 w-full object-cover md:transition md:duration-500 group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Play/View Icon overlay for center card */}
                    {positionClass === 'center' && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-black/50 backdrop-blur-md rounded-full p-4 border border-white/20 text-white shadow-lg flex items-center gap-2 font-medium">
                          <ExternalLink className="h-5 w-5" /> View Details
                        </div>
                      </div>
                    )}
                    
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <div>
                        <div className="inline-flex rounded-full border border-white/10 bg-black/50 backdrop-blur-md px-3 py-1 text-xs text-muted mb-2">
                          {p.category}
                        </div>
                        <h3 className="text-xl font-bold text-white drop-shadow-md">{p.name}</h3>
                      </div>
                    </div>
                  </div>

                  {/* Show full details only for the center card to keep side cards cleaner */}
                  <div className={`p-5 flex-grow bg-black/20 ${positionClass !== 'center' ? 'hidden md:block' : ''}`}>
                    <div className={`text-sm text-muted ${positionClass !== 'center' ? 'line-clamp-2' : 'line-clamp-3'}`}>
                      {p.description}
                    </div>

                    {positionClass === 'center' && (
                      <>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {(p.stack ?? []).slice(0, 4).map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] font-mono text-muted"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        <div className="mt-6 flex flex-wrap gap-3">
                          <div onClick={(e) => e.stopPropagation()}>
                            <Button as="a" href={p.liveUrl} target="_blank" rel="noreferrer" variant="primary" size="sm">
                              Live <ExternalLink className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                          <div onClick={(e) => e.stopPropagation()}>
                            <Button as="a" href={p.githubUrl} target="_blank" rel="noreferrer" variant="ghost" size="sm">
                              Code <Code2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </GlassCard>
              </div>
            );
          })}
        </div>

        <div className="mt-16 flex justify-center">
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

