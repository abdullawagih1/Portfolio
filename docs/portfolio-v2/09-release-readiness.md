# 09 — Release Readiness (Batch A)

Prepared 2026-10-21. **Preparation only: nothing has been pushed, merged, or deployed.** Every "PASS" below is a **local** result unless it is explicitly marked as production.

## 1. Branch and commit

| Item | Value |
|---|---|
| Branch | `portfolio-v2/batch-a` (local only, not on GitHub) |
| Release commit | `9d24bc71b06f6c63c96318babde3c9e9f05ade1e`, "feat(portfolio): align professional content with approved CV" |
| Parent / `origin/main` | `078519e`, which is also what production serves |
| Commits ahead of `origin/main` | 1 |
| Working tree | Clean except the uncommitted report updates in `docs/portfolio-v2/` (01, 03–09) from this release-prep pass. A new commit for these was not authorized. |

## 2. Local build status (commit `9d24bc7`)

| Check | Result |
|---|---|
| `npm run typecheck` | PASS (exit 0) |
| `npm run lint` | PASS (exit 0, no warnings) |
| `npm run build` | PASS (exit 0, 19/19 static pages) |
| Local `next start` smoke test | PASS. All routes 200, 0 broken internal links, CV facts rendered (see 04) |
| Automated tests | None exist in the repo |
| Runtime | Node 24.20.0 locally. **Vercel's Node version setting has not been checked**; Next 14.2 needs ≥ 18.17. |

## 3. Contact form readiness: **NOT READY** (credential pending)

### Assessment (from `src/lib/actions.ts`, `src/lib/email.ts`, `src/components/contact-form.tsx`)

| Question | Finding |
|---|---|
| Required env vars | **Gmail path (current):** `GMAIL_USER`, `GMAIL_APP_PASSWORD`. **Alternative:** `RESEND_API_KEY`, with optional `EMAIL_FROM` (needs a verified domain). Optional: `CONTACT_TO_EMAIL`, which defaults to the public site email. `NEXT_PUBLIC_SITE_URL` is for canonical/OG URLs, not the form. Gmail wins if both providers are set. |
| Server-side validation | Required name, email, reason, and message (trimmed), plus an email regex. HTML output is escaped (`escapeHtml`). **Gaps:** no length limits; `reason` is not checked against the allowed list; no honeypot, captcha, or rate limiting → OPS-03 (Batch D), D-20. |
| Error handling | Provider calls are wrapped in try/catch, with 8–10 s SMTP and fetch timeouts. The visitor sees a generic error, and details go only to the server log. |
| Fails safely without credentials? | **No provider vars set:** returns `not-configured` with a mailto fallback button. Safe, and it never fakes success. **Vars set but credential revoked (the likely state of Vercel today):** the provider is detected as `gmail`, SMTP auth fails, and the visitor gets "Something went wrong… email directly" with no mailto button in that state. The `/contact` page shows the address separately. No leak and no false success, but **the visitor's message is lost**. |
| Credentials exposed to client? | **No.** `email.ts` is imported only by the `"use server"` action, the only `NEXT_PUBLIC_*` variable is the site URL, and `.next/static` has no credential or provider references. |
| Runtime-tested? | **No.** Code review only. No test email has been sent. |

### Remediation and verification plan (all owner/Orchestrator actions)

1. **Owner** creates a new Gmail App Password. The agent must not do this.
2. **Owner** updates Vercel → Project → Settings → Environment Variables. Set `GMAIL_USER` and `GMAIL_APP_PASSWORD` for **Preview** first, then Production. Replace the revoked value; don't add a duplicate. Optionally set `CONTACT_TO_EMAIL`.
   - If the credential won't be ready before release, **remove** `GMAIL_APP_PASSWORD` from Production instead. The form then shows the safe mailto fallback rather than a failing send.
3. **Owner** updates local `.env.local` the same way. It currently holds the revoked value, so local sends would fail.
4. **Authorized** preview deployment of `portfolio-v2/batch-a`.
5. **End-to-end test on the preview URL** (needs authorization to send one email):
   1. Submit once with the owner's own email as sender, reason "AI training and workshops", and the message "E2E test — <date>".
   2. The UI shows "Message sent".
   3. The email arrives at `CONTACT_TO_EMAIL` within about 1 minute. The subject is "New inquiry: … — <name>", and **Reply-To is the sender's address**.
   4. Vercel function logs show no `Gmail SMTP error`.
6. **Negative tests** on the preview, which send no email: empty fields → validation message; bad email → "valid email" message.
7. Repeat step 5 once on Production after the release.
8. Record the results in 04 and mark D-11 closed.

## 4. Public asset status

