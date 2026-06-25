# Poojary Karunakar — Portfolio

An immersive, recruiter-friendly personal portfolio for a **Full-Stack GenAI Application Engineer**.
Content-first and fast, with a tasteful 3D background layer that progressively
enhances capable devices and gracefully falls back everywhere else.

## Tech stack

- **React 18 + TypeScript** (Vite)
- **Tailwind CSS** — design system (dark/navy + electric-blue/violet accents)
- **React Three Fiber + Drei + Three.js** — the abstract "agent network" 3D background
- **Framer Motion** — scroll reveals, transitions, the project case-study modal
- **lucide-react** — icons

> **Why React, not Angular?** The 3D + animation ecosystem this design needs
> (React Three Fiber, Drei, Framer Motion) is React-only and does most of the
> heavy lifting. Angular is possible via raw Three.js / `angular-three`, but with
> far more friction. React also broadens your demonstrated skill set.

## Run locally

> **Node 18+ required** (Vite 5). Your system default may be older — this repo
> includes an `.nvmrc`, so if you use nvm just run `nvm use` first.

```bash
cd portfolio
nvm use          # switches to Node 22 (reads .nvmrc); skip if already 18+
npm install
npm run dev      # start dev server (http://localhost:5173)
npm run build    # type-check + production build → dist/
npm run preview  # preview the production build
```

## Project structure

```
portfolio/
├─ index.html               # meta tags, fonts, noscript fallback
├─ src/
│  ├─ App.tsx               # layout + progressive-enhancement gate for 3D
│  ├─ data/portfolio.ts     # 👉 ALL your content lives here (edit this)
│  ├─ lib/utils.ts          # cn() + accent color maps
│  ├─ hooks/                # usePrefersReducedMotion, useActiveSection
│  ├─ components/
│  │  ├─ Navbar.tsx         # sticky nav + mobile menu + active section
│  │  ├─ Hero.tsx           # name, title, value statement, CTAs, scroll cue
│  │  ├─ About.tsx          # intro + stats + working style
│  │  ├─ Skills.tsx         # grouped skill cards
│  │  ├─ Projects.tsx       # project cards
│  │  ├─ ProjectModal.tsx   # case-study overlay
│  │  ├─ Experience.tsx     # vertical timeline
│  │  ├─ Contact.tsx        # CTA + mailto form
│  │  ├─ Footer.tsx
│  │  └─ scene/
│  │     ├─ Background3D.tsx    # R3F canvas (lazy-loaded)
│  │     ├─ NodeNetwork.tsx     # the 3D agent-network visual
│  │     └─ StaticBackground.tsx# CSS fallback (no GPU cost)
└─ public/
   ├─ favicon.svg
   └─ resume-placeholder.pdf    # 👉 replace with your real resume
```

## Where to plug in your real content

Everything is centralized — search `data/portfolio.ts` for `TODO`:

| What | Where |
|---|---|
| Name, title, value statement | `profile` in `data/portfolio.ts` |
| LinkedIn URL | `links.linkedin` |
| Résumé PDF | drop file in `public/`, set `links.resume` (e.g. `/my-resume.pdf`) |
| Skills | `skillGroups` |
| Projects + case studies | `projects` |
| Project screenshots | add to `public/projects/`, set `project.image` |
| Project repo / live links | `project.repo`, `project.live` |
| Timeline / experience | `timeline` |
| Your photo | not used yet — easy to add to `About.tsx` |
| 3D model | replace `NodeNetwork.tsx`; load `.glb` with Drei's `useGLTF` |

## Accessibility & performance

- **Content-first**: HTML/text renders before the 3D bundle (lazy-loaded chunk).
- **Reduced motion**: honors `prefers-reduced-motion` — disables 3D + long animations.
- **Capability gate**: 3D is skipped on small screens, low-core devices, or when WebGL is unavailable — a CSS fallback shows instead.
- **Keyboard**: skip link, visible focus rings, Escape-to-close modal, accessible nav.
- **SEO**: meta + Open Graph tags in `index.html` (add a real OG image later).

## Deploy

Static output in `dist/` — deploy to **Vercel, Netlify, GitHub Pages, or Cloudflare Pages**.
For Vercel/Netlify: framework preset "Vite", build command `npm run build`, output `dist`.
