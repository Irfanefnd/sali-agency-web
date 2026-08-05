import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { saveLead, deleteLead } from "@/lib/actions/leads";

const statuses = ["new", "contacted", "converted", "closed"] as const;
const badge: Record<string, string> = {
  new: "bg-ac-bg text-ac",
  contacted: "bg-yellow-100 text-yellow-700",
  converted: "bg-green-100 text-green-700",
  closed: "bg-bg2 text-tx3",
};

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;
  const supabase = await createClient();

  const [{ data: leads }, editLead] = await Promise.all([
    supabase.from("leads").select("*").order("created_at", { ascending: false }),
    edit ? supabase.from("leads").select("*").eq("id", Number(edit)).single().then((r) => r.data) : Promise.resolve(null),
  ]);

  return (
    <div>
      <h1 className="mb-8 text-[22px] font-extrabold text-tx">Leads</h1>

      <div className="card mb-6 p-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[15px] font-bold text-tx">{editLead ? "Edit Lead" : "Add Lead"}</span>
          {editLead && (
            <Link href="/admin/leads" className="btn btn-o btn-sm">
              Cancel
            </Link>
          )}
        </div>
        <form action={saveLead} className="flex flex-col gap-4">
          {editLead && <input type="hidden" name="id" value={editLead.id} />}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-tx2">Name *</label>
              <input name="name" required defaultValue={editLead?.name ?? ""} className="field" />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-tx2">Email</label>
              <input type="email" name="email" defaultValue={editLead?.email ?? ""} className="field" />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-tx2">Phone / WhatsApp</label>
              <input name="phone" defaultValue={editLead?.phone ?? ""} className="field" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-tx2">Service Interest</label>
              <input name="service_interest" defaultValue={editLead?.service_interest ?? ""} placeholder="e.g. KITAS, PT PMA" className="field" />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-tx2">Status</label>
              <select name="status" defaultValue={editLead?.status ?? "new"} className="field">
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold text-tx2">Message / Notes</label>
            <textarea name="message" rows={3} defaultValue={editLead?.message ?? ""} className="field" />
          </div>
          <button type="submit" className="btn btn-p self-start">
            {editLead ? "Update Lead" : "Add Lead"}
          </button>
        </form>
      </div>

      <div className="card p-6">
        <div className="mb-4 text-[15px] font-bold text-tx">All Leads ({leads?.length ?? 0})</div>
        {leads && leads.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-left text-[11px] text-tx3">
                  <th className="pb-2 font-semibold">Name</th>
                  <th className="pb-2 font-semibold">Contact</th>
                  <th className="pb-2 font-semibold">Service</th>
                  <th className="pb-2 font-semibold">Status</th>
                  <th className="pb-2 font-semibold">Date</th>
                  <th className="pb-2 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l.id} className="border-t border-bd align-top">
                    <td className="py-2.5 font-semibold text-tx">{l.name}</td>
                    <td className="py-2.5 text-tx3">
                      {l.email}
                      {l.email && l.phone && <br />}
                      {l.phone}
                    </td>
                    <td className="py-2.5 text-tx3">{l.service_interest || "—"}</td>
                    <td className="py-2.5">
                      <span className={`badge ${badge[l.status]}`}>{l.status}</span>
                    </td>
                    <td className="py-2.5 text-tx3">{new Date(l.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}</td>
                    <td className="py-2.5">
                      <div className="flex gap-2">
                        <Link href={`/admin/leads?edit=${l.id}`} className="btn btn-o btn-sm">
                          Edit
                        </Link>
                        <form action={deleteLead}>
                          <input type="hidden" name="id" value={l.id} />
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
          <div className="py-8 text-center text-[13px] text-tx3">No leads yet.</div>
        )}
      </div>
    </div>
  );
}
