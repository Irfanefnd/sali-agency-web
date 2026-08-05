import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ImageOff, MessageCircle } from "lucide-react";
import { getArticleBySlug, getRelatedArticles } from "@/lib/data/queries";
import { siteConfig, waLink } from "@/lib/site-config";
import { ShareButtons } from "@/components/ShareButtons";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt ?? undefined,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const related = await getRelatedArticles(article.category, article.slug);
  const date = article.published_at
    ? new Date(article.published_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    : null;
  const readMin = Math.max(1, Math.round((article.content?.split(/\s+/).length ?? 200) / 200));
  const shareUrl = `${siteConfig.url}/articles/${article.slug}`;

  return (
    <section className="mx-auto max-w-[1160px] px-8 pt-[110px] pb-24">
      <Link href={article.category ? `/articles?cat=${encodeURIComponent(article.category)}` : "/articles"} className="mb-8 inline-flex items-center gap-2 text-[13px] font-semibold text-tx2 hover:text-ac">
        <ArrowLeft size={16} /> Back to Articles
      </Link>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        <article>
          <div className="mb-6 flex h-64 items-center justify-center rounded-2xl text-tx3 shadow-neu-in-sm">
            <ImageOff size={36} strokeWidth={1.3} />
          </div>

          <div className="mb-3 flex items-center gap-2 text-[12px] text-tx3">
            {article.category && <span className="font-semibold text-ac">{article.category}</span>}
            {date && <span>{date}</span>}
            <span>{readMin} min read</span>
          </div>

          <h1 className="mb-3 text-[28px] leading-tight font-extrabold text-tx sm:text-[34px]">{article.title}</h1>

          {article.excerpt && <p className="mb-6 text-[15px] text-tx2">{article.excerpt}</p>}

          <div
            className="prose-sm mb-8 max-w-none text-[14.5px] leading-relaxed text-tx2 [&_a]:text-ac [&_h2]:mt-6 [&_h2]:mb-2 [&_h2]:text-[19px] [&_h2]:font-bold [&_h2]:text-tx [&_p]:mb-4"
            dangerouslySetInnerHTML={{ __html: article.content ?? "" }}
          />

          <ShareButtons url={shareUrl} title={article.title} />
        </article>

        <aside className="flex flex-col gap-6">
          <div className="card p-6">
            <div className="mb-2 text-[15px] font-bold text-tx">Need Help?</div>
            <p className="mb-4 text-[13px] text-tx2">Have questions about your visa or legal situation? Our team is ready to help.</p>
            <a href={waLink(`Hi, I read your article: ${article.title}`)} target="_blank" rel="noreferrer" className="btn btn-p w-full justify-center">
              <MessageCircle size={16} /> WhatsApp Us
            </a>
          </div>

          {related.length > 0 && (
            <div className="card p-6">
              <div className="mb-4 text-[15px] font-bold text-tx">Related Articles</div>
              <div className="flex flex-col gap-4">
                {related.map((r) => (
                  <Link key={r.id} href={`/articles/${r.slug}`} className="flex gap-3">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-tx3 shadow-neu-in-sm">
                      <ImageOff size={16} />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-ac">{r.category}</div>
                      <div className="text-[13px] leading-snug font-semibold text-tx">{r.title}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <Link href="/articles" className="btn btn-o justify-center">
            Browse All Articles
          </Link>
        </aside>
      </div>
    </section>
  );
}
