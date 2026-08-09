import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const statusBadge: Record<string, string> = {
  new: "bg-ac-bg text-ac",
  contacted: "bg-yellow-100 text-yellow-700",
  converted: "bg-green-100 text-green-700",
  closed: "bg-bg2 text-tx3",
  pending: "bg-bg2 text-tx3",
  in_review: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  completed: "bg-ac-bg text-ac",
};

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [leadsTotal, leadsNew, clientsTotal, servicesTotal, articlesTotal, recentLeads, recentClients] = await Promise.all([
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("applications").select("*", { count: "exact", head: true }),
    supabase.from("services").select("*", { count: "exact", head: true }),
    supabase.from("articles").select("*", { count: "exact", head: true }),
    supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(5),
    supabase.from("applications").select("*, services(title)").order("created_at", { ascending: false }).limit(5),
  ]);

  const kpis = [
    { label: "New Leads", value: leadsNew.count ?? 0, accent: true },
    { label: "Total Leads", value: leadsTotal.count ?? 0 },
    { label: "Active Clients", value: clientsTotal.count ?? 0 },
    { label: "Services", value: servicesTotal.count ?? 0 },
    { label: "Articles", value: articlesTotal.count ?? 0 },
  ];

  return (
    <div>
      <h1 className="mb-8 text-[22px] font-extrabold text-tx">Dashboard</h1>

      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {kpis.map((k) => (
          <div key={k.label} className={`card p-5 ${k.accent ? "border-t-[3px] border-t-ac" : ""}`}>
            <div className="text-2xl font-extrabold text-tx">{k.value}</div>
            <div className="mt-1 text-[12px] text-tx3">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[15px] font-bold text-tx">Recent Leads</span>
            <Link href="/admin/leads" className="btn btn-o btn-sm">
              View All
            </Link>
          </div>
          {recentLeads.data && recentLeads.data.length > 0 ? (
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-left text-[11px] text-tx3">
                  <th className="pb-2 font-semibold">Name</th>
                  <th className="pb-2 font-semibold">Service</th>
                  <th className="pb-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.data.map((l) => (
                  <tr key={l.id} className="border-t border-bd">
                    <td className="py-2.5">
                      <div className="font-semibold text-tx">{l.name}</div>
                      <div className="text-[11px] text-tx3">{l.email}</div>
                    </td>
                    <td className="py-2.5 text-tx3">{l.service_interest || "—"}</td>
                    <td className="py-2.5">
                      <span className={`badge ${statusBadge[l.status] ?? "bg-bg2 text-tx3"}`}>{l.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-8 text-center text-[13px] text-tx3">No leads yet.</div>
          )}
        </div>

        <div className="card p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[15px] font-bold text-tx">Recent Clients</span>
            <Link href="/admin/clients" className="btn btn-o btn-sm">
              View All
            </Link>
          </div>
          {recentClients.data && recentClients.data.length > 0 ? (
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-left text-[11px] text-tx3">
                  <th className="pb-2 font-semibold">Client</th>
                  <th className="pb-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentClients.data.map((c) => (
                  <tr key={c.id} className="border-t border-bd">
                    <td className="py-2.5">
                      <div className="font-semibold text-tx">{c.client_name}</div>
                      <code className="text-[11px] text-tx3">{c.tracking_code}</code>
                    </td>
                    <td className="py-2.5">
                      <span className={`badge ${statusBadge[c.status] ?? "bg-bg2 text-tx3"}`}>{c.status.replace("_", " ")}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-8 text-center text-[13px] text-tx3">No clients yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
