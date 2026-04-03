import { AnimatePresence, motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { Code2, Link, Mail, MapPin, Send } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { site } from '../../data/site.js'
import { RevealWrapper } from '../ui/RevealWrapper.jsx'
import { GlassCard } from '../ui/GlassCard.jsx'
import { Toast } from '../ui/Toast.jsx'

const subjects = ['Project Inquiry', 'Freelance Work', 'Networking', 'Other']

export function Contact() {
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [toast, setToast] = useState({ open: false, tone: 'error', title: '', message: '' })

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { name: '', email: '', subject: subjects[0], message: '' },
    mode: 'onTouched',
  })

  const message = watch('message')
  const messageLen = useMemo(() => (message ? message.length : 0), [message])

  const onSubmit = async (values) => {
    setSending(true)
    setSent(false)
    setToast((t) => ({ ...t, open: false }))
    try {
      /**
       * EmailJS setup (required)
       * 1) Create an EmailJS account and add an email service
       * 2) Create an email template with variables: name, email, subject, message
       * 3) Add these env vars to `.env`:
       *    VITE_EMAILJS_SERVICE_ID=...
       *    VITE_EMAILJS_TEMPLATE_ID=...
       *    VITE_EMAILJS_PUBLIC_KEY=...
       * 4) Restart dev server
       */
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('Missing EmailJS environment variables.')
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message,
        },
        { publicKey },
      )

      setSent(true)
      reset()
    } catch (e) {
      // Surface the actual EmailJS error so we can debug production issues.
      // (EmailJS errors can be objects/strings depending on transport failure.)
      // eslint-disable-next-line no-console
      console.error('EmailJS send error:', e)

      const errMsg =
        typeof e === 'string'
          ? e
          : e?.text
            ? String(e.text)
            : e?.message
              ? String(e.message)
              : (() => {
                  try {
                    return JSON.stringify(e)
                  } catch {
                    return String(e)
                  }
                })()

      setToast({
        open: true,
        tone: 'error',
        title: 'Message failed to send',
        message: errMsg || 'Please try again later.',
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="relative z-10 mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-28">
      <div className="absolute inset-x-0 bottom-0 -z-10 h-64 bg-gradient-to-b from-transparent via-indigo-500/5 to-indigo-500/10" />

      <RevealWrapper>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-6">
            <h2
              className="font-heading font-bold text-text"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', lineHeight: 1.1 }}
            >
              Let&apos;s Build Something Together
            </h2>
            <p className="mt-3 text-muted">
              Whether it&apos;s a full-stack app, a network-integrated system, or just a conversation about
              technology—I&apos;m available.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <GlassCard className="p-5">
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 text-cyan-300" />
                  <div>
                    <div className="text-xs text-muted">Email</div>
                    <div className="text-sm text-text">{site.email}</div>
                  </div>
                </div>
              </GlassCard>
              <GlassCard className="p-5">
                <div className="flex items-start gap-3">
                  <Link className="mt-0.5 h-4 w-4 text-indigo-300" />
                  <div>
                    <div className="text-xs text-muted">LinkedIn</div>
                    <a className="text-sm text-text hover:text-cyan-200 transition" href={site.linkedin} target="_blank" rel="noreferrer">
                      {site.linkedin.replace('https://', '').replace('www.', '')}
                    </a>
                  </div>
                </div>
              </GlassCard>
              <GlassCard className="p-5">
                <div className="flex items-start gap-3">
                  <Code2 className="mt-0.5 h-4 w-4 text-purple-300" />
                  <div>
                    <div className="text-xs text-muted">GitHub</div>
                    <a className="text-sm text-text hover:text-indigo-200 transition" href={site.github} target="_blank" rel="noreferrer">
                      {site.github.replace('https://', '')}
                    </a>
                  </div>
                </div>
              </GlassCard>
              <GlassCard className="p-5">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-cyan-300" />
                  <div>
                    <div className="text-xs text-muted">Location</div>
                    <div className="text-sm text-text">{site.location}</div>
                  </div>
                </div>
              </GlassCard>
            </div>

            <div className="mt-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-100">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Open to opportunities
              </div>
              <div className="mt-3 text-xs text-muted">Typical response time: within 24 hours</div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <GlassCard className="p-7">
              <div className="text-sm font-semibold text-text">Send a message</div>
              <div className="mt-1 text-xs text-muted">All fields are required.</div>

              <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs text-muted" htmlFor="name">
                      Name
                    </label>
                    <input
                      id="name"
                      className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-text placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
                      placeholder="Your name"
                      {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name ? <div className="mt-2 text-xs text-rose-200">{errors.name.message}</div> : null}
                  </div>
                  <div>
                    <label className="text-xs text-muted" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-text placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
                      placeholder="you@example.com"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Enter a valid email',
                        },
                      })}
                    />
                    {errors.email ? (
                      <div className="mt-2 text-xs text-rose-200">{errors.email.message}</div>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label className="text-xs text-muted" htmlFor="subject">
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-text focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
                    {...register('subject', { required: true })}
                  >
                    {subjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-muted" htmlFor="message">
                      Message
                    </label>
                    <div className="text-xs text-muted">{messageLen}/500</div>
                  </div>
                  <textarea
                    id="message"
                    rows={6}
                    maxLength={500}
                    className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-text placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
                    placeholder=""
                    {...register('message', {
                      required: 'Message is required',
                      minLength: { value: 20, message: 'Message must be at least 20 characters' },
                    })}
                  />
                  {errors.message ? (
                    <div className="mt-2 text-xs text-rose-200">{errors.message.message}</div>
                  ) : null}
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent-gradient px-5 py-3 text-sm font-semibold text-black shadow-[0_18px_50px_rgba(99,102,241,0.25)] disabled:opacity-60"
                  data-cursor="active"
                >
                  {sending ? (
                    <motion.span
                      className="h-4 w-4 rounded-full border-2 border-black/30 border-t-black"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                      aria-hidden="true"
                    />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  {sending ? 'Sending…' : 'Send Message'}
                </button>

                <AnimatePresence>
                  {sent ? (
                    <motion.div
                      className="mt-3 rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                    >
                      <div className="font-semibold">Message sent!</div>
                      <div className="text-xs opacity-90">I&apos;ll get back to you soon.</div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </form>
            </GlassCard>
          </div>
        </div>
      </RevealWrapper>

      <Toast
        open={toast.open}
        tone={toast.tone}
        title={toast.title}
        message={toast.message}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
      />
    </section>
  )
}

