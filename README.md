# Portfolio OS (SPA)

World-class, production-grade personal portfolio SPA built with **React 18 + Vite + Tailwind CSS + Framer Motion**.

## Tech

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS (dark mode via `class`)
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM (HashRouter)
- **Forms**: React Hook Form + EmailJS
- **Extras**: custom cursor, reading progress bar, section dots, project lightbox, Konami easter egg

## Getting started

Install and run:

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

## Configure EmailJS

1. Create an account at EmailJS and add an email service.
2. Create a template containing variables: `name`, `email`, `subject`, `message`.
3. Copy `.env.example` to `.env` and fill in:

```bash
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

4. Restart the dev server.

## Personalization

Update your info in:

- `src/data/site.js` (**name, email, links, CV URL, currently building**)
- `src/data/projects.js` (**live URLs, GitHub URLs, screenshots**)
- `src/data/timeline.js` (**university/org placeholders**)

Search for `// TODO: Replace` for the remaining placeholders.

## Deployment (Vercel)

- `vercel.json` is included for SPA routing.
- Deploy normally (Vite build output).
