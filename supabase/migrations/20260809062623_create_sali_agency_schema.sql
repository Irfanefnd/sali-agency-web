-- ══════════════════════════════════════════════════════════════
-- Sali Agency — Supabase (Postgres) schema
-- ══════════════════════════════════════════════════════════════

create extension if not exists "pgcrypto";

-- shared trigger to keep updated_at fresh
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ── settings ─────────────────────────────────────────────────
create table if not exists settings (
  key        text primary key,
  value      text,
  updated_at timestamptz default now()
);

-- ── services ─────────────────────────────────────────────────
create table if not exists services (
  id          bigint generated always as identity primary key,
  title       text not null,
  slug        text unique not null,
  summary     text,
  duration    text,
  price_from  text,
  card_type   text default 'visa' check (card_type in ('visa','legal','lifestyle')),
  sort_order  int default 0,
  is_active   boolean default true,
  created_at  timestamptz default now()
);

-- ── applications (clients) ──────────────────────────────────
create table if not exists applications (
  id                        bigint generated always as identity primary key,
  service_id                bigint references services(id) on delete set null,
  tracking_code             text unique not null,
  client_name               text not null,
  client_email              text,
  client_phone              text,
  nationality               text,
  status                    text default 'pending' check (status in ('pending','in_review','approved','rejected','completed')),
  current_stage             text,
  estimated_completion_date date,
  notes                     text,
  created_at                timestamptz default now()
);

-- ── application_events (client timeline) ────────────────────
create table if not exists application_events (
  id                    bigint generated always as identity primary key,
  application_id        bigint not null references applications(id) on delete cascade,
  title                 text not null,
  description           text,
  status                text default 'pending' check (status in ('pending','in_progress','completed')),
  is_visible_to_client  boolean default true,
  created_at            timestamptz default now()
);

-- ── leads ────────────────────────────────────────────────────
create table if not exists leads (
  id               bigint generated always as identity primary key,
  name             text not null,
  email            text,
  phone            text,
  service_interest text,
  message          text,
  status           text default 'new' check (status in ('new','contacted','converted','closed')),
  created_at       timestamptz default now()
);

-- ── articles ─────────────────────────────────────────────────
create table if not exists articles (
  id           bigint generated always as identity primary key,
  title        text not null,
  slug         text unique not null,
  excerpt      text,
  content      text,
  cover_img    text,
  category     text,
  author       text default 'Sali Agency Team',
  status       text default 'draft' check (status in ('draft','published')),
  published_at timestamptz,
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);
drop trigger if exists articles_set_updated_at on articles;
create trigger articles_set_updated_at before update on articles
  for each row execute function set_updated_at();

-- ══════════════════════════════════════════════════════════════
-- Row Level Security
-- ══════════════════════════════════════════════════════════════

alter table settings             enable row level security;
alter table services             enable row level security;
alter table applications         enable row level security;
alter table application_events   enable row level security;
alter table leads                enable row level security;
alter table articles             enable row level security;

-- Public (anon) can read active services / published articles
create policy "services_public_read" on services
  for select using (is_active = true);
create policy "articles_public_read" on articles
  for select using (status = 'published');

-- Public (anon) can submit a lead (contact / enquiry form)
create policy "leads_public_insert" on leads
  for insert with check (true);

-- Authenticated (admin) can do everything on every table
create policy "settings_admin_all"           on settings           for all using (auth.role() = 'authenticated');
create policy "services_admin_all"           on services           for all using (auth.role() = 'authenticated');
create policy "applications_admin_all"       on applications       for all using (auth.role() = 'authenticated');
create policy "application_events_admin_all" on application_events for all using (auth.role() = 'authenticated');
create policy "leads_admin_all"              on leads              for all using (auth.role() = 'authenticated');
create policy "articles_admin_all"           on articles           for all using (auth.role() = 'authenticated');

-- ══════════════════════════════════════════════════════════════
-- Seed data
-- ══════════════════════════════════════════════════════════════

insert into settings (key, value) values
  ('wa_phone', '+62'),
  ('wa_business_name', 'Sali Agency'),
  ('wa_greeting', 'Halo, terima kasih telah menghubungi Sali Agency! Kami siap membantu kebutuhan visa dan legalitas Anda di Bali.')
on conflict (key) do nothing;

insert into services (title, slug, summary, duration, price_from, card_type, sort_order, is_active) values
  ('Tourist & Visit Visa', 'tourist-visit-visa', 'Full handling for tourism, family, and short-stay visits. Includes application, extension, and advisory.', '60 days, extendable', 'IDR 650K', 'visa', 1, true),
  ('Business Visa', 'business-visa', 'For meetings, market research, negotiations, and professional activities across Indonesia.', '60-180 days', 'Contact us', 'visa', 2, true),
  ('KITAS / KITAP', 'kitas-kitap', 'Long-term residence permits for investors, employees, retirees, and family dependents.', '1-5 years', 'Contact us', 'visa', 3, true),
  ('Company Establishment', 'company-establishment', 'Full PT PMA setup: notarial deed, OSS licensing, KBLI selection, and post-registration compliance.', 'Full service', 'IDR 15.5M', 'legal', 4, true),
  ('Digital Nomad Visa (E33G)', 'digital-nomad-visa', 'Five-year visa for remote professionals working for companies based outside Indonesia.', '5 years', 'Contact us', 'lifestyle', 5, true),
  ('Retirement Visa', 'retirement-visa', 'Live in Bali long-term. We handle the full KITAP retirement visa process from start to finish.', '5 years', 'Contact us', 'lifestyle', 6, true)
on conflict (slug) do nothing;

insert into applications (tracking_code, client_name, client_email, nationality, status, current_stage, notes) values
  ('SA-2026-DEMO01', 'Demo Client', 'demo@example.com', 'Australia', 'in_review', 'Immigration review', 'Demo application for testing.')
on conflict (tracking_code) do nothing;

insert into articles (title, slug, excerpt, content, category, status, published_at) values
  ('The Complete Guide to Bali Tourist Visa 2026', 'bali-tourist-visa-2026-guide', 'Everything you need to know about applying, extending, and renewing your tourist visa for Bali.', '<p>Everything you need to know about applying, extending, and renewing your tourist visa for Bali.</p>', 'Visa Tips', 'published', '2026-01-15 00:00:00+00'),
  ('KITAS vs KITAP: Which Long-Stay Permit Fits You?', 'kitas-vs-kitap-comparison', 'A clear breakdown of Indonesia''s two main residence permits and which one makes sense for your situation.', '<p>A clear breakdown of Indonesia''s two main residence permits and which one makes sense for your situation.</p>', 'Immigration', 'published', '2026-02-03 00:00:00+00'),
  ('Setting Up a PT PMA in Bali: 2026 Complete Guide', 'pt-pma-setup-bali-2026-guide', 'Step-by-step process for establishing a foreign-owned company in Indonesia, from OSS licensing to notarial deeds.', '<p>Step-by-step process for establishing a foreign-owned company in Indonesia, from OSS licensing to notarial deeds.</p>', 'Business', 'published', '2026-02-18 00:00:00+00')
on conflict (slug) do nothing;
