# 07 — Open Decisions (Run 3)

| # | Decision | Owner | Status |
|---|---|---|---|
| D-1 / D-2 | Authoritative inputs | — | Resolved (present in `inputs/`) |
| D-3 – D-9 | Rubix date, CV format, Teaching CV, project roles, Rashad, zip/credential, Node | — | Resolved (see Run 2) |
| D-5a | Supplied Teaching CV PDF still has `[X]+`/`[N]+` placeholders and old titles ("AI Solution Architect (Rubix)", "AI Team Leader (Vitamera)"). Fix it and re-approve before any republication. | Abdullah | OPEN, non-blocking |
| D-10 | Keep the personal phone number public? | Abdullah | OPEN, non-blocking |
| D-11 | Configure the new Gmail app password in `.env.local` and Vercel, then run an end-to-end contact-form delivery test. **Until then, treat the contact form as potentially unavailable.** | Abdullah | OPEN |
| D-12 | Delete the backup zip (it holds the revoked secret) when no longer needed | Abdullah | OPEN |
| D-13 | Commit this branch | Orchestrator | **Resolved:** committed locally as `9d24bc71b06f6c63c96318babde3c9e9f05ade1e`. `docs/portfolio-v2/inputs/` stays gitignored. |
| D-18 | Push the branch / merge to `main` / deploy (preview first) | Orchestrator | **Partially authorized (Preview Release Work Order):** push `portfolio-v2/batch-a` (no force-push) and create/locate a **Preview** deployment only. Merge to `main`, production deployment, credential creation, and unapproved email sending remain **not authorized**. |
| D-19 | Old DOCX CVs remain in the public GitHub history (`3a36772`). Accept this, or rewrite history (destructive, needs a separate decision)? | Orchestrator / Abdullah | OPEN. History was not rewritten. |
| D-20 | Contact-form hardening: length limits, `reason` allow-list, honeypot, and rate limiting (register OPS-03, Batch D) | Orchestrator | OPEN, Batch D |
| D-14 | The identity motto "Architect · Builder · Educator" (About H1, About card, About meta description, footer ©) is kept as capability language. Change it to fully de-emphasise "Architect"? | Orchestrator | **Resolved (Commit Preparation order §3):** retain as secondary tagline |
| D-15 | The CV summary says "delivering many production AI platforms". The site deliberately does not repeat this (CV-07). Confirm, or soften the CV wording itself. | Abdullah | OPEN, non-blocking |
| D-16 | Production still serves both old DOCX CVs (HTTP 200) and the old titles until an authorized deployment | Orchestrator | OPEN (deployment not authorized) |
| D-17 | Publication 97% figure and DOI (present in the CV) are not shown; PU-01 requires a paper check | Batch B | Deferred |
