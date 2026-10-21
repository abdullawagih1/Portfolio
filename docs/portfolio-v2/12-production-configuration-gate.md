# 12 — Production Configuration Gate (Batch A)

Prepared 2026-10-21. **Read-only verification and documentation.** Nothing was merged, pushed, deployed, promoted, or reconfigured. No secret value was read and no email was sent.

> **Update 2026-10-21 (FRR-001):** the Orchestrator reports via the Vercel connector that these are satisfied:
> - O-1: `NEXT_PUBLIC_SITE_URL` = `https://abdullah-wagih.vercel.app`, **value and Production scope verified** (per DOC-COMMIT-001, superseding FRR-001's presence-only note);
> - O-2: `GMAIL_APP_PASSWORD` absent from Production **and Preview**;
> - O-3: `RESEND_API_KEY` absent;
> - O-4: `GMAIL_USER` Prod + Preview;
> - O-5: Node 24.x.
>
> These are **Orchestrator-reported** results, not agent-observed. **Production Environment: PASS.** B-1 to B-3 are closed on that basis; B-4 (merge/deploy authorization) remains open. See 13.

## Recommendation (at time of writing): **NO-GO**

No owner confirmations of the Vercel configuration have been received, and production deployment is not authorized. The code and the fallback behaviour are ready.

## 1. Approved decisions (recorded in 07 and 11)

| Decision | Recorded as |
|---|---|
| Keep the production deployment blocked | D-18 |
| Production site URL = `https://abdullah-wagih.vercel.app` | D-22 / B-1 |
| Option B (safe mailto fallback) as the temporary contact strategy | D-23 (D-11 superseded) |
| Old CV files stay in git history temporarily | D-19 |
| Close D-21 (owner-verified preview) | D-21 |
| Defer rate limiting and spam hardening | D-20 |

## 2. Production environment readiness

### Owner confirmations received: **none yet**

| # | Required owner action (Vercel → `portfolio` → Settings) | Expected end state | Confirmed? |
|---|---|---|---|
| O-1 | Environment Variables: set `NEXT_PUBLIC_SITE_URL` | Present, **Production** scope, value `https://abdullah-wagih.vercel.app` (non-secret; no trailing slash) | ☐ Not yet |
| O-2 | Environment Variables: remove `GMAIL_APP_PASSWORD` | **Absent from Production.** Also remove it from Preview, so preview behaviour matches. | ☐ Not yet |
| O-3 | Environment Variables: check `RESEND_API_KEY` | **Absent** in Production (otherwise the provider becomes `resend`, not the fallback) | ☐ Not yet |
| O-4 | Environment Variables: review scopes | `GMAIL_USER` and `CONTACT_TO_EMAIL` may remain; they are harmless without the password. No variable is unintentionally scoped to Production. | ☐ Not yet |
| O-5 | Build & Deployment → Node.js Version | ≥ 18.17; 20.x or 22.x recommended | ☐ Not yet (version: ____) |

### Read-only confirmation checklist (for the owner to complete and return)

Report each item as present/absent and its scopes. **Never paste secret values.**

```
O-1 NEXT_PUBLIC_SITE_URL : present? __  scopes: __  value == https://abdullah-wagih.vercel.app? __
O-2 GMAIL_APP_PASSWORD   : absent in Production? __  absent in Preview? __
O-3 RESEND_API_KEY       : absent in Production? __
O-4 Other vars + scopes  : GMAIL_USER __ / CONTACT_TO_EMAIL __ / anything else in Production __
O-5 Node.js Version      : __
Custom domain attached?  : __ (if yes, B-1's URL decision must be revisited)
```

### Agent-observable evidence (public, non-secret)

| Check | Current production | Expected after release |
|---|---|---|
| Canonical / `og:url` / sitemap / robots origin | `https://abdullahwagih.example` (env not applied) | `https://abdullah-wagih.vercel.app` |
| `<title>` | "…AI Solution Architect & Generative AI Engineer" (old build `078519e`) | "Abdullah Wagih \| AI Engineer \| Generative AI Engineer" |

Env changes only take effect on a **new build**. Because `NEXT_PUBLIC_SITE_URL` is inlined at build time, O-1 must be completed **before** the production build. A correct canonical on the live site can only be confirmed after an authorized deploy.

## 3. Contact form fallback readiness: **READY (code + local runtime evidence)**

### Code path (`src/lib/email.ts` `getConfiguredProvider`, `src/lib/actions.ts`)

- `gmail` requires **both** `GMAIL_USER` and `GMAIL_APP_PASSWORD`. With the password removed (O-2), the provider can't be Gmail.
- `resend` requires `RESEND_API_KEY`. With it absent (O-3), the provider is `none`.
- With `none`, after validation passes, the action returns `not-configured` **before any send is attempted**. The UI shows the fallback message plus a `mailto:` button to the public address.

### Local runtime verification (no email possible)

- Production build of `9d24bc7` code run with `GMAIL_USER=`, `GMAIL_APP_PASSWORD=`, and `RESEND_API_KEY=` forced empty: `next start -p 3125`. Empty process vars take precedence over `.env.local`, so no credential was loaded or read.
- The form was submitted as a no-JS progressive-enhancement POST to `/contact` (the same path a browser uses without JavaScript).

| Test | Input | Result |
|---|---|---|
| T1 fallback | Valid name, `test@example.com`, reason, message | ✅ `status: "not-configured"`; "Email delivery isn't configured on this deployment yet, so please send it directly using the button below."; `href="mailto:abdullawagih1@gmail.com"` rendered |
| T2 validation | All fields empty | ✅ `status: "error"`, "Please fill in your name, email, reason, and message." |
| T3 validation | Invalid email | ✅ `status: "error"`, "Please enter a valid email address." |
| Side effects | — | ✅ Server log has no `Gmail SMTP error` or `Resend` entries; there is no send code path under `none`. The only warnings were "Missing `origin` header" (from the curl client, harmless). |

This is **local** evidence. Production fallback behaviour remains to be confirmed after deploy (§4).

## 4. Post-deployment fallback test (owner; sends no email)

After an **authorized** production deploy, with O-1 to O-3 completed:

1. Open `https://abdullah-wagih.vercel.app/contact`.
2. Submit with all fields empty → expect "Please fill in your name, email, reason, and message."
3. Enter an invalid email (e.g. `abc`) → expect "Please enter a valid email address."
4. Fill valid test values (your own name and email, any reason, the message "fallback check") → **Send message** → expect the blue info panel "Email delivery isn't configured on this deployment yet…" and an **"Email abdullawagih1@gmail.com"** button.
5. **Do not** click the mailto button unless you intend to send. Clicking only opens your mail client and sends nothing by itself.
6. Optionally check Vercel → Logs for the request: there should be no `Gmail SMTP error`.
7. **Fail condition:** a red "Something went wrong…" message means a provider is still configured. Recheck O-2 and O-3, then redeploy.

## 5. Release commit integrity

| Item | Value | Check |
|---|---|---|
| Current branch | `portfolio-v2/batch-a`, in sync with `origin/portfolio-v2/batch-a` | ✅ `git status` |
| Pushed head | `dacc42999c477cf1abd8d8e655dc9731bbaf1937` (docs) | ✅ `git ls-remote` |
| Release code commit | `9d24bc71b06f6c63c96318babde3c9e9f05ade1e` (`dacc429` adds docs only) | ✅ |
| Preview deployment | `HrmPFLtmQQedoWndPw1StHdtzs1J` on `dacc429`, Vercel status `success`; owner-verified 9/9 | ✅ |
| `main` / production | `078519e` / `CpaY4NrtWhoVgBgN2vL4FvRwUmzr` (unchanged) | ✅ |
| Uncommitted | `07-open-decisions.md` (M), `10-preview-verification.md`, `11-production-gate-preparation.md`, `12-production-configuration-gate.md` (new). Docs only. | ⚠️ Not committed (no authorization) |
| Non-doc changes vs `HEAD` | None | ✅ |
| Secrets | None in commits or uncommitted docs (scanned) | ✅ |

## 6. Remaining blockers

| # | Blocker | Owner | Status |
|---|---|---|---|
| B-1 | Set `NEXT_PUBLIC_SITE_URL` = `https://abdullah-wagih.vercel.app` (Production) before the release build | Abdullah | **Closed** (Orchestrator-verified, FRR-001/DOC-COMMIT-001) |
| B-2 | Apply Option B: remove `GMAIL_APP_PASSWORD`; confirm no active `RESEND_API_KEY` | Abdullah | **Closed** (Orchestrator-reported) |
| B-3 | Verify env scopes and Node runtime | Abdullah | **Closed** (Orchestrator-reported) |
| B-4 | Authorize merge to `main` and production deploy | Orchestrator | **Not authorized** (deliberately blocked) |
| — | Commit and push docs 07, 10–12 | Orchestrator | Non-blocking, needs authorization |

## 7. Remaining release risks

| Risk | Severity | Note |
|---|---|---|
| Production still serves wrong titles and date, and the placeholder CVs | HIGH (reputational) | Continues until the release |
| O-1 done after the build → `.example` canonical persists | MEDIUM | Set before merging; otherwise redeploy |
| `RESEND_API_KEY` unexpectedly present → Resend path with an unverified sender → lossy error | MEDIUM | O-3 |
| The fallback adds friction (mailto click) and depends on the visitor having a mail client; the address is also shown on `/contact` | LOW | Accepted temporarily (Option B) |
| A rollback to `CpaY4…` restores the old content **and** its old env snapshot | LOW | See 11 §5 |
| No spam or rate limiting on the form | LOW under Option B (no outbound send) | Deferred (D-20) |
| Old CVs remain in public git history | LOW | Accepted (D-19) |
| Preview verification is manual only; no automated tests | MEDIUM | Batch D |

## 8. GO / NO-GO

**Production: NO-GO.** It becomes eligible for **GO** when:
- O-1 to O-5 are confirmed (closing B-1 to B-3);
- the Orchestrator authorizes merge and deploy (B-4);

followed by the §4 fallback test and the 11 §6 post-deploy checks, with the 11 §5 rollback ready.
