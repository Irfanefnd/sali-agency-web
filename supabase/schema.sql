-- ══════════════════════════════════════════════════════════════
-- Sali Agency — Supabase (Postgres) schema
-- Run this once in the Supabase SQL editor for a new project.
-- Translated from the original MySQL schema (sali_setup.sql).
-- ══════════════════════════════════════════════════════════════

create extension if not exists "pgcrypto";

-- shared trigger to keep updated_at fresh (Postgres has no ON UPDATE CURRENT_TIMESTAMP)
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ── settings (admin-only config: WhatsApp Cloud API, etc.) ─────
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

-- ── invoices (phase 2) ───────────────────────────────────────
create table if not exists invoices (
  id             bigint generated always as identity primary key,
  invoice_no     text unique not null,
  client_name    text not null,
  client_email   text,
  client_phone   text,
  client_address text,
  service_desc   text,
  items          jsonb,
  subtotal       numeric(15,2) default 0,
  tax_pct        numeric(5,2) default 0,
  tax_amount     numeric(15,2) default 0,
  total          numeric(15,2) default 0,
  currency       text default 'IDR',
  status         text default 'draft' check (status in ('draft','sent','paid','overdue','cancelled')),
  due_date       date,
  paid_at        timestamptz,
  notes          text,
  created_at     timestamptz default now(),
  updated_at     timestamptz default now()
);
drop trigger if exists invoices_set_updated_at on invoices;
create trigger invoices_set_updated_at before update on invoices
  for each row execute function set_updated_at();

-- ── transactions (phase 2) ───────────────────────────────────
create table if not exists transactions (
  id             bigint generated always as identity primary key,
  invoice_id     bigint references invoices(id) on delete set null,
  client_name    text,
  amount         numeric(15,2) not null,
  currency       text default 'IDR',
  method         text default 'bank_transfer' check (method in ('bank_transfer','credit_card','cash','paypal','crypto','other')),
  reference_no   text,
  description    text,
  type           text default 'income' check (type in ('income','expense','refund')),
  status         text default 'completed' check (status in ('pending','completed','failed','refunded')),
  transacted_at  date,
  created_at     timestamptz default now()
);

-- ── referrals (phase 2) ──────────────────────────────────────
create table if not exists referrals (
  id              bigint generated always as identity primary key,
  name            text not null,
  email           text,
  phone           text,
  code            text unique not null,
  commission_pct  numeric(5,2) default 10.00,
  total_referred  int default 0,
  total_earned    numeric(15,2) default 0,
  status          text default 'active' check (status in ('active','inactive')),
  notes           text,
  created_at      timestamptz default now()
);

create table if not exists referral_clients (
  id                bigint generated always as identity primary key,
  referral_id       bigint not null references referrals(id) on delete cascade,
  client_name       text not null,
  client_email      text,
  service           text,
  deal_value        numeric(15,2) default 0,
  commission_amount numeric(15,2) default 0,
  status            text default 'lead' check (status in ('lead','converted','closed')),
  created_at        timestamptz default now()
);

-- ── WhatsApp Cloud API (phase 2) ─────────────────────────────
create table if not exists wa_templates (
  id         bigint generated always as identity primary key,
  name       text not null,
  category   text default 'general' check (category in ('general','inquiry','invoice','status_update','follow_up')),
  message    text not null,
  is_active  boolean default true,
  use_count  int default 0,
  created_at timestamptz default now()
);

create table if not exists wa_contacts (
  id                 bigint generated always as identity primary key,
  name               text not null,
  phone              text not null,
  email              text,
  tags               text,
  notes              text,
  last_contacted_at  timestamptz,
  created_at         timestamptz default now()
);

-- ══════════════════════════════════════════════════════════════
-- Row Level Security
-- Admin auth uses Supabase Auth (auth.users) — any authenticated
-- session is treated as an admin, matching the single-admin scope
-- of the original site. Tighten with a role check if you add more
-- Supabase Auth users than just the admin account.
-- ══════════════════════════════════════════════════════════════

alter table settings             enable row level security;
alter table services             enable row level security;
alter table applications         enable row level security;
alter table application_events   enable row level security;
alter table leads                enable row level security;
alter table articles             enable row level security;
alter table invoices             enable row level security;
alter table transactions         enable row level security;
alter table referrals            enable row level security;
alter table referral_clients     enable row level security;
alter table wa_templates         enable row level security;
alter table wa_contacts          enable row level security;

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
create policy "invoices_admin_all"           on invoices           for all using (auth.role() = 'authenticated');
create policy "transactions_admin_all"       on transactions       for all using (auth.role() = 'authenticated');
create policy "referrals_admin_all"          on referrals          for all using (auth.role() = 'authenticated');
create policy "referral_clients_admin_all"   on referral_clients   for all using (auth.role() = 'authenticated');
create policy "wa_templates_admin_all"       on wa_templates       for all using (auth.role() = 'authenticated');
create policy "wa_contacts_admin_all"        on wa_contacts        for all using (auth.role() = 'authenticated');

-- ══════════════════════════════════════════════════════════════
-- Seed data
-- ══════════════════════════════════════════════════════════════

insert into settings (key, value) values
  ('wa_phone', '+62'),
  ('wa_business_name', 'Sali Agency'),
  ('wa_greeting', 'Halo, terima kasih telah menghubungi Sali Agency! Kami siap membantu kebutuhan visa dan legalitas Anda di Bali.')
on conflict (key) do nothing;

insert into wa_templates (name, category, message) values
  ('Inquiry Reply', 'inquiry', 'Halo {name},\n\nTerima kasih telah menghubungi Sali Agency!\n\nKami menerima pertanyaan Anda mengenai {service}. Tim kami akan segera menghubungi Anda dalam 1x24 jam kerja.\n\nSalam,\nSali Agency Team'),
  ('Invoice Sent', 'invoice', 'Halo {name},\n\nInvoice {code} senilai {amount} telah kami kirimkan kepada Anda.\n\nMohon lakukan pembayaran sebelum tanggal jatuh tempo.\n\nTerima kasih,\nSali Agency Team'),
  ('Status Update', 'status_update', 'Halo {name},\n\nProses {service} Anda dengan kode {code} sedang dalam tahap terbaru. Estimasi selesai: {date}.\n\nTerima kasih atas kesabaran Anda.\nSali Agency Team'),
  ('Follow Up', 'follow_up', 'Halo {name},\n\nApakah Anda masih membutuhkan bantuan untuk {service}? Kami siap membantu.\n\nSali Agency Team');

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
