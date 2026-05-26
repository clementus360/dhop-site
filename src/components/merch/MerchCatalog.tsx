"use client";

import { useMemo, useState } from "react";
import {
  MERCH_CATEGORIES,
  MERCH_STORE_URL,
  type MerchCategoryId,
  type MerchProduct,
} from "@/data/merch";
import { MerchProductCard } from "./MerchProductCard";

type FilterId = MerchCategoryId | "all";

export function MerchCatalog({ products }: { products: MerchProduct[] }) {
  const [active, setActive] = useState<FilterId>("all");

  const counts = useMemo(() => {
    const map = new Map<FilterId, number>();
    map.set("all", products.length);
    for (const p of products) {
      map.set(p.category, (map.get(p.category) ?? 0) + 1);
    }
    return map;
  }, [products]);

  const visible = useMemo(() => {
    if (active === "all") return products;
    return products.filter((p) => p.category === active);
  }, [products, active]);

  return (
    <>
      <div className="sticky top-20 z-30 border-b border-ink/8 bg-white/90 backdrop-blur-md">
        <div className="mx-auto max-w-360 px-6 sm:px-10">
          <div className="-mx-2 flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide sm:gap-3">
            {MERCH_CATEGORIES.map((c) => {
              const isActive = active === c.id;
              const count = counts.get(c.id) ?? 0;
              if (count === 0) return null;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActive(c.id)}
                  aria-pressed={isActive}
                  className={`shrink-0 inline-flex h-10 items-center gap-2 rounded-full px-4 text-[13px] font-semibold transition sm:h-11 sm:px-5 sm:text-[14px] ${
                    isActive
                      ? "bg-ink text-white shadow-[0_8px_18px_rgba(20,30,42,0.18)]"
                      : "bg-cream-2 text-ink hover:bg-ink/10"
                  }`}
                >
                  {c.label}
                  <span
                    className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-bold ${
                      isActive
                        ? "bg-white/15 text-white"
                        : "bg-white text-ink-soft"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <section className="bg-cream py-12 sm:py-16">
        <div className="mx-auto max-w-360 px-6 sm:px-10">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-ink-soft">
              Showing {visible.length}{" "}
              {visible.length === 1 ? "item" : "items"}
            </p>
            <a
              href={MERCH_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-[12px] font-semibold uppercase tracking-wider text-brand hover:underline sm:inline"
            >
              Open full Printify store ↗
            </a>
          </div>

          {visible.length === 0 ? (
            <div className="rounded-2xl bg-white p-10 text-center ring-1 ring-ink/5">
              <p className="font-display text-[22px] text-ink">
                Nothing here yet.
              </p>
              <p className="mt-2 text-[14px] text-ink-soft">
                Try another category — or check the full Printify store.
              </p>
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {visible.map((p) => (
                <li key={p.id}>
                  <MerchProductCard product={p} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
