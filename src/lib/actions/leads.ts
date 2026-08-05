"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { LeadRow } from "@/lib/database.types";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  return supabase;
}

export async function saveLead(formData: FormData) {
  const supabase = await requireAdmin();

  const id = formData.get("id");
  const payload = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim() || null,
    phone: String(formData.get("phone") ?? "").trim() || null,
    service_interest: String(formData.get("service_interest") ?? "").trim() || null,
    message: String(formData.get("message") ?? "").trim() || null,
    status: String(formData.get("status") ?? "new") as LeadRow["status"],
  };

  if (id) {
    await supabase.from("leads").update(payload).eq("id", Number(id));
  } else {
    await supabase.from("leads").insert(payload);
  }

  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}

export async function deleteLead(formData: FormData) {
  const supabase = await requireAdmin();
  const id = Number(formData.get("id"));
  await supabase.from("leads").delete().eq("id", id);
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
}
