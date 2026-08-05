import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { saveApplication } from "@/lib/actions/applications";

const statuses = ["pending", "in_review", "approved", "rejected", "completed"] as const;
const badge: Record<string, string> = {
  pending: "bg-bg2 text-tx3",
  in_review: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  completed: "bg-ac-bg text-ac",
};

export default async function ClientsPage() {
  const supabase = await createClient();

  const [{ data: clients }, { data: services }] = await Promise.all([
    supabase.from("applications").select("*, services(title)").order("created_at", { ascending: false }),
    supabase.from("services").select("id, title").order("title", { ascending: true }),
  ]);

  return (
    <div>
      <h1 className="mb-8 text-[22px] font-extrabold text-tx">Clients</h1>

      <div className="card mb-6 p-6">
        <div className="mb-4 text-[15px] font-bold text-tx">Add New Client</div>
        <form action={saveApplication} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-tx2">Client Name *</label>
              <input name="client_name" required className="field" />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-tx2">Email</label>
              <input type="email" name="client_email" className="field" />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-tx2">Phone / WA</label>
              <input name="client_phone" className="field" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-tx2">Nationality</label>
              <input name="nationality" className="field" />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-tx2">Service</label>
              <select name="service_id" className="field">
                <option value="">— None —</option>
                {services?.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-tx2">Status</label>
              <select name="status" defaultValue="pending" className="field">
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s.replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold text-tx2">Notes</label>
            <textarea name="notes" rows={2} className="field" />
          </div>
          <button type="submit" className="btn btn-p self-start">
            Add Client
          </button>
        </form>
      </div>

      <div className="card p-6">
        <div className="mb-4 text-[15px] font-bold text-tx">All Clients ({clients?.length ?? 0})</div>
        {clients && clients.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-left text-[11px] text-tx3">
                  <th className="pb-2 font-semibold">Tracking</th>
                  <th className="pb-2 font-semibold">Client</th>
                  <th className="pb-2 font-semibold">Service</th>
                  <th className="pb-2 font-semibold">Status</th>
                  <th className="pb-2 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((c) => (
                  <tr key={c.id} className="border-t border-bd align-top">
                    <td className="py-2.5">
                      <code className="text-[12px] text-tx3">{c.tracking_code}</code>
                    </td>
                    <td className="py-2.5 font-semibold text-tx">{c.client_name}</td>
                    <td className="py-2.5 text-tx3">{(c as { services?: { title: string } | null }).services?.title || "—"}</td>
                    <td className="py-2.5">
                      <span className={`badge ${badge[c.status]}`}>{c.status.replace("_", " ")}</span>
                    </td>
                    <td className="py-2.5">
                      <Link href={`/admin/clients/${c.id}`} className="btn btn-o btn-sm">
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-8 text-center text-[13px] text-tx3">No clients yet.</div>
        )}
      </div>
    </div>
  );
}
