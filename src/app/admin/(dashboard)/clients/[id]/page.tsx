import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { saveApplication, deleteApplication, addApplicationEvent, deleteApplicationEvent } from "@/lib/actions/applications";

export const dynamic = "force-dynamic";

const statuses = ["pending", "in_review", "approved", "rejected", "completed"] as const;
const eventStatuses = ["pending", "in_progress", "completed"] as const;

export default async function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: client }, { data: services }, { data: events }] = await Promise.all([
    supabase.from("applications").select("*").eq("id", Number(id)).single(),
    supabase.from("services").select("id, title").order("title", { ascending: true }),
    supabase.from("application_events").select("*").eq("application_id", Number(id)).order("created_at", { ascending: false }),
  ]);

  if (!client) notFound();

  return (
    <div>
      <Link href="/admin/clients" className="mb-6 inline-flex items-center gap-2 text-[13px] font-semibold text-tx2 hover:text-ac">
        <ArrowLeft size={15} /> Back to Clients
      </Link>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-extrabold text-tx">{client.client_name}</h1>
          <code className="text-[12px] text-tx3">{client.tracking_code}</code>
        </div>
        <form action={deleteApplication}>
          <input type="hidden" name="id" value={client.id} />
          <button type="submit" className="btn btn-red btn-sm">
            Delete Client
          </button>
        </form>
      </div>

      <div className="card mb-6 p-6">
        <div className="mb-4 text-[15px] font-bold text-tx">Client Details</div>
        <form action={saveApplication} className="flex flex-col gap-4">
          <input type="hidden" name="id" value={client.id} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-tx2">Client Name</label>
              <input name="client_name" defaultValue={client.client_name} required className="field" />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-tx2">Email</label>
              <input type="email" name="client_email" defaultValue={client.client_email ?? ""} className="field" />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-tx2">Phone / WA</label>
              <input name="client_phone" defaultValue={client.client_phone ?? ""} className="field" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-tx2">Nationality</label>
              <input name="nationality" defaultValue={client.nationality ?? ""} className="field" />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-tx2">Service</label>
              <select name="service_id" defaultValue={client.service_id ?? ""} className="field">
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
              <select name="status" defaultValue={client.status} className="field">
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s.replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-tx2">Current Stage</label>
              <input name="current_stage" defaultValue={client.current_stage ?? ""} className="field" />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-semibold text-tx2">Est. Completion</label>
              <input type="date" name="estimated_completion_date" defaultValue={client.estimated_completion_date ?? ""} className="field" />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold text-tx2">Notes</label>
            <textarea name="notes" rows={3} defaultValue={client.notes ?? ""} className="field" />
          </div>
          <button type="submit" className="btn btn-p self-start">
            Save Changes
          </button>
        </form>
      </div>

      <div className="card p-6">
        <div className="mb-4 text-[15px] font-bold text-tx">Timeline / Milestones</div>

        <div className="mb-6 flex flex-col gap-3">
          {events && events.length > 0 ? (
            events.map((ev) => (
              <div key={ev.id} className="flex items-start justify-between gap-4 rounded-xl px-4 py-3 shadow-neu-sm">
                <div>
                  <div className="text-[13.5px] font-semibold text-tx">{ev.title}</div>
                  {ev.description && <div className="mt-0.5 text-[12px] text-tx2">{ev.description}</div>}
                  <div className="mt-1 flex items-center gap-2 text-[11px] text-tx3">
                    <span className="badge bg-bg2 text-tx3">{ev.status.replace("_", " ")}</span>
                    {!ev.is_visible_to_client && <span>Hidden from client</span>}
                  </div>
                </div>
                <form action={deleteApplicationEvent}>
                  <input type="hidden" name="ev_id" value={ev.id} />
                  <input type="hidden" name="application_id" value={client.id} />
                  <button type="submit" className="btn btn-red btn-sm">
                    Del
                  </button>
                </form>
              </div>
            ))
          ) : (
            <div className="py-4 text-center text-[13px] text-tx3">No milestones yet.</div>
          )}
        </div>

        <form action={addApplicationEvent} className="flex flex-col gap-4 border-t border-bd pt-6">
          <input type="hidden" name="application_id" value={client.id} />
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold text-tx2">Milestone Title *</label>
            <input name="title" required placeholder="e.g. Documents submitted to Immigration" className="field" />
          </div>
          <div>
            <label className="mb-1.5 block text-[12px] font-semibold text-tx2">Description</label>
            <textarea name="description" rows={2} className="field" />
          </div>
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <label className="mb-1.5 block text-[12px] font-semibold text-tx2">Status</label>
              <select name="ev_status" defaultValue="pending" className="field">
                {eventStatuses.map((s) => (
                  <option key={s} value={s}>
                    {s.replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>
            <label className="flex items-center gap-2 pb-3 text-[13px] text-tx2">
              <input type="checkbox" name="visible" defaultChecked /> Visible to client
            </label>
          </div>
          <button type="submit" className="btn btn-o self-start">
            Add Milestone
          </button>
        </form>
      </div>
    </div>
  );
}
