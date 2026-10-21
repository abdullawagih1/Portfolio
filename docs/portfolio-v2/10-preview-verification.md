# 10 — Preview Verification (Batch A)

Prepared 2026-10-21 under the Preview Release Work Order.

> **Update 2026-10-21 (Production Gate Preparation): Preview Functional Gate = PASS (Owner-Verified).**
> The owner manually tested the SSO-protected preview and confirmed all nine checks passed. These are **owner-verified manual results, not independent or automated evidence**. The agent did not observe the preview.
>
> | # | Check | Result | Evidence type |
> |---|---|---|---|
> | 1 | Homepage | PASS | Owner-verified (manual) |
> | 2 | Experience | PASS | Owner-verified (manual) |
> | 3 | Sahwah metrics | PASS | Owner-verified (manual) |
> | 4 | Projects | PASS | Owner-verified (manual) |
> | 5 | About and Teaching | PASS | Owner-verified (manual) |
> | 6 | Technical CV | PASS | Owner-verified (manual) |
> | 7 | Old CV removal | PASS | Owner-verified (manual) |
> | 8 | Navigation | PASS | Owner-verified (manual) |
> | 9 | Mobile responsiveness | PASS | Owner-verified (manual) |
>
> Automated evidence for the same code remains local only (04). Not covered by the owner's nine checks: preview env-var names and scopes, the JSON-LD and canonical source check, and keyboard-only navigation. See 11.

**Original recommendation (before owner verification): CONDITIONAL PASS.** The preview built and deployed successfully from the exact pushed commit, and production is untouched. Page and asset verification on the preview is **pending owner manual verification** (§5), because Vercel Deployment Protection blocks unauthenticated access.

## 1. Remote branch and commit

| Item | Value |
|---|---|
| Docs commit | `dacc42999c477cf1abd8d8e655dc9731bbaf1937`, "docs(portfolio): record Batch A release readiness" (8 report files only) |
| Release commit (code) | `9d24bc71b06f6c63c96318babde3c9e9f05ade1e`. `dacc429` changes only `docs/portfolio-v2/*.md`, so application code is identical. |
| Pushed branch | `portfolio-v2/batch-a` → https://github.com/abdullawagih1/Portfolio/tree/portfolio-v2/batch-a |
| Remote head | `git ls-remote`: `refs/heads/portfolio-v2/batch-a` = `dacc429…1937` |
| `main` | Unchanged at `078519e` (local and remote). No merge, no PR, no force-push. |

## 2. Preview deployment

| Item | Value |
|---|---|
| Created by | Vercel Git integration, automatically on push. No duplicate was created; there is no Vercel CLI on this machine. |
| Status | GitHub commit status context `Vercel` on `dacc429`: **`success`**, "Deployment has completed" (updated 2026-10-21T11:06:43Z, about 1 minute after push) |
| Commit association | The status is attached to commit `dacc429…1937` itself, which is the exact pushed commit |
| Vercel inspector | https://vercel.com/abdullah-wagihs-projects/portfolio/HrmPFLtmQQedoWndPw1StHdtzs1J (needs Vercel login) |
| Branch preview URL | https://portfolio-git-portfolio-v2-batch-a-abdullah-wagihs-projects.vercel.app |
| Access | **Protected.** Unauthenticated requests return `302` to Vercel SSO and send `X-Robots-Tag: noindex` and HSTS. This is the correct posture for a preview. |
| Production | **Unchanged:** `https://abdullah-wagih.vercel.app/` still serves the old title, both DOCX return 200, and the PDF returns 404. Nothing was promoted. |

## 3. Environment readiness: **UNVERIFIED** (needs owner)

The agent could not inspect Vercel env vars. The read-only browser session was authorized but unavailable: Chrome remote debugging is off, and the owner chose manual verification. No values were read, copied, or changed.

The owner should check, in Vercel → Project → Settings → Environment Variables, using **names and scopes only**:

| Variable | Required scope | Expected |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production (and Preview if preview canonicals matter) | The real public origin, e.g. `https://abdullah-wagih.vercel.app` or the custom domain. If unset, canonicals and OG fall back to `https://abdullahwagih.example`. |
| `GMAIL_USER` | Preview + Production | Present |
| `GMAIL_APP_PASSWORD` | Preview + Production | A **new** value (the old one is revoked), or **removed** to get the safe mailto fallback |
| `CONTACT_TO_EMAIL` | Optional | Recipient inbox |

