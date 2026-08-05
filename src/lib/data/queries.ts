import { createClient } from "@/lib/supabase/server";
import { fallbackServices } from "@/lib/data/home-fallback";
import type { ArticleRow, ServiceRow } from "@/lib/database.types";

const hasSupabase = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function getActiveServices(): Promise<ServiceRow[]> {
  if (!hasSupabase) return fallbackServices;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) return fallbackServices;
    return data;
  } catch {
    return fallbackServices;
  }
}

export async function getPublishedArticles(limit?: number): Promise<ArticleRow[]> {
  if (!hasSupabase) return [];
  try {
    const supabase = await createClient();
    let query = supabase
      .from("articles")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });
    if (limit) query = query.limit(limit);
    const { data, error } = await query;
    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<ArticleRow | null> {
  if (!hasSupabase) return null;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .single();
    if (error || !data) return null;
    return data;
  } catch {
    return null;
  }
}

export async function getRelatedArticles(category: string | null, excludeSlug: string): Promise<ArticleRow[]> {
  if (!hasSupabase || !category) return [];
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .eq("status", "published")
      .eq("category", category)
      .neq("slug", excludeSlug)
      .order("published_at", { ascending: false })
      .limit(3);
    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}
