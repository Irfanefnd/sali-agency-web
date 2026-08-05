"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ArticleRow } from "@/lib/database.types";

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

export async function saveArticle(formData: FormData) {
  const supabase = await requireAdmin();
  const id = formData.get("id");
  const isPublished = formData.get("is_published") === "on";
  const title = String(formData.get("title") ?? "").trim();

  const payload = {
    title,
    category: String(formData.get("category") ?? "").trim() || null,
    excerpt: String(formData.get("excerpt") ?? "").trim() || null,
    content: String(formData.get("content") ?? "").trim() || null,
    cover_img: String(formData.get("cover_img") ?? "").trim() || null,
    status: (isPublished ? "published" : "draft") as ArticleRow["status"],
    published_at: isPublished ? new Date().toISOString() : null,
  };

  if (id) {
    await supabase.from("articles").update(payload).eq("id", Number(id));
  } else {
    await supabase.from("articles").insert({ ...payload, slug: slugify(title) });
  }

  revalidatePath("/admin/articles");
  revalidatePath("/articles");
  revalidatePath("/");
}

export async function deleteArticle(formData: FormData) {
  const supabase = await requireAdmin();
  const id = Number(formData.get("id"));
  await supabase.from("articles").delete().eq("id", id);
  revalidatePath("/admin/articles");
  revalidatePath("/articles");
}
