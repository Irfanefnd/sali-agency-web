import type { Metadata } from "next";
import Link from "next/link";
import { ImageOff } from "lucide-react";
import { getPublishedArticles } from "@/lib/data/queries";

export const metadata: Metadata = {
  title: "Articles",
  description: "Guides, tips, and updates on Bali visas, immigration, and expat life from Sali Agency.",
};

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; cat?: string }>;
}) {
  const { q = "", cat = "All" } = await searchParams;
  const all = await getPublishedArticles();

  const categories = ["All", ...Array.from(new Set(all.map((a) => a.category).filter(Boolean) as string[]))];

  const filtered = all.filter((a) => {
    const matchesCat = cat === "All" || a.category === cat;
    const matchesQ = !q || a.title.toLowerCase().includes(q.toLowerCase());
    return matchesCat && matchesQ;
  });

  return (
    <>
      <section className="px-8 pt-[110px] pb-14 text-center">
        <span className="text-[13px] font-semibold text-ac">Guides, Tips & Updates</span>

        <form method="get" className="relative mx-auto mt-6 max-w-[520px]">
          {cat !== "All" && <input type="hidden" name="cat" value={cat} />}
          <input name="q" defaultValue={q} placeholder="Search articles…" className="field" autoComplete="off" />
        </form>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {categories.map((c) => (
            <Link
              key={c}
              href={c === "All" ? "/articles" : `/articles?cat=${encodeURIComponent(c)}`}
              className={`rounded-full px-4 py-1.5 text-[12.5px] font-semibold shadow-neu-sm ${
                c === cat ? "text-ac" : "text-tx2"
              }`}
            >
              {c}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1160px] px-8 pb-24">
        {filtered.length > 0 ? (
          <>
            <div className="mb-8 text-[13px] text-tx3">
              <strong className="text-tx">{filtered.length}</strong> article{filtered.length !== 1 ? "s" : ""}
              {cat !== "All" && (
                <>
                  {" "}
                  in <strong className="text-tx">{cat}</strong>
                </>
              )}
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((a) => (
                <Link key={a.id} href={`/articles/${a.slug}`} className="card flex flex-col overflow-hidden">
                  <div className="flex h-40 items-center justify-center text-tx3 shadow-neu-in-sm">
                    <ImageOff size={28} strokeWidth={1.3} />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-2 flex items-center gap-2 text-[11px] text-tx3">
                      {a.category && <span className="font-semibold text-ac">{a.category}</span>}
                      {a.published_at && (
                        <span>{new Date(a.published_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</span>
                      )}
                    </div>
                    <h3 className="mb-2 text-[16px] font-bold text-tx">{a.title}</h3>
                    <p className="line-clamp-3 flex-1 text-[13px] text-tx2">{a.excerpt}</p>
                    <span className="mt-4 text-[12.5px] font-semibold text-ac">Read more →</span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-3 py-20 text-center text-tx3">
            <ImageOff size={32} strokeWidth={1.3} />
            <div>No articles found{q ? ` for "${q}"` : ""}.</div>
            <Link href="/articles" className="text-[13px] font-semibold text-ac">
              Clear filters
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
