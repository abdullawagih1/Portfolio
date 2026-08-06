# Abdullah Wagih — AI Solution Architect Portfolio

A production Next.js 14 (App Router) portfolio built for Abdullah Wagih Ibrahim: AI Solution
Architect, Generative AI Engineer, AI Team Leader, and Technical Educator.

---

## 1. Getting Started

```bash
npm install
cp .env.example .env.local   # then edit values as needed
npm run dev
```

Visit `http://localhost:3000`.

### Scripts

| Command           | What it does                              |
| ------------------ | ------------------------------------------ |
| `npm run dev`       | Local dev server with hot reload           |
| `npm run build`     | Production build (also runs lint + types)  |
| `npm run start`     | Serve the production build locally         |
| `npm run lint`      | ESLint (Next.js core-web-vitals config)    |
| `npm run typecheck` | TypeScript, no emit                        |

---

## 2. Deploying to Vercel

1. Push this repository to GitHub/GitLab/Bitbucket.
2. In Vercel: **New Project → Import** the repository. Framework preset
   auto-detects as Next.js — no changes needed.
3. Add environment variables (Project → Settings → Environment Variables):
   - `NEXT_PUBLIC_SITE_URL` — your real production domain, e.g. `https://abdullahwagih.com`
   - Contact form email delivery (optional, pick one — see §3 for full setup steps):
     - `GMAIL_USER` + `GMAIL_APP_PASSWORD` — works immediately, no domain needed, **or**
     - `RESEND_API_KEY` (+ verified domain) — more "branded" but requires DNS setup
   - `CONTACT_TO_EMAIL` — optional, defaults to `abdullawagih1@gmail.com`
4. Deploy. Vercel will run `npm run build` automatically.

