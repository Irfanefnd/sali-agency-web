"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Icon } from "@/components/Icon";
import { waLink } from "@/lib/site-config";
import type { ServiceCategory } from "@/lib/data/visa-services";

export function ServiceCategoryPage({
  label,
  placeholder,
  categories,
}: {
  label: string;
  placeholder: string;
  categories: ServiceCategory[];
}) {
  const [q, setQ] = useState("");
  const [openId, setOpenId] = useState<string | null>(categories[0]?.id ?? null);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return categories;
    return categories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (it) => it.title.toLowerCase().includes(query) || it.desc.toLowerCase().includes(query)
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [q, categories]);

  const noResults = q.trim() && filtered.length === 0;

  return (
    <>
      <section className="px-8 pt-[110px] pb-14 text-center">
        <span className="text-[13px] font-semibold text-ac">{label}</span>
        <div className="mx-auto mt-6 max-w-[580px]">
          <div className="relative">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={placeholder}
              className="field pr-12"
              autoComplete="off"
              spellCheck={false}
            />
            <Search size={17} className="absolute top-1/2 right-4 -translate-y-1/2 text-tx3" />
          </div>
          {noResults && (
            <p className="mt-4 text-sm text-tx3">
              No services found for &ldquo;<span className="text-tx2">{q}</span>&rdquo;.
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-[1160px] px-8 pb-24">
        {filtered.map((cat) => {
          const open = q.trim() ? true : openId === cat.id;
          return (
            <section key={cat.id} id={cat.id} className="mb-4">
              <button
                onClick={() => setOpenId(open ? null : cat.id)}
                className="card flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <div>
                  <h2 className="text-[19px] font-extrabold text-tx">{cat.title}</h2>
                  <div className="mt-0.5 text-[13px] text-tx2">{cat.sub}</div>
                </div>
                <ChevronDown
                  size={20}
                  className={`shrink-0 text-tx2 transition-transform ${open ? "rotate-180" : ""}`}
                />
              </button>

              {open && (
                <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {cat.items.map((item) => (
                    <div key={item.title} className="card flex flex-col p-7">
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[10px] text-ac shadow-neu-sm">
                        <Icon name={item.icon} size={18} strokeWidth={1.6} />
                      </div>
                      <div className="mb-1 text-[16px] font-bold text-tx">{item.title}</div>
                      <p className="mb-4 flex-1 text-[13px] leading-relaxed text-tx2">{item.desc}</p>
                      <div className="mb-4 flex flex-wrap gap-2">
                        <span className="rounded-full px-3 py-1 text-[11px] font-medium text-tx2 shadow-neu-sm">
                          {item.duration}
                        </span>
                        <span className="rounded-full px-3 py-1 text-[11px] font-semibold text-ac shadow-neu-sm">
                          {item.price}
                        </span>
                      </div>
                      {item.features && (
                        <ul className="mb-5 flex flex-col gap-1.5">
                          {item.features.map((f) => (
                            <li key={f} className="relative pl-3.5 text-[12.5px] text-tx2">
                              <span className="absolute top-[7px] left-0 h-1 w-1 rounded-full bg-ac opacity-60" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      )}
                      <a
                        href={waLink(item.waText)}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-auto inline-flex items-center gap-1 text-[12.5px] font-semibold text-ac hover:gap-2"
                      >
                        Enquire Now →
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}
