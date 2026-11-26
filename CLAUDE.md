# purplebalcony-blog

## Rules (always)
- Follow the `nextjs-buenas-practicas` skill.
- One agent only, no subagents in any effort mode. Anything that writes, one at a time.
- Commit locally; push only when the user asks. Never commit or push to `main` (production) unless the user names it.
- Never add `Co-Authored-By` or any AI attribution to commits or PRs.
- Never touch the database: only propose SQL for the user to run.
- Never load env vars or secrets in Vercel or any external service: keep them in `.env.local` and tell the user.
- Don't install dependencies without asking. Don't delete files without the user's OK.
- All code and commits in English. Site content is PT (default), EN, ES, FR.

## Stack
- Next.js 16 (App Router), JavaScript, Supabase (public project data, publishable key, server-side only, ISR 600 s).
  Optional: without the vars the blog builds and shows its "data unavailable" fallbacks.
- Hosting: Vercel, managed by the client (not us). Lives at blog.purplebalcony.com; www and app are separate repos.

## Commands
- Lint: `npx eslint <files>` · Tests: `npm test` (node --test) · Build: `npm run build` (when closing a stage)

## Structure
- `src/app/[locale]/page.js` → blog index (`/`, `/en`, `/es`, `/fr`) · `[locale]/[article]` → articles at the root.
- PT has no prefix (rewrite to `/pt` in next.config.mjs). Unknown URLs → `src/app/global-not-found.js`.
- Links to the rest of the site: `wwwUrl()` (absolute, PT URLs). Sign-up/login CTAs: `APP_URL`.
- `src/content/articles.js` + `src/i18n/messages/*` (texts) · `src/server/*` (Supabase repository/controller) · `src/lib/*`.

## Current status
- Blog ported from purplebalcony-site (branch `seo-programatico-next`) on `seo-programatico-00`: lint, tests, build pass.
- Our scope: content (articles, programmatic SEO pages) + the SEO Programático tag (`blog.purplebalcony.com`, in TrackingHead).
- Client's scope: Vercel (deploy, env vars), GSC and GA4 properties, CNAME, and the 301s from www.
