import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { saveService, deleteService } from "@/lib/actions/services";

const cardTypeBadge: Record<string, string> = {
  visa: "bg-ac-bg text-ac",
  legal: "bg-blue-100 text-blue-700",
  lifestyle: "bg-pink-100 text-pink-700",
};

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;
  const supabase = await createClient();

  const [{ data: services }, editRow] = await Promise.all([
    supabase.from("services").select("*").order("sort_order", { ascending: true }),
    edit ? supabase.from("services").select("*").eq("id", Number(edit)).single().then((r) => r.data) : Promise.resolve(null),
  ]);

  return (
    <div>
      <h1 className="mb-8 text-[22px] font-extrabold text-tx">Services</h1>

      <div className="card mb-6 p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[15px] font-bold text-tx">{editRow ? "Edit Service" : "Add New Service"}</span>
          {editRow && (
            <Link href="/admin/services" className="btn btn-o btn-sm">
              Cancel
            </Link>
          )}
        </div>
        <form action={saveService} className="flex flex-col gap-4">
          {editRow && <input type="hidden" name="id" value={editRow.id} />}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-tx2">Service Title *</label>
              <input name="title" required defaultValue={editRow?.title ?? ""} className="field" />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-tx2">Price From</label>
              <input name="price_from" defaultValue={editRow?.price_from ?? ""} placeholder="IDR 5.000.000 / Contact us" className="field" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-tx2">Duration</label>
              <input name="duration" defaultValue={editRow?.duration ?? ""} placeholder="e.g. 2–4 weeks" className="field" />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-tx2">Card Color</label>
              <select name="card_type" defaultValue={editRow?.card_type ?? "visa"} className="field">
                <option value="visa">Visa (Gold)</option>
                <option value="legal">Legal (Blue)</option>
                <option value="lifestyle">Lifestyle (Pink)</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-tx2">Sort Order</label>
              <input type="number" name="sort_order" defaultValue={editRow?.sort_order ?? 0} className="field" />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold text-tx2">Summary</label>
            <textarea name="summary" rows={3} defaultValue={editRow?.summary ?? ""} className="field" />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-[13px] text-tx2">
              <input type="checkbox" name="is_active" defaultChecked={editRow?.is_active ?? true} /> Active
            </label>
            <button type="submit" className="btn btn-p">
              {editRow ? "Update Service" : "Add Service"}
            </button>
          </div>
        </form>
      </div>

      <div className="card p-6">
        <div className="mb-4 text-[15px] font-bold text-tx">All Services ({services?.length ?? 0})</div>
        {services && services.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-left text-[11px] text-tx3">
                  <th className="pb-2 font-semibold">#</th>
                  <th className="pb-2 font-semibold">Title</th>
                  <th className="pb-2 font-semibold">Type</th>
                  <th className="pb-2 font-semibold">Price</th>
                  <th className="pb-2 font-semibold">Active</th>
                  <th className="pb-2 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s, i) => (
                  <tr key={s.id} className="border-t border-bd align-top">
                    <td className="py-2.5 text-tx3">{String(i + 1).padStart(2, "0")}</td>
                    <td className="py-2.5">
                      <div className="font-semibold text-tx">{s.title}</div>
                      <div className="max-w-xs truncate text-[11.5px] text-tx3">{s.summary}</div>
                    </td>
                    <td className="py-2.5">
                      <span className={`badge ${cardTypeBadge[s.card_type]}`}>{s.card_type}</span>
                    </td>
                    <td className="py-2.5 text-tx2">{s.price_from || "—"}</td>
                    <td className="py-2.5">
                      <span className={`badge ${s.is_active ? "bg-green-100 text-green-700" : "bg-bg2 text-tx3"}`}>{s.is_active ? "Yes" : "No"}</span>
                    </td>
                    <td className="py-2.5">
                      <div className="flex gap-2">
                        <Link href={`/admin/services?edit=${s.id}`} className="btn btn-o btn-sm">
                          Edit
                        </Link>
                        <form action={deleteService}>
                          <input type="hidden" name="id" value={s.id} />
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
          <div className="py-8 text-center text-[13px] text-tx3">No services yet.</div>
        )}
      </div>
    </div>
  );
}
