import Link from "next/link";
import { Briefcase, FileText, Sparkles } from "lucide-react";
import { waLink } from "@/lib/site-config";
import { getActiveServices, getPublishedArticles } from "@/lib/data/queries";

export const dynamic = "force-dynamic";

const overview = [
  {
    key: "legal",
    icon: Briefcase,
    title: "Legal Services",
    tag: "Protect your interests in Indonesia",
    href: "/legal-services",
    color: "text-legal",
    border: "border-t-legal",
    items: ["PT PMA Establishment", "Legal Consulting", "Contract Review", "Compliance Advisory", "Power of Attorney", "Property Due Diligence"],
  },
  {
    key: "visa",
    icon: FileText,
    title: "Visa Services",
    tag: "From entry to long-term stay",
    href: "/visa-services",
    color: "text-ac",
    border: "border-t-ac",
    items: ["Tourist & Visit Visa", "Business Visa", "Digital Nomad Visa (E33G)", "KITAS & KITAP", "Retirement Visa", "Visa Extension"],
  },
  {
    key: "lifestyle",
    icon: Sparkles,
    title: "Lifestyle Services",
    tag: "Your Bali life, fully supported",
    href: "/other-services",
    color: "text-lifestyle",
    border: "border-t-lifestyle",
    items: ["Relocation Assistance", "Property Consulting", "School & Education Search", "Healthcare Navigation", "Concierge Support", "Community & Networking"],
  },
];

export default async function HomePage() {
  const [services, articles] = await Promise.all([getActiveServices(), getPublishedArticles(3)]);

  return (
    <>
      {/* Hero */}
      <section className="px-8 pt-16 pb-20 text-center">
        <span className="mb-5 inline-block rounded-full px-4 py-1.5 text-[12.5px] font-semibold text-ac shadow-neu-sm">
          Welcome to Sali Agency
        </span>
        <h1 className="mx-auto max-w-3xl text-[clamp(2.2rem,5.5vw,3.6rem)] leading-[1.1] font-extrabold tracking-tight text-tx">
          Live <span className="text-ac">in Bali</span>
          <br />
          with Confidence.
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-[16px] leading-relaxed text-tx2">
          From quick visa approvals to full company setup. Your trusted local partner for a seamless transition to Bali.
        </p>
        <div className="mt-8">
          <a href={waLink("Hi, I'd like to start an application with Sali Agency")} target="_blank" rel="noreferrer" className="btn btn-p">
            Start Application
          </a>
        </div>

        <div className="mx-auto mt-14 flex max-w-xl items-center justify-center gap-6 sm:gap-10">
          {[
            ["2,500+", "Clients served"],
            ["98%", "Approval rate"],
            ["5+ yrs", "Experience"],
          ].map(([num, label], i) => (
            <div key={label} className="flex items-center gap-6 sm:gap-10">
              {i > 0 && <div className="h-10 w-px bg-bd" />}
              <div>
                <div className="text-xl font-extrabold text-tx sm:text-2xl">{num}</div>
                <div className="text-[11px] text-tx3 sm:text-[12px]">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Service overview */}
      <section className="mx-auto max-w-[1160px] px-8 py-10">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-[13px] font-semibold text-ac">What We Do</span>
            <h2 className="mt-1 text-[28px] font-extrabold text-tx">Our Services</h2>
            <p className="mt-2 max-w-md text-[14px] text-tx2">
              Complete immigration, legal, and lifestyle solutions for expats, investors, and digital nomads in Bali.
            </p>
          </div>
          <a href="#contact" className="btn btn-o">
            Enquire Now
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {overview.map((o) => (
            <div key={o.key} className={`card flex flex-col border-t-[3px] p-8 ${o.border}`}>
              <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] shadow-neu-sm ${o.color}`}>
                <o.icon size={18} strokeWidth={1.6} />
              </div>
              <h3 className="text-[17px] font-bold text-tx">{o.title}</h3>
              <p className="mb-4 text-[12px] text-tx3">{o.tag}</p>
              <ul className="mb-5 flex flex-1 flex-col gap-2 border-t border-bd pt-4">
                {o.items.map((it) => (
                  <li key={it} className="text-[12.5px] text-tx2">
                    {it}
                  </li>
                ))}
              </ul>
              <Link href={o.href} className={`inline-flex items-center gap-1 text-[12px] font-semibold hover:gap-2 ${o.color}`}>
                Enquire Now →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Featured services (from Supabase) */}
      {services.length > 0 && (
        <section className="mx-auto max-w-[1160px] px-8 py-10">
          <h2 className="mb-8 text-[24px] font-extrabold text-tx">Featured Services</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s) => (
              <div key={s.id} className="card p-6">
                <div className="mb-1 text-[15px] font-bold text-tx">{s.title}</div>
                <p className="mb-4 text-[12.5px] leading-relaxed text-tx2">{s.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {s.duration && (
                    <span className="rounded-full px-3 py-1 text-[11px] font-medium text-tx2 shadow-neu-sm">{s.duration}</span>
                  )}
                  {s.price_from && (
                    <span className="rounded-full px-3 py-1 text-[11px] font-semibold text-ac shadow-neu-sm">{s.price_from}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Articles */}
      {articles.length > 0 && (
        <section className="mx-auto max-w-[1160px] px-8 py-14">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <span className="text-[13px] font-semibold text-ac">Latest Articles</span>
              <h2 className="mt-1 text-[28px] font-extrabold text-tx">Stay Informed</h2>
            </div>
            <Link href="/articles" className="btn btn-o">
              View all articles
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {articles.map((a) => (
              <Link key={a.id} href={`/articles/${a.slug}`} className="card flex flex-col p-7">
                <div className="mb-3 flex items-center gap-2 text-[11px] text-tx3">
                  {a.category && <span className="font-semibold text-ac">{a.category}</span>}
                  {a.published_at && <span>{new Date(a.published_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span>}
                </div>
                <h3 className="mb-2 text-[16px] font-bold text-tx">{a.title}</h3>
                <p className="line-clamp-3 text-[13px] text-tx2">{a.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
