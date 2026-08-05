"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ApplicationRow, ApplicationEventRow } from "@/lib/database.types";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  return supabase;
}

function generateTrackingCode() {
  const year = new Date().getFullYear();
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `SA-${year}-${rand}`;
}

function applicationPayload(formData: FormData) {
  return {
    client_name: String(formData.get("client_name") ?? "").trim(),
    client_email: String(formData.get("client_email") ?? "").trim() || null,
    client_phone: String(formData.get("client_phone") ?? "").trim() || null,
    nationality: String(formData.get("nationality") ?? "").trim() || null,
    service_id: formData.get("service_id") ? Number(formData.get("service_id")) : null,
    status: String(formData.get("status") ?? "pending") as ApplicationRow["status"],
    current_stage: String(formData.get("current_stage") ?? "").trim() || null,
    estimated_completion_date: String(formData.get("estimated_completion_date") ?? "") || null,
    notes: String(formData.get("notes") ?? "").trim() || null,
  };
}

export async function saveApplication(formData: FormData) {
  const supabase = await requireAdmin();
  const id = formData.get("id");
  const payload = applicationPayload(formData);

  if (id) {
    await supabase.from("applications").update(payload).eq("id", Number(id));
    revalidatePath(`/admin/clients/${id}`);
  } else {
    await supabase.from("applications").insert({ ...payload, tracking_code: generateTrackingCode() });
  }

  revalidatePath("/admin/clients");
  revalidatePath("/admin");
}

export async function deleteApplication(formData: FormData) {
  const supabase = await requireAdmin();
  const id = Number(formData.get("id"));
  await supabase.from("applications").delete().eq("id", id);
  revalidatePath("/admin/clients");
  redirect("/admin/clients");
}

export async function addApplicationEvent(formData: FormData) {
  const supabase = await requireAdmin();
  const applicationId = Number(formData.get("application_id"));

  await supabase.from("application_events").insert({
    application_id: applicationId,
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || null,
    status: String(formData.get("ev_status") ?? "pending") as ApplicationEventRow["status"],
    is_visible_to_client: formData.get("visible") === "on",
  });

  revalidatePath(`/admin/clients/${applicationId}`);
}

export async function deleteApplicationEvent(formData: FormData) {
  const supabase = await requireAdmin();
  const eventId = Number(formData.get("ev_id"));
  const applicationId = Number(formData.get("application_id"));

  await supabase.from("application_events").delete().eq("id", eventId);
  revalidatePath(`/admin/clients/${applicationId}`);
}
