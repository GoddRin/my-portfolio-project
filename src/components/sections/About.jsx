import { motion } from 'framer-motion'
import { ArrowRight, Mail, Download } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { site } from '../../data/site.js'
import profilePhoto from '../../assets/profile.jpg'
import { RevealWrapper } from '../ui/RevealWrapper.jsx'
import { Button } from '../ui/Button.jsx'

export function About() {
  const navigate = useNavigate()
  const [imageError, setImageError] = useState(false)

  return (
    <section id="about" className="relative z-10 mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
      <div className="grid gap-10 md:grid-cols-12 md:items-start">
        <RevealWrapper className="md:col-span-5">
          <div className="relative mx-auto w-full max-w-[380px]">
            <div className="profile-photo-blob" />
            <div className="profile-photo-frame">
              <div className="profile-photo-inner">
                {!imageError ? (
                  <img
                    src={profilePhoto}
                    alt={`${site.name} professional portrait`}
                    className="profile-photo-img"
                    onError={() => setImageError(true)}
                    loading="lazy"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-cyan-500/20">
                    <div className="text-center">
                      <div className="text-5xl font-heading font-extrabold text-gradient">{site.initials}</div>
                      <div className="mt-2 text-xs text-muted">Image unavailable</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="absolute left-3 top-3 glass rounded-full px-3 py-1 text-xs text-text">
              📍 Tuguegarao, PH
            </div>

            <div className="absolute bottom-3 right-3 glass rounded-full px-3 py-1 text-xs text-text">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Open to Work
            </div>
          </div>

          {/* ── CTA Buttons (replaces stat cards) ── */}
          <div className="mt-6 grid gap-3 grid-cols-2">
            <Button
              as="a"
              href="https://mail.google.com/mail/?view=cm&to=salva.harrold@gmail.com&su=Hello%20Marc%20–%20Let's%20Connect"
              target="_blank"
              rel="noreferrer"
              variant="primary"
              id="about-send-email"
            >
              <Mail className="h-4 w-4" /> Send Email
            </Button>
            <Button
              as="a"
              href="/Marc_Harrold_Salva_Resume.pdf"
              download="Marc_Harrold_Salva_Resume.pdf"
              variant="ghost"
              id="about-download-cv"
            >
              <Download className="h-4 w-4" /> Download CV
            </Button>
          </div>
        </RevealWrapper>

        <RevealWrapper
          className="md:col-span-7"
          variants={{
            hidden: { opacity: 0, x: 60 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <h2
            className="font-heading font-bold text-text"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}
          >
            Building Systems That Actually Work
          </h2>

          <div className="mt-6 space-y-5 text-muted">
            <p>
              I build systems that don&apos;t just work - they solve real problems in real environments.
            </p>
            <p>
              As an Information Technology graduating student with a dual focus on full-stack development and
              networking, my approach goes beyond typical web projects. I design and develop complete,
              production-oriented systems that consider both application logic and the infrastructure they run on.
            </p>
            <p>
              On the software side, I work primarily with the MERN stack (MongoDB, Express, React, Node.js),
              building scalable applications with structured APIs, secure authentication, and clean, responsive
              interfaces. I emphasize reliability through robust error handling, maintainable architecture, and deployments
              that hold up outside of development environments.
            </p>
            <p>
              What differentiates my work is my networking background. With hands-on experience in MikroTik
              systems (VLAN segmentation, firewall configuration, hotspot systems, and bandwidth management), I
              understand how applications behave in real networks. This allows me to build solutions that are not
              only functional, but also stable, efficient, and deployment-ready in constrained or production
              scenarios.
            </p>
            <p>
              My projects reflect this mindset. From asset management systems to smart farm assistants and
              network-integrated platforms, I focus on creating tools that are practical, structured, and aligned
              with real user needs, not just academic requirements.
            </p>
            <p>
              Currently, I am pushing toward enterprise-level quality by refining UI/UX to professional standards,
              improving system scalability, and integrating intelligent features that elevate functionality. The
              objective is clear: build systems that can stand alongside industry-grade solutions and deliver
              measurable value.
            </p>
          </div>

          <div className="mt-8">
            <Button
              variant="ghost"
              onClick={() => {
                navigate('/contact')
                window.setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 50)
              }}
            >
              Let&apos;s Work Together <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <motion.blockquote
            className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 text-text"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-sm md:text-base">
              “The best code is code that runs reliably in production, not just in demos.”
            </p>
          </motion.blockquote>
        </RevealWrapper>
      </div>
    </section>
  )
}

