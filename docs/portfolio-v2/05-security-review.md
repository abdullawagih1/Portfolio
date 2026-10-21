# 05 — Security Review

## S-01 — HIGH → **REMEDIATED (security gate closed, pending Orchestrator acceptance)**

**Finding:** the untracked, non-ignored `portfolio.zip` contained a copy of `.env.local` with a live `GMAIL_APP_PASSWORD`, inside the working tree of a **public** GitHub repo. It was never committed and never served by production. The secret value was not displayed or copied into any report.

**Remediation evidence (2026-10-21):**

| Step | Evidence |
|---|---|
| Credential revocation | **Owner confirmed** the Gmail App Password has been revoked (answered in-session: "Yes, revoked"). The agent did not touch any external credential. |
| Safe backup outside the repo | Moved to `C:\Users\Abdullah\portfolio-backups\portfolio-2026-10-21.zip`. SHA-256 before and after the move matches (`e08c563f…a099`). |
| Removed from working tree | `ls portfolio.zip` reports "No such file or directory" |
| `.gitignore` exclusion | Appended `*.zip` under the comment `# archives (may contain env files)` |
| Nothing tracked or staged | `git diff --cached` shows 0 files; `git ls-files` env matches only `.env.example` |
| Not publicly accessible | Production `/portfolio.zip` and `/.env.local` return 404 |

**Owner follow-up (outside agent scope):**
- Put the new app password in local `.env.local` and in the Vercel project env vars. Until then, the live contact form cannot send email.
- The backup zip still contains the now-revoked password. Delete it once no longer needed.

**Run 3 re-verification (2026-10-21):** `portfolio.zip` is still absent from the repo. The backup remains only at `C:\Users\Abdullah\portfolio-backups\`. The secret was not read or printed during Run 3.

## S-08 — Contact form availability (Run 3)

The contact form should be treated as **potentially unavailable**. The old Gmail App Password is revoked. A new credential must be set in `.env.local` and in Vercel (the agent is not authorized to do this), and an end-to-end delivery test must succeed before the form is considered working.

## S-09 — Published CV PDF (Run 3)

`public/Abdullah-Wagih-Technical-CV.pdf` contains no JavaScript, EmbeddedFile, Launch, or OpenAction objects. Its metadata is Author "(Un-named)" and Creator/Producer "Microsoft Word for Microsoft 365". Its links point to the portfolio, LinkedIn, a mailto, and the paper's DOI. The personal data in it (phone and email) is already public on the site.

## S-10 — Teaching CV still publicly accessible on production

The DOCX files were removed from `public/` locally and return 404 on the local build. **Production still serves `/Abdullah-Wagih-Teaching-CV.docx` and `/Abdullah-Wagih-Technical-CV.docx` (HTTP 200)** until an authorized deployment of this branch. Both files also remain in git history in the public GitHub repo; their content is the same as what has been public all along.

## Release-prep update — public artifact exposure, three views (2026-10-21)

| Artifact | 1. Local build (`9d24bc7`) | 2. Current production | 3. Git history |
|---|---|---|---|
| `Abdullah-Wagih-Technical-CV.pdf` (approved) | 200, hash-matched | 404 (not deployed yet) | Added in `9d24bc7` (local only) |
| `Abdullah-Wagih-Technical-CV.docx` (outdated, placeholders) | 404 | **200** | In `3a36772`, **already on public GitHub**; deleted in `9d24bc7` |
| `Abdullah-Wagih-Teaching-CV.docx` (placeholders) | 404 | **200** | Same as above |
| `docs/portfolio-v2/inputs/*` (private inputs) | 404 (outside `public/`) | 404 | Never committed (gitignored) |
| `.env.local`, `.env`, `.env.example` (as URLs) | 404 | 404 | Only `.env.example` (placeholders) is tracked |
| `portfolio.zip` | 404 | 404 | Never committed |

History was not rewritten (D-19).

## S-11 — Contact form credential exposure: PASS (code review)

`src/lib/email.ts` is imported only by the `"use server"` action `src/lib/actions.ts`. The only `NEXT_PUBLIC_` variable is `NEXT_PUBLIC_SITE_URL`. The built `.next/static` contains no `GMAIL_*`, `RESEND_API_KEY`, `nodemailer`, or `api.resend.com` references, so credentials cannot reach the client. Server logs record provider error objects (`console.error`), not the credential values passed in.

## S-02 — PASS: `.env.local` handling

`.env*.local` and `.env` are gitignored. `.env.local` appears in no commit. `.env.example` holds placeholders only.

## S-03 — PASS: tracked files

No API keys, tokens, or passwords were found in tracked source (`git grep` pattern scan).

## S-04 — LOW: personal phone number published

`src/content/site.ts:17`. It also appears in the CV, so this is presumably intentional. Owner to confirm.

## S-05 — INFO (Batch D): headers

There is no Content-Security-Policy. HSTS is confirmed on production (`max-age=63072000; includeSubDomains; preload`, from Vercel).

## S-06 — INFO: git "dubious ownership"

The agent uses a per-command `-c safe.directory`. Global git config is unchanged.

## S-07 — INFO: npm install-script notice

`unrs-resolver@1.12.2` (an eslint-config-next transitive dependency) has a postinstall script that npm 11's allowScripts policy flags. Lint and build work regardless. No action needed.
