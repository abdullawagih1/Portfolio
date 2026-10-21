# 11 — Production Gate Preparation (Batch A)

> **Update 2026-10-21: Orchestrator decisions (Production Configuration Gate).**
> - Production deployment stays **blocked**.
> - **B-1:** the Production site URL **must be `https://abdullah-wagih.vercel.app`**. This is decided; owner action is pending.
> - **B-2:** **Option B (safe mailto fallback) adopted** as the temporary contact-form strategy. This is decided; the owner must remove `GMAIL_APP_PASSWORD` and confirm no active `RESEND_API_KEY`.
> - **B-3:** the owner must verify the env scopes and Node runtime. Pending.
> - **B-4:** merge and deploy are still not authorized.
> - Old CVs in git history are **accepted temporarily** (D-19). Rate limiting and spam hardening are **deferred** (D-20). D-21 is **closed** (owner-verified preview).
>
> Current status and the owner confirmation checklist are in **12**.
>
> **Superseded (FRR-001 / DOC-COMMIT-001):** B-1, B-2, and B-3 are now **closed**. The configuration was Orchestrator-verified, with Production Environment PASS (see 12 and 13). B-4 remains open.

Prepared 2026-10-21. **Read-only assessment.** Nothing was merged, pushed, deployed, promoted, or reconfigured, and no email was sent. No Vercel dashboard or API access was used.

## Recommendation: **NO-GO** (configuration blockers; the code is ready)

The candidate build is functionally ready: the preview is owner-verified PASS and the local automated checks pass. Production is blocked by **configuration**, not code:

1. `NEXT_PUBLIC_SITE_URL` is not in effect in Production. This is confirmed from public output.
2. The contact-form credential path is undecided.
3. Merge/deploy authorization has not been given.

**GO** once §7 items B-1 to B-4 are closed.

## 1. Preview gate (user-confirmed)

**PASS, owner-verified (manual)** on all nine checks: homepage, experience, Sahwah metrics, projects, About and Teaching, Technical CV, old CV removal, navigation, and mobile responsiveness. See 10. This is manual evidence. The agent's automated evidence for the same code is **local only** (04).

## 2. Production configuration checklist

Evidence sources: public production HTML and metadata (non-secret), GitHub's public deployment API, and the repository. **Env-var names, scopes, and the Node version could not be read**, because there was no Vercel access; those are marked UNVERIFIED.

| Item | Finding | Evidence | Status |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` (Production) | **Not in effect.** Production's canonical, `og:url`, JSON-LD `url`, `sitemap.xml`, and `robots.txt` all use the code fallback `https://abdullahwagih.example`. | `curl` of the production `/`, `/sitemap.xml`, `/robots.txt` | ❌ **BLOCKER (B-1)** |
| Correct value | Recommended: `https://abdullah-wagih.vercel.app`, the live origin, which is also the "Portfolio" link inside the approved CV PDF, unless a custom domain is attached. **Do not use `https://abdullahwagih.com`**: that is the value in local `.env.local` and `.env.example`, and the domain does not resolve (DNS lookup fails). | `curl` exit 6 for abdullahwagih.com; CV PDF link | Owner decision |
| Build-time note | `NEXT_PUBLIC_*` is inlined at **build** time. Set it in Vercel **before** the production build, or redeploy after setting it. | Next.js behaviour | — |
| `GMAIL_USER` | Unknown | No Vercel access | UNVERIFIED |
| `GMAIL_APP_PASSWORD` | Unknown. If present, it is the **revoked** value. | Revocation confirmed by owner (05) | UNVERIFIED, see §3 |
| `CONTACT_TO_EMAIL` | Unknown. Optional; defaults to the public site email. | Code | UNVERIFIED (optional) |
| `RESEND_API_KEY` | Unknown. **Must be absent** for Option B to produce the fallback. | Code (`getConfiguredProvider`) | UNVERIFIED |
| Node.js version | Unknown. `package.json` has no `engines` field, so Vercel uses the project setting. Next 14.2.35 needs ≥ 18.17. The local build was verified on 24.20.0. | Repo | UNVERIFIED |
| Preview vs Production scopes | Unknown. Recommended: Production gets the real `NEXT_PUBLIC_SITE_URL`. Preview gets either the same value or none (the preview is `noindex` and SSO-protected). Gmail vars go in Preview first if Option A is chosen. | — | UNVERIFIED |

