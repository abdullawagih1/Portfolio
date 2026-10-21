# 01 — Baseline Audit

Recorded 2026-10-21, before any change. No application files have been modified.

## Repository

| Item | Value |
|---|---|
| Path | `D:\Projects\portfolio` |
| Remote | `https://github.com/abdullawagih1/Portfolio.git` (**public** on GitHub) |
| Branch | `main`, up to date with `origin/main` |
| HEAD | `078519e` Fix invisible connector lines in AnnotatedDiagram… |
| Working tree | Clean except one untracked file: `portfolio.zip` (178 KB, see 05-security-review) |
| Git note | Git reports "dubious ownership" for this folder (owner SID differs from current user). Read commands were run with `-c safe.directory=D:/Projects/portfolio`; global git config was **not** changed. |

## Framework and dependencies (from `package.json`)

- Next.js 14.2.35 (App Router), React 18.3.1, TypeScript 5.6.3
- Tailwind CSS 3.4.13 + `@tailwindcss/typography`, framer-motion 11.11.9, next-themes 0.3.0, lucide-react
- nodemailer 9.0.4 (Gmail SMTP contact form), `@vercel/analytics`
- Scripts: `dev`, `build`, `start`, `lint` (`next lint`), `typecheck` (`tsc --noEmit`)
- **No test framework and no test script.**

## Structure

- Pages (`src/app`): `/`, `/about`, `/contact`, `/work`, `/work/[slug]`, `/teaching`, `/hackathons`, `/publication`, `not-found`, `robots.ts`, `sitemap.ts`
- Content modules (`src/content`): `site.ts`, `experience.ts`, `projects.ts` (7 projects), `skills.ts`, `teaching.ts`, `hackathons.ts`, `publication.ts`
- Identity/metadata: `src/lib/metadata.ts`, `src/lib/structured-data.ts`, `src/app/page.tsx` (homepage metadata)
- Contact: `src/lib/actions.ts` (server action), `src/lib/email.ts` (Gmail SMTP / Resend)
- Public assets: `public/Abdullah-Wagih-Technical-CV.docx`, `public/Abdullah-Wagih-Teaching-CV.docx`

## Environment configuration

- `.env.local` exists locally with `NEXT_PUBLIC_SITE_URL`, `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `CONTACT_TO_EMAIL`, all set. It is gitignored (`.env*.local`) and not in git history.
- `.env.example` is tracked and contains only placeholders plus the public contact email.

## Deployment configuration

- No `vercel.json` and no `.vercel/` folder; deployment is presumably through Vercel's Git integration.
- `next.config.mjs` sets `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`. No CSP or HSTS header is configured in the app.
- Production `https://abdullah-wagih.vercel.app/` returns 200. Its title is "Abdullah Wagih | AI Solution Architect & Generative AI Engineer", which matches the repo.

## Toolchain availability

- **Node.js and npm are not installed or not on PATH** on this machine (checked in Bash, PowerShell, Program Files, nvm, volta, fnm). `node_modules/` exists from an earlier install.
- Consequence: typecheck, lint, and build **cannot be run** here. See 04-test-evidence.

> **Update 2026-10-21 (Run 2):** Node.js v24.20.0 LTS and npm 11.19.0 were installed via winget with owner approval. The baseline typecheck, lint, and build pass (see 04). `portfolio.zip` has been moved out of the working tree (see 05).

> **Update 2026-10-21 (Run 3):** both inputs are now present in `docs/portfolio-v2/inputs/` (see the table below). Batch A work is on branch `portfolio-v2/batch-a`, created from `main` at `078519e`.

## Authoritative inputs

| Input | Status |
|---|---|
| `Abdullah_Wagih_CV_Technical(2).pdf` | Runs 1–2: missing. **Run 3: present** as `inputs/Abdullah_Wagih_CV_Technical.pdf` (319,710 bytes, 3 pages, readable) |
| `Portfolio_v2_Change_Register.md` | Runs 1–2: missing. **Run 3: present** in `inputs/` (8,111 bytes, readable) |
| `Abdullah_Wagih _CV_Teaching.pdf` | Run 3: also supplied (unrequested). Has placeholders, so it is not published. |
| Existing repository | Present |
| Production site | Reachable |
