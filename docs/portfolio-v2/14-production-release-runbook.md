# 14 — Production Release Runbook (Batch A)

**Status: PREPARED, NOT EXECUTED.** Every step needs explicit Orchestrator authorization. Run the steps in order. A ❌ at any **critical** step triggers the Rollback section.

| Reference | Value |
|---|---|
| Production URL | `https://abdullah-wagih.vercel.app` |
| Current production deployment (rollback target) | `CpaY4NrtWhoVgBgN2vL4FvRwUmzr` (commit `078519e`) |
| Release candidate | `origin/portfolio-v2/batch-a` @ `dacc42999c477cf1abd8d8e655dc9731bbaf1937` (code `9d24bc7`). Update this if the docs are committed first. |
| Approved CV hash | SHA-256 `14ddabf2275f2b850efcf993e3a97bc687ce87f87c449d92610cb2c7205e1d95` |

`G` below means `git -c safe.directory=D:/Projects/portfolio`.

## 1. Final pre-merge verification

```bash
$G fetch origin
$G rev-parse origin/main                    # expect 078519e1b9d717d9612ecb6d75debdb85d5b087a
$G rev-parse origin/portfolio-v2/batch-a    # expect the candidate SHA
$G merge-base --is-ancestor origin/main origin/portfolio-v2/batch-a && echo FF-OK
$G status --short                           # expect clean
npm run typecheck && npm run lint && npm run build
```

In Vercel (owner/Orchestrator): note that `CpaY4…` is **Current** for Production; `NEXT_PUBLIC_SITE_URL` is present for Production with **value `https://abdullah-wagih.vercel.app`**; `GMAIL_APP_PASSWORD` and `RESEND_API_KEY` are absent.

**Go criteria:** all of the above match. Otherwise stop.

## 2. Authorized merge into `main`

```bash
$G switch main && $G pull --ff-only origin main
$G merge --ff-only origin/portfolio-v2/batch-a
$G push origin main          # no --force
```

(Alternatively, merge a GitHub PR with "Rebase and merge" or a fast-forward to keep the SHAs identical.) Record the resulting `main` SHA, which should equal the candidate.

## 3. Vercel production build

The push to `main` triggers a Vercel **Production** build using **Production** env settings. **Do not** "Promote" preview `HrmPFLtmQQedoWndPw1StHdtzs1J`: it was built with Preview env, and `NEXT_PUBLIC_SITE_URL` is inlined at build time.

```bash
curl -s https://api.github.com/repos/abdullawagih1/Portfolio/commits/<main-sha>/status   # wait for "success"
```

❌ Build fails → production stays on `CpaY4…` automatically. Investigate; no rollback needed.

## 4. Verify the deployed commit (critical)

- Vercel → Deployments: the newest **Production** deployment is **Current**, and its source is `main @ <candidate SHA>`.
- `curl -s "https://api.github.com/repos/abdullawagih1/Portfolio/deployments?environment=Production&per_page=1"` → `sha` = candidate.

## 5. Canonical URL, metadata, sitemap, robots (critical for SEO)

```bash
U=https://abdullah-wagih.vercel.app
curl -s $U/ | grep -oE '<title>[^<]*</title>|<link rel="canonical" href="[^"]*"|property="og:url" content="[^"]*"|"jobTitle":"[^"]*"'
curl -s $U/sitemap.xml | grep -oE '<loc>[^<]*</loc>' | head -3
curl -s $U/robots.txt
```

**Expect:**
- title "Abdullah Wagih | AI Engineer | Generative AI Engineer";
- canonical, `og:url`, sitemap `<loc>`, and the robots `Sitemap:` line all start with `https://abdullah-wagih.vercel.app`;
- `jobTitle` "AI Engineer | Generative AI Engineer".

❌ Wrong origin (e.g. `.example`) → **not a rollback trigger.** Correct the `NEXT_PUBLIC_SITE_URL` value in Vercel (needs authorization) and redeploy.

## 6. Approved Technical CV (critical)

```bash
curl -s -o /dev/null -w "%{http_code} %{content_type}\n" $U/Abdullah-Wagih-Technical-CV.pdf   # 200 application/pdf
curl -s $U/Abdullah-Wagih-Technical-CV.pdf | sha256sum                                         # 14ddabf2…1d95
```

