# 04 — Test Evidence

Runtime: Node.js v24.20.0 LTS, npm 11.19.0, lockfile `package-lock.json`.

## Release prep — 2026-10-21, on commit `9d24bc71b06f6c63c96318babde3c9e9f05ade1e`

**Scope: LOCAL verification only. No production test has been run or passed.**

| Check | Command | Result |
|---|---|---|
| Typecheck | `npm run typecheck` | exit 0 |
| Lint | `npm run lint` | exit 0, no warnings |
| Build | `npm run build` | exit 0, 19/19 pages |
| Local asset exposure | `next start -p 3124` + `curl` | PDF 200 (hash `14ddabf2…1d95`); both DOCX, zip, `.env*`, and `docs/portfolio-v2/inputs/*` return 404; `<title>` is "Abdullah Wagih \| AI Engineer \| Generative AI Engineer" |
| Client-bundle credential check | `grep -rlE "GMAIL_APP_PASSWORD\|GMAIL_USER\|RESEND_API_KEY\|nodemailer\|api.resend.com" .next/static` | No matches |
| Secret scan of changed files | see 09 §6 | No secrets |
| Production observation (read-only `curl`, not a test of this commit) | — | Still the old deployment: old title, "AI Team Leader", "Jan 2026"; both DOCX 200; PDF 404 |

Contact form: **code-reviewed only, not exercised at runtime.** No test email was sent.

## Run 3 — 2026-10-21, after Batch A changes (branch `portfolio-v2/batch-a`)

| Check | Command | Exit | Result |
|---|---|---|---|
| Typecheck | `npm run typecheck` | 0 | No errors |
| Lint | `npm run lint` | 0 | "No ESLint warnings or errors" |
| Production build | `npm run build` | 0 | 19/19 static pages; route sizes unchanged from baseline |
| Automated tests | — | — | None exist in the repo |

### Local production smoke test (`next start -p 3123`)

| Check | Result |
|---|---|
| 14 pages (`/`, `/about`, `/contact`, `/work`, `/teaching`, `/hackathons`, `/publication`, 7× `/work/[slug]`) plus `/sitemap.xml`, `/robots.txt` | All 200 |
| `/Abdullah-Wagih-Technical-CV.pdf` | 200 `application/pdf`; served SHA-256 = approved input `14ddabf2…1d95` |
| `/Abdullah-Wagih-Technical-CV.docx`, `/Abdullah-Wagih-Teaching-CV.docx` | 404 |
| `/portfolio.zip`, `/.env.local` | 404 |
| Every internal `href="/…"` on `/`, `/about`, `/teaching`, `/work`, `/work/rashad`, `/contact` | 0 broken |
| Rendered HTML contains "AI Team Leader", "Jan 2026", "Teaching-CV", ".docx", `[X]`, or `[N]` | None found |
| Rendered "AI Solution Architect" | Only the project-card role label (`/`, `/work`, `/work/rashad`), retained by decision |
| Required facts present | "AI Engineer \| Generative AI Engineer" (title on all pages checked); Hero eyebrow; "Jun 2026 — Present", "Oct 2025 — Present", "Sep 2023 — Oct 2025", "15%", "920 shipments/day" (home); "500+" (about); JSON-LD `jobTitle` = "AI Engineer \| Generative AI Engineer" |

### Run 3b — after independent-review fixes (R-1/R-2/R-3/R-6)

typecheck **0**, lint **0** (no warnings), build **0** (19/19). In the rebuilt `.next/server/app/**/*.html`: no "AI Team Leader", "Jan 2026", ".docx", "Teaching-CV", `[X]`, or `[N]`. Every rendered "Architect" hit was classified: "AI Solution Architect" (project role), "AI Architecture"/"Enterprise AI Architecture" (capabilities), "Architect AI solutions…" (CV verb), and the motto "Architect · Builder · Educator" (D-14). The header now renders ">AI Engineer</span>".

### Not tested (out of Batch A scope or not possible here)

- Responsive and visual review, keyboard and accessibility, Lighthouse, and cross-browser testing (Batch D)
- **Contact form end-to-end delivery.** This was not tested and is **potentially unavailable**: the old Gmail app password was revoked, and a new one has not been configured or verified.
- Deployed or preview smoke test (no deployment authorized)

## Run 2 — baseline before changes

`npm ci` 0 (after one EBUSY retry), typecheck 0, lint 0, build 0.

## Run 1

Not possible because Node.js was not installed.
