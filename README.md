# Sali Agency — Web

Next.js + Supabase rewrite of the Sali Agency website, built to run on [bolt.new](https://bolt.new) (WebContainer can't run PHP/MySQL, which is why this exists as a separate project from the original `My Files (1)` PHP site).

## What's included (Phase 1)

- Public site: Home, Visa Services, Legal Services, Other Services, Articles (list + detail), AI Chat
- Admin panel: login, dashboard, Leads CRUD, Clients CRUD + milestone timeline, Services CRUD, Articles CRUD
- Gold/amber neumorphic design system, light + dark mode
- Supabase (Postgres) schema with Row Level Security

**Deferred to Phase 2** (schema is already in place, just no admin UI yet): Invoices, Transactions, Referrals, WhatsApp Cloud API integration.

## 1. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Open the SQL editor and run `supabase/schema.sql` from this repo once — it creates every table, Row Level Security policy, and seed data (demo services + demo articles).
3. Go to **Authentication → Users** and manually create your admin account (email + password). Any authenticated Supabase user is treated as an admin — there's no separate role table, matching the single-admin scope of the original site.
4. Go to **Project Settings → API** and copy the **Project URL** and **anon public key**.

## 2. Environment variables

Copy `.env.local.example` to `.env.local` (or set these in bolt.new / your host's env settings):

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
DEEPSEEK_API_KEY=       # optional — AI Chat shows a friendly error until this is set
AI_MODEL=deepseek-chat
```

## 3. Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Admin panel is at `/admin`.

## 4. Deploy on bolt.new

Import this folder into bolt.new, add the environment variables above in its env settings, and it will run directly — no PHP, no separate database server, Supabase is accessed over HTTPS from the browser/server the same way in WebContainer as anywhere else.

## Known follow-ups

- **Logo**: `/assets/img/logo.png` never existed in the original PHP export either — the nav/footer currently render a text wordmark ("Sali **Agency**"). Swap in a real logo image if you have one.
- **WhatsApp number**: `src/lib/site-config.ts` still has the original site's placeholder number (`6280000000000`). Replace with the real Sali Agency WhatsApp Business number.
- **Compliance/partner logo ticker**: the original homepage had a scrolling row of government/partner logo images (Imigrasi, OSS, BPJS, etc.) that weren't included in the PHP export folder either, so it wasn't ported. Add it back if you have those image assets.
- **Article images**: articles admin takes a cover image **URL** rather than a file upload (no Supabase Storage wired up yet) — paste a hosted image URL, or add Storage upload later.