> **Note on fonts:** this sandbox's network sandbox blocks `fonts.googleapis.com`
> at build time, so Next's automatic font-stylesheet optimization was skipped
> locally (you'll see a harmless build warning about it). On Vercel — which has
> normal internet access — this resolves itself automatically and the fonts
> will be optimized and self-hosted as expected. No action needed.

---

## 3. Environment Variables

See `.env.example`. Copy it to `.env.local` for local development.

| Variable               | Required | Purpose                                                        |
| ----------------------- | -------- | ---------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`  | Yes (prod) | Canonical URL, sitemap, Open Graph metadata                    |
| `GMAIL_USER`            | No       | Gmail address to send contact-form emails from (Option A below)  |
| `GMAIL_APP_PASSWORD`    | No       | Gmail App Password for that address (**not** your normal password) |
| `RESEND_API_KEY`        | No       | Enables email delivery via Resend instead of Gmail (Option B)   |
| `EMAIL_FROM`            | No       | Custom "From" address for Resend — only once its domain is verified |
| `CONTACT_TO_EMAIL`      | No       | Overrides the inbox contact-form submissions are delivered to    |

Without any email provider configured, the contact form still validates
input correctly but tells the visitor email delivery isn't set up yet and
offers a `mailto:` fallback button — it never silently pretends a message
was sent. `src/lib/email.ts` picks whichever provider is configured; if both
are set, Gmail takes priority.

### Option A — Gmail SMTP (recommended if you don't have a domain)

Works immediately, no domain or DNS setup required. Emails arrive "from"
your own Gmail address.

1. Enable **2-Step Verification** on the Google account, if not already on:
   <https://myaccount.google.com/security>
2. Generate an App Password (type: Mail) at
   <https://myaccount.google.com/apppasswords>
3. Set `GMAIL_USER` to the Gmail address and `GMAIL_APP_PASSWORD` to the
   16-character app password (not the regular account password).

### Option B — Resend

More "branded" long-term, but **requires a verified sending domain**.
Resend's shared `onboarding@resend.dev` test address is heavily restricted
and will fail for most recipients — don't rely on it beyond a first smoke test.

1. Create a free account at <https://resend.com>.
2. Get an API key from the dashboard and set `RESEND_API_KEY`.
3. Go to **Domains → Add Domain**, add a domain or subdomain you own (a
   subdomain like `mail.yourdomain.com` works fine if you don't want to touch
   your main domain).
4. Add the DNS records Resend gives you (SPF/TXT, DKIM, sometimes MX) at your
   domain provider (Cloudflare, Namecheap, GoDaddy, etc.), then click
   **Verify** in Resend. This can take a few minutes to an hour.
5. Once the domain shows **Verified**, set `EMAIL_FROM` to an address on
   that domain, e.g. `EMAIL_FROM="Abdullah Wagih <contact@yourdomain.com>"`.

Both providers have a request timeout (8–10s) built in, so a network hiccup
fails fast with a clear error message instead of leaving the visitor staring
at an infinite spinner.

---

## 4. Project Structure

```
src/
  app/                  Routes (App Router)
    page.tsx             Homepage
    work/                /work index + /work/[slug] case study template
    teaching/            /teaching
    hackathons/          /hackathons
    publication/         /publication
    about/               /about
    contact/             /contact
    sitemap.ts           Dynamic sitemap.xml
    robots.ts            robots.txt
    layout.tsx           Root layout, fonts, theme, header/footer, JSON-LD
    globals.css          Design tokens + base styles
  components/
    sections/            Homepage section components
    ui/                  Small shared primitives (section heading, status badge)
    header.tsx, footer.tsx, contact-form.tsx, architecture-flow.tsx, ...
  content/               Typed content — the single source of truth for copy
    site.ts               Site-wide config, nav, contact info
    experience.ts          Architecture/leadership roles
    skills.ts               Capabilities, architecture highlights, 6-step process
    projects.ts              All 7 case studies (typed Project[])
    teaching.ts               Teaching roles, curricula, philosophy
    hackathons.ts               Hackathon events
    publication.ts               The one verified publication
  lib/
    utils.ts, metadata.ts, structured-data.ts, actions.ts (contact form server action)
public/
  Abdullah-Wagih-Technical-CV.docx
  Abdullah-Wagih-Teaching-CV.docx
```

---

## 5. Editing Content

**Almost everything visible on the site lives in `src/content/*.ts`.** Don't
hunt through components to change copy — edit the typed data files instead:

- **Add or edit a case study** → `src/content/projects.ts`. Each project is a
  typed object; add a new one and it automatically gets a route at
  `/work/<slug>`, a card on `/work`, and (if you add its slug to another
  project's `relatedProjects`) a related-work link.
- **Change experience/roles** → `src/content/experience.ts`
- **Change skills/capabilities** → `src/content/skills.ts`
- **Change teaching content** → `src/content/teaching.ts`
- **Change hackathons** → `src/content/hackathons.ts`
- **Change publication details** → `src/content/publication.ts`. `doi`,
  `volume`, `issue`, and `externalUrl` are intentionally left `undefined`
  until you confirm them against the publisher record — the UI omits any
  field that's missing rather than guessing.
- **Site-wide config** (nav, contact info, CV filenames) → `src/content/site.ts`

### The `reviewNote` field

`src/content/projects.ts` has an optional `reviewNote` field on `Project`. It
is **never rendered** — it's a note-to-self for the content owner. Currently
one project (`rashad`) uses it, because Rashad was described in the site
brief but doesn't yet appear in either source CV. Recommend adding it to the
Technical CV for consistency, or removing the note once confirmed.

---

## 6. Design System Notes

- **Palette:** warm off-white canvas (`#FAFAF7`) with deep navy ink
  (`#11162A`), a royal-blue primary accent, and a teal/emerald secondary
  accent — plus a full dark-mode palette (`class`-based, toggle in the header).
- **Type:** Space Grotesk (display), Inter (body), JetBrains Mono (labels,
  eyebrows, technical annotations) — the mono face is used deliberately for
  structural/technical labels to reinforce the "architect" identity.
- **Signature element:** blueprint corner-brackets (`.card-blueprint` in
  `globals.css`) that appear on hover/focus of cards — a nod to technical
  schematics that ties the visual language directly to "architecture."
- **Motion system:** an `AnnotatedDiagram` component (`src/components/annotated-diagram.tsx`)
  is the hero's signature visual — a central "Platform Core" card with
  floating capability labels (RAG, AI Agents, Model Routing, Human Review)
  connected by hand-drawn-style SVG lines that animate in on load. The same
  "connect the nodes" language repeats in `ProcessFlow` (dashed lines
  between the 6 architecture steps) and `ArchitectureFlow` (staggered,
  connected node reveals in every case study). A single slow, pausable
  `TechMarquee` rounds out the motion system. All of it was scoped
  deliberately — see the note below.
- **Motion design rationale:** this animation direction was planned against
  a reference video showing a flashy, dark-mode SaaS/UI-kit marketing reel
  (fast auto-scrolling galleries, neon red/orange accents, urgent copy). The
  useful *mechanic* from that reference — floating annotated callouts
  connected by lines to a central visual — was adopted and re-skinned in
  the site's own navy/blue/teal palette, because it maps naturally onto
  "architecture." The reference's flashy dark theme, marquee-heavy layout,
  and urgency-driven copy were deliberately **not** adopted, since they
  would have undone the calmer, enterprise-credible identity the rest of
  the site is built around. The one marquee on the site is a single slow
  row (44s loop), pauses on hover/focus, and is fully disabled under
  `prefers-reduced-motion` — a restrained, accessible version of the pattern
  rather than a copy of it.
- **Diagrams:** case-study "System Architecture" sections use
  `ArchitectureFlow`, a reusable node-flow component driven entirely by each
  project's `architecture` array in `projects.ts` — no hard-coded per-project
  SVGs to maintain.

---

## 7. Accessibility Notes

- Skip-to-content link (visible on keyboard focus)
- Semantic heading hierarchy on every page
- Visible focus rings (`:focus-visible`) site-wide
- `prefers-reduced-motion` respected globally (see `globals.css` and
  `useReducedMotion()` in animated components)
- Accessible mobile menu (`aria-expanded`, `aria-controls`, focus returns on close)
- Form fields have associated `<label>` elements; error/success states use `role="status"`
- Color contrast checked against the design tokens for both light and dark mode

---

## 8. Performance Notes

- No client-side database; content is static, typed TypeScript data compiled
  at build time
- Project case studies are statically generated (`generateStaticParams`)
- Minimal client components — most of the site is server-rendered; only
  interactive pieces (header menu, theme toggle, contact form, animated
  reveals) opt into `"use client"`
- No heavy background video, canvas, or WebGL
- `next/image` ready for use if/when real photography is added (none is used
  currently — all visuals are CSS/SVG-based by design, per the brief)

---

## 9. Final Validation Report

Run locally against this build:

| Check                                   | Result |
| ----------------------------------------- | ------ |
| `npm install`                             | ✅ Pass |
| `npm run lint`                            | ✅ Pass — no warnings or errors |
| `npm run typecheck` (`tsc --noEmit`)      | ✅ Pass |
| `npm run build`                           | ✅ Pass — 19/19 routes generated |
| All routes return HTTP 200                | ✅ Verified (`/`, `/work`, all 7 case studies, `/teaching`, `/hackathons`, `/publication`, `/about`, `/contact`, `/sitemap.xml`, `/robots.txt`) |
| Unknown route returns 404                 | ✅ Verified |
| Both CV downloads serve correct MIME type | ✅ Verified |
| Placeholder scan (`[X]`, `[N]`, `[XX]`, lorem ipsum, TODO) | ✅ None found in rendered content |
| `reviewNote` field never rendered in UI   | ✅ Verified |
| JSON-LD present on homepage & publication page | ✅ Verified |
| Reduced-motion support                    | ✅ Implemented globally |
| Dark mode                                 | ✅ Implemented (class-based toggle) |
| Scroll-triggered reveals fire correctly on real scroll (verified via headless-browser scroll simulation) | ✅ Verified — `AnnotatedDiagram`, `ProcessFlow` connecting lines, `ArchitectureFlow` staggered nodes, and `TechMarquee` all confirmed visually |
| Marquee pauses on hover/focus and is disabled under reduced motion | ✅ Verified in code (`group-hover:[animation-play-state:paused]`, `motion-safe:` variant, global reduced-motion override) |

**Not verified in this environment** (requires a real browser, which this
sandbox doesn't have): Lighthouse scores, pixel-level responsive QA at every
breakpoint, and screen-reader walkthrough. The design was built against the
breakpoints and accessibility requirements in the brief, but running
Lighthouse and a manual screen-reader pass after deployment is recommended
before calling this fully production-verified.

---

## 10. Information Still Requiring Confirmation

These were deliberately left out of the visible UI rather than guessed:

1. **Publication DOI, volume, issue, and external link** — not present in the
   source CV. Add them to `src/content/publication.ts` once confirmed against
   the publisher record.
2. **Rashad project** — described in the site brief with specific
   capabilities, but not present in either source CV (Technical or Teaching).
   Included on the site per the brief's explicit instructions, but flagged via
   `reviewNote` in `projects.ts`. Recommend adding it to the CV for consistency.
3. **Teaching learner/cohort counts** — an earlier draft of the Teaching CV
   stated "500+ learners," but that figure does not appear in the original
   source CV and could not be verified, so it was **excluded** from this site.
   If you have a real, verifiable number, add it to `src/content/teaching.ts`.
4. **Portfolio URL** — the site's own canonical URL is read from
   `NEXT_PUBLIC_SITE_URL` and must be set in Vercel once a domain is chosen.
5. **English language proficiency** — intentionally not displayed anywhere on
   the site, since it wasn't relevant to any section and its exact wording
   has been inconsistent across CV drafts.