| Artifact | Local build (`9d24bc7`) | Current production | Git history |
|---|---|---|---|
| Technical CV **PDF** (approved) | ✅ 200, SHA-256 `14ddabf2…1d95` = approved input | ❌ 404 (not yet deployed) | Added in `9d24bc7` (local) |
| Technical CV DOCX (outdated) | ✅ 404, removed | ⚠️ **200**, still public | In `3a36772`, **already public on GitHub**; deleted in `9d24bc7` |
| Teaching CV DOCX (placeholders) | ✅ 404, removed | ⚠️ **200**, still public | Same as above |
| Private inputs (`docs/portfolio-v2/inputs/`) | ✅ 404 (not under `public/`) | ✅ 404 | ✅ Never committed (gitignored) |
| `.env.local` / `.env` / `.env.example` URLs | ✅ 404 | ✅ 404 | Only the placeholder `.env.example` is tracked |
| `portfolio.zip` | ✅ 404 | ✅ 404 | ✅ Never committed. The backup is outside the repo, and the secret in it is revoked. |

Deploying `9d24bc7` removes both DOCX files from the site. It does **not** remove them from GitHub history. History was not rewritten; D-19 is open for a decision.

## 5. Environment variable requirements (Vercel)

| Variable | Needed for | Scope | Status |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical, OG, sitemap, robots. Falls back to `https://abdullahwagih.example`. | Prod + Preview | Unknown in Vercel; **verify it is set to the real domain** (OPS-02) |
| `GMAIL_USER` | Contact form (Gmail) | Prod + Preview | Unknown in Vercel |
| `GMAIL_APP_PASSWORD` | Contact form (Gmail) | Prod + Preview | **Revoked. Must be replaced or removed** (§3) |
| `CONTACT_TO_EMAIL` | Recipient (optional) | Prod + Preview | Optional |
| `RESEND_API_KEY`, `EMAIL_FROM` | Alternative provider | — | Not used |

The agent cannot see Vercel's settings and did not access them.

## 6. Secret scan of changed files (this pass)

- Changed files in `9d24bc7`, plus the uncommitted report edits, were scanned for Resend, AWS, and OpenAI key formats, `GMAIL_APP_PASSWORD=`/`RESEND_API_KEY=` with values, and the Gmail app-password shape. **No secrets found.** The only pattern hits were prose false positives.
- The reports name variables only, never values.

## 7. Production verification checklist (to run **after** an authorized deploy)

- [ ] The preview deploy of `portfolio-v2/batch-a` builds on Vercel, and its Node version is ≥ 18.17
- [ ] `<title>` is "Abdullah Wagih | AI Engineer | Generative AI Engineer" on `/`; JSON-LD `jobTitle` matches
- [ ] Hero, header label, roleLine, Experience (Vitamera/Rubix AI Engineer; Rubix **Oct 2025**; Sahwah 15% and 920/day), and About summary all match the CV
- [ ] No "AI Team Leader", "Jan 2026", `[X]`, or `[N]` anywhere in the rendered pages
- [ ] `/Abdullah-Wagih-Technical-CV.pdf` returns 200, and its hash matches `14ddabf2…1d95`
- [ ] `/Abdullah-Wagih-Technical-CV.docx` and `/Abdullah-Wagih-Teaching-CV.docx` return **404** (check after cache expiry; production currently sends `Age` of about 9.8 days, so purge or redeploy if needed)
- [ ] There is no Teaching CV link in the header (desktop and mobile), footer, or `/teaching`
- [ ] All 7 `/work/[slug]` pages, `/sitemap.xml`, and `/robots.txt` return 200; canonical/OG URLs use the real domain
- [ ] Contact form E2E test passes (§3 step 5), plus the negative tests
- [ ] Responsive, keyboard, and Lighthouse spot-check (full coverage is Batch D)
- [ ] Rollback is ready: Vercel "Promote previous deployment" to the current production build

## 8. Outstanding risks

| Risk | Severity | Mitigation |
|---|---|---|
| Production still shows the wrong titles and date, and serves CVs with placeholders | HIGH (reputational, recruiter-facing) | Deploy `9d24bc7` once authorized |
| Contact form currently loses messages if Vercel holds the revoked password | MEDIUM | §3 steps 1–2, or remove the variable to get the mailto fallback |
| Old DOCX CVs stay in public GitHub history | LOW (same content as was already public) | D-19 decision; history not rewritten |
| `NEXT_PUBLIC_SITE_URL` may be unset or wrong in Vercel, producing `.example` canonicals | MEDIUM (SEO) | Verify before deploy (OPS-02) |
| No automated tests; verification is manual | MEDIUM | Batch D |
| Contact form lacks rate limiting and abuse controls | MEDIUM | OPS-03, Batch D |
| Vercel Node version unverified | LOW | Check project settings |

## 9. Recommendation

**Production release: NO-GO** until all of the following are true:

1. The Orchestrator authorizes push, preview deployment, and merge/promotion (D-18).
2. The Gmail credential is replaced, or deliberately removed, in Vercel (D-11).
3. The §7 checklist passes on the **preview** deployment.

**Push and preview deployment: GO**, whenever authorized. The local evidence supports it: build, lint, and typecheck pass, the CV facts are verified, and no secrets or private inputs are in the commit.
