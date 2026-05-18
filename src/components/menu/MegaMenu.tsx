"use client";

import Image from "next/image";
import Link from "next/link";
import { getMenu, getFeaturedItems, formatPrice, getStartingPrice } from "@/data/menu";

const FEATURED_CATEGORIES = [
  "specialty-pizzas",
  "breakfast-pizzas",
  "subs",
  "wings",
  "salads",
  "desserts",
];

/**
 * Desktop mega-menu panel — opens beneath the "Menu" nav link.
 *
 * Two columns:
 *  - A category list, with each category linking to the matching anchor
 *    on the /menu page so users can jump straight to their craving.
 *  - A featured items rail for the currently-hovered category.
 *
 * The wrapping nav link sets `hoveredCategoryId` so this stays a controlled
 * component the Header can manage alongside its scroll state.
 */
export function MegaMenu({
  hoveredCategoryId,
  setHoveredCategoryId,
  onSelect,
}: {
  hoveredCategoryId: string;
  setHoveredCategoryId: (id: string) => void;
  onSelect: () => void;
}) {
  const menu = getMenu();
  const categories = menu.categories.filter((c) =>
    FEATURED_CATEGORIES.includes(c.id)
  );
  const activeCategory =
    categories.find((c) => c.id === hoveredCategoryId) ?? categories[0];
  const featured = activeCategory ? getFeaturedItems(activeCategory.id, 4) : [];

  return (
    // Outer wrapper holds the position + an invisible top-padding bridge so
    // the cursor never leaves the menu's bounding box while travelling from
    // the nav link down into the panel. We anchor with `right` instead of
    // centering on the (small, right-of-viewport) Menu link so the panel
    // always stays inside the viewport. Inner div carries the visible card.
    <div
      className="absolute right-0 top-full z-40 hidden w-[min(840px,calc(100vw-3rem))] pt-3 lg:block"
      role="presentation"
    >
      <div
        role="menu"
        aria-label="Menu categories"
        className="overflow-hidden rounded-2xl bg-white text-ink shadow-[0_24px_60px_rgba(0,0,0,0.28)] ring-1 ring-ink/10"
      >
        <div className="grid grid-cols-12 gap-0">
        {/* Categories rail */}
        <div className="col-span-4 bg-cream py-4">
          <p className="px-5 pb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
            Browse the menu
          </p>
          <ul className="flex flex-col">
            {categories.map((c) => {
              const isActive = c.id === activeCategory?.id;
              return (
                <li key={c.id}>
                  <Link
                    href={`/menu#${c.id}`}
                    onMouseEnter={() => setHoveredCategoryId(c.id)}
                    onFocus={() => setHoveredCategoryId(c.id)}
                    onClick={onSelect}
                    className={`flex items-center justify-between gap-2 px-5 py-2.5 text-[14px] font-semibold transition ${
                      isActive
                        ? "bg-white text-brand"
                        : "text-ink hover:bg-white hover:text-brand"
                    }`}
                  >
                    <span>{c.name}</span>
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 opacity-60"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </Link>
                </li>
              );
            })}
            <li className="mt-2 border-t border-ink/10 pt-2">
              <Link
                href="/menu"
                onClick={onSelect}
                className="flex items-center justify-between px-5 py-2.5 text-[13px] font-bold uppercase tracking-wider text-brand hover:text-brand-dark"
              >
                See the full menu
                <span aria-hidden>→</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Featured items panel */}
        <div className="col-span-8 p-5">
          {activeCategory && (
            <>
              <div className="flex items-baseline justify-between gap-3">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
                    Featured
                  </p>
                  <h3 className="mt-1 font-display text-[26px] leading-8 text-ink">
                    {activeCategory.name}
                  </h3>
                </div>
                <Link
                  href={`/menu#${activeCategory.id}`}
                  onClick={onSelect}
                  className="text-[12px] font-bold uppercase tracking-wider text-brand hover:text-brand-dark"
                >
                  View all →
                </Link>
              </div>
              {activeCategory.tagline && (
                <p className="mt-1 text-[12px] text-ink-soft">
                  {activeCategory.tagline}
                </p>
              )}

              <ul className="mt-4 grid grid-cols-2 gap-3">
                {featured.map((item) => {
                  const price = getStartingPrice(item);
                  return (
                    <li key={item.id}>
                      <Link
                        href={`/menu#${activeCategory.id}`}
                        onClick={onSelect}
                        className="group flex items-center gap-3 rounded-xl p-2 transition hover:bg-cream"
                      >
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-cream-2 ring-1 ring-ink/5">
                          {item.image && (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="64px"
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-display text-[16px] leading-5 text-ink group-hover:text-brand">
                            {item.name}
                          </p>
                          {item.description && (
                            <p className="mt-0.5 line-clamp-1 text-[11px] text-ink-soft">
                              {item.description}
                            </p>
                          )}
                          {price !== undefined && (
                            <p className="mt-0.5 font-display text-[13px] text-brand">
                              from {formatPrice(price)}
                            </p>
                          )}
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