## 7. Old DOCX links return 404 (critical)

```bash
for p in Abdullah-Wagih-Technical-CV.docx Abdullah-Wagih-Teaching-CV.docx; do curl -s -o /dev/null -w "$p %{http_code}\n" $U/$p; done   # both 404
```

If one still returns 200, recheck after a few minutes or with a cache-busting query (`?v=1`). A persistent 200 means the wrong deployment is live; go back to step 4.

## 8. Navigation, responsive layout, key content

- All of these return 200: `/`, `/about`, `/contact`, `/work`, `/teaching`, `/hackathons`, `/publication`, `/work/{noor,logibrain,careeros,rashad,hormonify,edusys,real-estate}`.
- Content:
  - Hero "AI Engineer · Generative AI Engineer";
  - Vitamera and Rubix are AI Engineer, Rubix **Oct 2025 — Present**;
  - Sahwah shows **15%** and **920 shipments/day**;
  - About shows 3+ years and 500+;
  - no "Teaching CV", "AI Team Leader", "Jan 2026", `[X]`, or `[N]`.
- At about 375 px: no horizontal scroll, the menu opens and closes, and the CV link is keyboard-reachable.

## 9. Contact fallback (no email)

On `/contact`:
1. Empty submit → "Please fill in…".
2. `abc` as the email → "Please enter a valid email address."
3. Valid values → blue panel "Email delivery isn't configured on this deployment yet…" plus an **"Email abdullawagih1@gmail.com"** button.

**Do not click the mailto button.** ❌ A red "Something went wrong…" means a provider is configured. Recheck the env vars, then redeploy. It is not critical, because no message is falsely confirmed. Fix it forward.

## 10. Rollback (only for a critical failure at steps 4, 6, 7, or 8)

**Triggers:**
- the wrong commit is live;
- the CV is missing or wrong;
- an old placeholder CV is still served from the new deployment;
- broken pages or severe layout breakage;
- factually wrong professional content.

**Procedure (Vercel dashboard, needs authorization):**
1. Vercel → `portfolio` → **Deployments** → find `CpaY4NrtWhoVgBgN2vL4FvRwUmzr`.
2. Open the menu (⋯) → **Instant Rollback**, or use **Instant Rollback** from the current Production deployment and select `CpaY4…`. Confirm.
3. This reassigns the production domain to the existing build. No rebuild happens.

**Verify rollback success:**
- Vercel shows `CpaY4…` as **Current**;
- `<title>` is back to "…AI Solution Architect & Generative AI Engineer";
- `/Abdullah-Wagih-Technical-CV.docx` returns 200 and `/Abdullah-Wagih-Technical-CV.pdf` returns 404.

**Limitations:**
- **Old env snapshot:** a rolled-back deployment uses the environment it was **built** with. For `CpaY4…` that is the `.example` canonical, and possibly the old (revoked) Gmail credential, giving the lossy "Something went wrong" state. Current project env settings do not apply to it.
- **Old content returns:** the old titles and date, and the placeholder DOCX CVs.
- **Auto-promotion pauses:** after an Instant Rollback, Vercel **stops automatically assigning the production domain** to new `main` deployments.
- **`main` still holds the release:** git is not reverted. Do **not** force-push. Fix forward on a branch.

**Resuming automatic deployments after a rollback:**
1. Fix forward: branch from `main`, fix, verify on a Preview, then merge to `main` (authorized). This produces a new Production build that is **not** auto-assigned.
2. In Vercel → Deployments, open the verified new Production deployment → **Promote** (or "Undo Rollback"). This reassigns the domain and **re-enables** auto-assignment for later `main` pushes.
3. Confirm in Vercel that later Production deployments are marked Current automatically.

## 11. Close-out

Record in 04, 05, and 08:
- the `main` SHA and the deployment ID;
- the results of steps 4–9;
- that the DOCX files return 404;
- the confirmed canonical origin.

Then close D-16 and D-22, and mark production verification as **PASS (production-observed)**, distinct from the earlier local and owner-manual evidence.