### Owner verification steps (read-only, about 3 minutes)

1. Vercel → `portfolio` project → **Settings → Environment Variables**. For each of `NEXT_PUBLIC_SITE_URL`, `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `CONTACT_TO_EMAIL`, `RESEND_API_KEY`, note **present/absent** and its **environments** (Production / Preview / Development). Don't reveal values.
2. **Settings → Build & Deployment (General) → Node.js Version**: note the version (must be ≥ 18.17; 20.x or 22.x recommended).
3. **Settings → Domains**: note whether a custom domain is attached. This decides the correct `NEXT_PUBLIC_SITE_URL`.
4. Report the findings. The agent will record them in this file.

## 3. Contact form release strategy

### Behaviour confirmed from the implementation (`src/lib/email.ts`, `src/lib/actions.ts`, `src/components/contact-form.tsx`)

- The provider is `gmail` **only if both** `GMAIL_USER` **and** `GMAIL_APP_PASSWORD` are set. Otherwise it is `resend` if `RESEND_API_KEY` is set, and `none` if neither is.
- **With `none`:** after server-side validation passes, the action returns `not-configured`. The UI shows "Email delivery isn't configured on this deployment yet…" plus a **mailto button** to the public address. No send is attempted and no success is faked.
- **With `gmail` and a revoked password:** the SMTP auth error is caught and the visitor sees a generic error with **no mailto button**, so the message is lost. The `/contact` page shows the email address separately.
- Env-var changes in Vercel apply **only to new deployments**, so a redeploy is required after either option.

| | **Option A — SMTP ready** | **Option B — Safe fallback** |
|---|---|---|
| Owner action | Create a new Gmail App Password; set it in Vercel (Preview first, then Production) | Delete `GMAIL_APP_PASSWORD` in Vercel (Preview and Production); make sure `RESEND_API_KEY` is absent |
| Visitor experience | The form sends directly | Validated form, then a one-click mailto to the public address |
| Release dependencies | An authorized E2E test email on the preview, then on production (09 §3) | None. Optionally verify on a redeployed preview that a submit shows the fallback; this sends no email. |
| Risk | Credential handling; the test needs email authorization; failure leaves the lossy error state | Lower conversion (extra click); no credential in the system |
| Rollback interaction | A rollback restores the old deployment **with its old env** (the revoked password), which is the lossy state | Same caveat (see §5) |

**Recommendation: Option B for this release.** It has no credential dependency and needs no external email, and it turns today's likely lossy failure into a safe, honest fallback. Move to Option A later as a separate change with its own authorized delivery test.

## 4. Release integrity

| Item | Value |
|---|---|
| Current branch | `portfolio-v2/batch-a` (tracks `origin/portfolio-v2/batch-a`, in sync) |
| Latest pushed commit | `dacc42999c477cf1abd8d8e655dc9731bbaf1937` (docs only) on top of `9d24bc71b06f6c63c96318babde3c9e9f05ade1e` (code) |
| Production branch | `main` = `078519e1b9d717d9612ecb6d75debdb85d5b087a` (local and remote) |
| Production deployment | GitHub deployment env `Production`, sha `078519e`, created 2026-08-06T13:18:16Z. Vercel deployment `CpaY4NrtWhoVgBgN2vL4FvRwUmzr`. |
| Preview (candidate) deployment | GitHub deployment env `Preview`, sha `dacc429`, created 2026-10-21T11:06:44Z. Vercel deployment `HrmPFLtmQQedoWndPw1StHdtzs1J`, status `success`. |
| Uncommitted changes | `docs/portfolio-v2/07-open-decisions.md` (M), `10-preview-verification.md` (new), `11-production-gate-preparation.md` (new). **Documentation only; not committed (no authorization).** |
| Unexpected changes | None. Nothing outside `docs/portfolio-v2/` differs from `HEAD`. |
| Secrets in release artifacts | None. The pre-commit scans of `9d24bc7` and `dacc429` were clean; the uncommitted docs were scanned clean; `.next/static` has no credential references; `docs/portfolio-v2/inputs/` is gitignored. |

## 5. Rollback plan (documented only, not executed)

**Current production (restore target):** `CpaY4NrtWhoVgBgN2vL4FvRwUmzr` (commit `078519e`).
**Candidate release:** the production build created by merging `portfolio-v2/batch-a` into `main`. Vercel builds `main` with **Production** env vars.
- Promoting preview `HrmPFLtmQQedoWndPw1StHdtzs1J` directly is possible. It is not recommended, because the preview was built with Preview-scoped env, and `NEXT_PUBLIC_SITE_URL` is inlined at build time.

**Before release:** in Vercel → Deployments, note the ID of the current production deployment (expected `CpaY4…`) and confirm it is marked "Current".

**To roll back (owner, in Vercel):**
1. Vercel → `portfolio` → **Deployments**. Open `CpaY4NrtWhoVgBgN2vL4FvRwUmzr`, or use **Instant Rollback** from the production deployment's menu.
2. Choose **Instant Rollback** (or "Promote to Production" on that deployment). This reassigns the production domain to the existing build without rebuilding.
3. Note: after an Instant Rollback, Vercel stops auto-assigning the production domain to new `main` deployments until a deployment is promoted again. Undo this deliberately when re-releasing.

**Verify rollback success:**
- `curl https://abdullah-wagih.vercel.app/` → `<title>` returns to "AI Solution Architect & Generative AI Engineer" (the old version)
- `/Abdullah-Wagih-Technical-CV.docx` → 200 and `/Abdullah-Wagih-Technical-CV.pdf` → 404 (old asset set)
- Vercel shows `CpaY4…` as Current

