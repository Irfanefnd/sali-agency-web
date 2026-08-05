import Link from "next/link";
import { ImageOff } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { saveArticle, deleteArticle } from "@/lib/actions/articles";

const categories = ["Visa Tips", "Immigration", "Business", "Legal", "Lifestyle"];

export default async function ArticlesAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;
  const supabase = await createClient();

  const [{ data: articles }, editRow] = await Promise.all([
    supabase.from("articles").select("*").order("created_at", { ascending: false }),
    edit ? supabase.from("articles").select("*").eq("id", Number(edit)).single().then((r) => r.data) : Promise.resolve(null),
  ]);

  return (
    <div>
      <h1 className="mb-8 text-[22px] font-extrabold text-tx">Articles</h1>

      <div className="card mb-6 p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[15px] font-bold text-tx">{editRow ? "Edit Article" : "Add New Article"}</span>
          {editRow && (
            <Link href="/admin/articles" className="btn btn-o btn-sm">
              Cancel
            </Link>
          )}
        </div>
        <form action={saveArticle} className="flex flex-col gap-4">
          {editRow && <input type="hidden" name="id" value={editRow.id} />}
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold text-tx2">Title *</label>
            <input name="title" required defaultValue={editRow?.title ?? ""} className="field" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-tx2">Category</label>
              <select name="category" defaultValue={editRow?.category ?? categories[0]} className="field">
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-tx2">Cover Image URL</label>
              <input name="cover_img" defaultValue={editRow?.cover_img ?? ""} placeholder="https://…" className="field" />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold text-tx2">Excerpt / Summary</label>
            <textarea name="excerpt" rows={2} defaultValue={editRow?.excerpt ?? ""} className="field" />
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold text-tx2">Body (HTML)</label>
            <textarea name="content" rows={8} defaultValue={editRow?.content ?? ""} className="field font-mono text-[12.5px]" />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-[13px] text-tx2">
              <input type="checkbox" name="is_published" defaultChecked={editRow?.status === "published"} /> Published
            </label>
            <button type="submit" className="btn btn-p">
              {editRow ? "Update Article" : "Add Article"}
            </button>
          </div>
        </form>
      </div>

      <div className="card p-6">
        <div className="mb-4 text-[15px] font-bold text-tx">All Articles ({articles?.length ?? 0})</div>
        {articles && articles.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-left text-[11px] text-tx3">
                  <th className="pb-2 font-semibold">Cover</th>
                  <th className="pb-2 font-semibold">Title</th>
                  <th className="pb-2 font-semibold">Category</th>
                  <th className="pb-2 font-semibold">Status</th>
                  <th className="pb-2 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((a) => (
                  <tr key={a.id} className="border-t border-bd align-top">
                    <td className="py-2.5">
                      <div className="flex h-10 w-14 items-center justify-center rounded-lg shadow-neu-in-sm text-tx3">
                        <ImageOff size={14} />
                      </div>
                    </td>
                    <td className="py-2.5 font-semibold text-tx">{a.title}</td>
                    <td className="py-2.5 text-tx3">{a.category || "—"}</td>
                    <td className="py-2.5">
                      <span className={`badge ${a.status === "published" ? "bg-green-100 text-green-700" : "bg-bg2 text-tx3"}`}>{a.status}</span>
                    </td>
                    <td className="py-2.5">
                      <div className="flex gap-2">
                        <Link href={`/admin/articles?edit=${a.id}`} className="btn btn-o btn-sm">
                          Edit
                        </Link>
                        <form action={deleteArticle}>
                          <input type="hidden" name="id" value={a.id} />
                          <button type="submit" className="btn btn-red btn-sm">
                            Del
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-8 text-center text-[13px] text-tx3">No articles yet.</div>
        )}
      </div>
    </div>
  );
}
