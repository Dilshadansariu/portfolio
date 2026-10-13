# Security audit notes

Scope: this is a **static-style Next.js portfolio** — no database, no user
accounts, no admin area, no custom API routes. Its only outbound call is the
contact form's `fetch()` to Formspree. Items below are marked **Done**,
**N/A** (the thing being protected doesn't exist here), or **Deferred**
(real, but needs a live deployment to do safely).

| Checklist item | Status | Notes |
|---|---|---|
| Hide API keys | Done / N/A | No secrets exist in the repo (source scanned). The Formspree URL is a public form ID by design, not a key. |
| Check env variables | Done | Only `NEXT_PUBLIC_SITE_URL` is read — public by nature. Nothing sensitive uses the `NEXT_PUBLIC_` prefix. |
| Protect admin routes | N/A | No admin routes exist. |
| Proper authentication / hash passwords | N/A | No accounts or passwords exist. Adding auth to a site with nothing to protect would only add attack surface. |
| Access control | N/A | No protected resources. |
| Sanitize forms | Done | Required-field + email validation, control-char stripping, hard length caps (name 100 / email 254 / message 2000), whitespace stripped from email. |
| XSS protection | Done | React escapes all output; the user's text is never rendered back into the page. The single `dangerouslySetInnerHTML` is the JSON-LD tag, built only from static site data. Tested with 4 injection payloads: 0 executed. |
| Rate limiting | Partial | Client-side 30 s cooldown + honeypot field stop accidents and naive bots. **Not** a hard boundary: real rate-limiting/spam filtering for the public Formspree endpoint must be enabled in the Formspree dashboard (spam protection + allowed domains). |
| Secure API endpoints / CORS | N/A | No custom API routes, so no CORS surface. |
| Security headers | Done | `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` set in `next.config.js` and verified in live responses. |
| Content-Security-Policy | Deferred | Needs nonce-based testing against the real deployed origin; shipping an unverified CSP risks silently breaking the site. |
| Debug mode off | Done | Production build (`next build`) used; no debug flags set. |
| Update dependencies | Done | Next.js 14.2.35 -> 16.4.0 (fixes critical/high advisories incl. RCE), `sharp` -> 0.35.5, `postcss` -> 8.5.29. `npm audit --omit=dev`: **0 vulnerabilities**. |
| Remove unused packages | Done | Checked every dependency; none unused. (`sharp` has no imports but is required by Next's image optimizer.) |
| Check exposed files | Done | `public/` holds only images; source maps live in `.next/server` (never served). |
| Secure database | N/A | No database. |
| Scan git for leaked secrets | N/A (so far) | The project has no git history yet. Run a scan (e.g. gitleaks) once the repo exists; `.env*` is already in `.gitignore`. |
| Full security audit | Done | This document. |

## Known, accepted exception
`npm audit` (all deps) still reports 7 issues, all in **Tailwind v3's build-time
toolchain** (chokidar/micromatch/postcss-selector-parser). They only ever parse
this repo's own trusted files during `next build`, are never shipped to the
browser, and fixing them requires migrating to Tailwind v4 (a breaking config
rewrite). Revisit when planning a Tailwind v4 migration.

## Do these yourself
1. In the Formspree dashboard: enable spam protection and restrict allowed domains to your real site URL.
2. Confirm the first Formspree activation email sent to dilshadansariu@gmail.com, then send one real test from the live site.
3. Set `NEXT_PUBLIC_SITE_URL` to your real domain at deploy time.