**Env-var dependencies:**
- A rolled-back deployment runs with the env values captured **when it was built**. That means the old `.example` canonical, and the revoked Gmail password if it was present then.
- Rollback therefore restores the **old content and old config issues**. It is a content safety net, not a configuration fix.
- Env-var edits made for the release (B-1, Option B) stay in project settings and apply to future builds.

## 6. Production post-deploy checklist (after an authorized release)

Same as 09 §7, plus:
- [ ] Canonical, `og:url`, sitemap, and robots use the chosen real origin, not `.example`
- [ ] Contact form: Option B shows the fallback with a mailto button on submit; Option A's authorized E2E test passes
- [ ] Old DOCX URLs return 404 (after cache refresh)

## 7. Remaining blockers

| # | Blocker | Owner | Closes when |
|---|---|---|---|
| **B-1** | `NEXT_PUBLIC_SITE_URL` missing in Production; the canonical is `.example` | Abdullah | Set (recommended `https://abdullah-wagih.vercel.app`) for Production before the release build |
| **B-2** | Contact-form path undecided (D-23) | Orchestrator / Abdullah | Option B applied (Gmail password removed, Resend absent), or Option A applied plus E2E passed |
| **B-3** | Env-var scopes and Node version unverified (D-22) | Abdullah | Owner reports the §2 read-only checks |
| **B-4** | Merge to `main` / production deploy not authorized (D-18) | Orchestrator | Explicit authorization |
| — | Report 10 updates and this report uncommitted | Orchestrator | Commit/push authorization (non-blocking) |
| — | Old DOCX in public git history (D-19); contact-form hardening (D-20, Batch D) | — | Non-blocking for Batch A |

## 8. Production GO / NO-GO

**NO-GO now.** It becomes **GO** when:
- B-1 is set;
- B-2 is resolved (Option B recommended);
- B-3 is confirmed;
- B-4 is authorized;

followed by the §6 post-deploy checks, with the §5 rollback ready.
