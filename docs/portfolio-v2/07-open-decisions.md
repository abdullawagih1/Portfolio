# 07 — Open Decisions

Last updated 2026-10-21 (Production Configuration Gate).

| # | Decision | Owner | Status |
|---|---|---|---|
| D-1 / D-2 | Authoritative inputs | — | Resolved (present in `inputs/`, gitignored) |
| D-3 – D-9 | Rubix date, CV format, Teaching CV, project roles, Rashad, zip/credential, Node | — | Resolved (see Run 2) |
| D-5a | Supplied Teaching CV PDF still has `[X]+`/`[N]+` placeholders and old titles. Fix it and re-approve before any republication. | Abdullah | OPEN, non-blocking |
| D-10 | Keep the personal phone number public? | Abdullah | OPEN, non-blocking |
| D-11 | Replacement Gmail credential plus E2E delivery test | Abdullah | **Superseded by D-23 (Option B).** Deferred to a later change, which will need its own authorized delivery test. |
| D-12 | Delete the backup zip (it holds the revoked secret) when no longer needed | Abdullah | OPEN, non-blocking |
| D-13 | Commit Batch A | Orchestrator | Resolved: `9d24bc71b06f6c63c96318babde3c9e9f05ade1e` |
| D-14 | "Architect · Builder · Educator" motto | Orchestrator | Resolved: retained as secondary tagline |
| D-15 | The CV summary's "many production AI platforms" wording is not repeated on the site | Abdullah | OPEN, non-blocking |
| D-16 | Production still serves the old DOCX CVs and old titles | Orchestrator | OPEN. Closes when an authorized production deploy lands (blocked) |
| D-17 | Publication 97% figure and DOI | Batch B | Deferred |
| D-18 | Push / merge / deploy | Orchestrator | Push and **Preview**: done (`dacc429`). **Merge and production deploy: NOT authorized.** Production is deliberately kept blocked (Production Configuration Gate). |
| D-19 | Old DOCX CVs remain in public GitHub history (`3a36772`) | Orchestrator | **Resolved: accepted temporarily.** No history rewrite. |
| D-20 | Contact-form rate limiting and spam hardening (OPS-03) | Orchestrator | **Resolved: deferred to a later batch** |
| D-21 | Owner manual verification of the preview | Abdullah | **Closed:** owner-confirmed manual PASS, 9/9 (10) |
| D-22 | Production env config | Abdullah / Orchestrator | **Resolved, PASS (Orchestrator-reported via Vercel connector, FRR-001 + DOC-COMMIT-001):** `NEXT_PUBLIC_SITE_URL` = `https://abdullah-wagih.vercel.app`, value and Production scope verified; `GMAIL_APP_PASSWORD` absent (Production and Preview); `RESEND_API_KEY` absent; `GMAIL_USER` present (Prod + Preview); Node 24.x. The live canonical is still checked post-deploy (14 step 5). |
| D-24 | Commit pending docs 07, 10–14 | Orchestrator | **Authorized (DOC-COMMIT-001):** local commit only, no push |
| D-25 | Merge to `main` and execute runbook 14 | Orchestrator | OPEN. **Not authorized.** FRR-001: GO-eligible (13). |
| D-23 | Contact-form release path | Orchestrator | **Resolved: Option B (safe mailto fallback)** as the temporary strategy. Fallback runtime-verified locally (12 §3). |