**Canonical note:** if `NEXT_PUBLIC_SITE_URL` is set only for Production, the preview's canonical/OG URLs will show the fallback `.example` domain. That is harmless on a `noindex` preview, but it must be correct for Production before release (OPS-02).

## 4. Contact form status: **NOT USABLE / NOT TESTED**

- SMTP usability on Preview is unknown, because the env vars could not be inspected. The old password is revoked.
- No form submission was made and no email was sent.
- **Fallback behaviour** (code-reviewed, see 09 §3):
  - No Gmail vars at all → "not configured" message plus a mailto button. Safe.
  - Vars present with the revoked password → generic error and the message is lost. Safe, but poor experience.
- Owner actions: set a new app password (Preview first), or remove the variable; then run the authorized E2E test in 09 §3 step 5. **A successful delivery test remains a production release condition.**

## 5. Page and asset verification: **PENDING — owner manual checklist**

Open the branch preview URL while logged in to Vercel and tick each item:

- [ ] `/` loads; tab title "Abdullah Wagih | AI Engineer | Generative AI Engineer"; Hero eyebrow "AI Engineer · Generative AI Engineer"; header label beside the name reads "AI Engineer"
- [ ] Experience: **Vitamera — AI Engineer**, Jun 2026 — Present, Part-time; **Rubix — AI Engineer, Oct 2025 — Present**, Full-time; **Sahwah — Data Scientist**, Sep 2023 — Oct 2025, with **15%** and **920 shipments/day**
- [ ] `/about` summary mentions 3+ years, Egypt/Saudi Arabia, and 500+ trained
- [ ] Header, mobile menu, and footer show **only** "Technical CV". There is no "Teaching CV" anywhere, including on `/teaching`.
- [ ] "Technical CV" downloads `Abdullah-Wagih-Technical-CV.pdf`, a 3-page PDF headed "AI Engineer | Generative AI Engineer" (optional hash check: SHA-256 starts `14ddabf2`)
- [ ] `<preview>/Abdullah-Wagih-Technical-CV.docx` and `<preview>/Abdullah-Wagih-Teaching-CV.docx` return **404**
- [ ] `<preview>/.env.local`, `/portfolio.zip`, and `/docs/portfolio-v2/inputs/Portfolio_v2_Change_Register.md` return **404**
- [ ] No `[X]`, `[N]`, "AI Team Leader", or "Jan 2026" is visible on any page
- [ ] All nav links work: Work, Architecture (anchor), Teaching, Hackathons, Publication, About, Contact; all 7 `/work/<slug>` pages open
- [ ] View source on `/`: JSON-LD `"jobTitle":"AI Engineer | Generative AI Engineer"`; `og:title` matches; canonical uses the expected origin (see §3)
- [ ] Mobile width (DevTools ~375 px): no horizontal scroll, the menu opens and closes, and the CV button is reachable by keyboard (Tab and Enter)
- [ ] Vercel deployment page shows the source commit `dacc429` on branch `portfolio-v2/batch-a`

**Local evidence for the same build** (commit `9d24bc7` code, see 04): all of the above passed on `next start`. Local results are **not** a substitute for preview verification.

## 6. Security observations

- The preview is SSO-protected and `noindex`. HSTS is present.
- The push contained no secrets, env files, zip, or private inputs. This was verified before both commits, and `docs/portfolio-v2/inputs/` is gitignored.
- The pushed branch makes the deletion of the DOCX files public, but both files remain in the public history at `3a36772` (D-19).
- No external credentials, env values, or settings were accessed or changed.

## 7. Remaining production blockers

1. **Owner preview verification:** complete the §5 checklist.
2. **Env vars:** confirm `NEXT_PUBLIC_SITE_URL` for Production, and replace or remove `GMAIL_APP_PASSWORD` (D-11).
3. **Contact form E2E delivery test**, authorized, on the preview and then on production.
4. **Orchestrator authorization** to merge to `main` and deploy to production (D-18). Not authorized.
5. **Post-deploy production checklist** (09 §7), including confirming the old DOCX URLs return 404 after the cache refreshes.

## 8. Recommendation

**Preview: CONDITIONAL PASS.** The deployment succeeded on the exact commit, is protected, and production is unaffected. It becomes a PASS once the owner completes §5 with no failures. **Production: NO-GO** until §7 items 1–4 are complete.
