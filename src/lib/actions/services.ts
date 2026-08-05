"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ServiceRow } from "@/lib/database.types";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  return supabase;
}

function slugify(title: string) {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") +
    "-" +
    Date.now()
  );
}

export async function saveService(formData: FormData) {
  const supabase = await requireAdmin();
  const id = formData.get("id");

  const payload = {
    title: String(formData.get("title") ?? "").trim(),
    summary: String(formData.get("summary") ?? "").trim() || null,
    duration: String(formData.get("duration") ?? "").trim() || null,
    price_from: String(formData.get("price_from") ?? "").trim() || null,
    card_type: String(formData.get("card_type") ?? "visa") as ServiceRow["card_type"],
    sort_order: Number(formData.get("sort_order") ?? 0),
    is_active: formData.get("is_active") === "on",
  };

  if (id) {
    await supabase.from("services").update(payload).eq("id", Number(id));
  } else {
    await supabase.from("services").insert({ ...payload, slug: slugify(payload.title) });
  }

  revalidatePath("/admin/services");
  revalidatePath("/");
}

export async function deleteService(formData: FormData) {
  const supabase = await requireAdmin();
  const id = Number(formData.get("id"));
  await supabase.from("services").delete().eq("id", id);
  revalidatePath("/admin/services");
  revalidatePath("/");
}
