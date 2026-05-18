"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import {
  formatPrice,
  getFeaturedItems,
  getMenu,
  getStartingPrice,
  type MenuItem,
} from "@/data/menu";

const TABS = [
  { key: "specialty-pizzas", label: "Pizza" },
  { key: "breakfast-pizzas", label: "Breakfast" },
  { key: "desserts", label: "Desserts" },
  { key: "merch", label: "Merch" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const MERCH: MenuItem[] = [
  {
    id: "merch-tee",
    name: "DHOP Classic Tee",
    description: "Soft cotton crewneck. Iconic red logo on natural cream.",
    image: "/img/brand/dhop-logo-color.png",
    price: 24.99,
  },
  {
    id: "merch-cap",
    name: "20-Year Anniversary Cap",
    description: "Heritage 20-year crest. Adjustable strap, structured front.",
    image: "/img/brand/dhop-20-circle.webp",
    price: 22,
    badges: ["limited"],
  },
  {
    id: "merch-hoodie",
    name: "Hand-Tossed Hoodie",
    description: "Heavyweight fleece, oversized fit, classic DHOP wordmark.",
    image: "/img/brand/dhop-logo-white.png",
    price: 48,
  },
  {
    id: "merch-apron",
    name: "House Apron",
    description: "Real kitchen apron, double front pocket, cross-back straps.",
    image: "/img/brand/dhop-logo-color.png",
    price: 28,
  },
];

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
    </svg>
  );
}

export function ExploreMore() {
  const [active, setActive] = useState<TabKey>("specialty-pizzas");
  const scrollerRef = useRef<HTMLDivElement>(null);

  const items = useMemo<MenuItem[]>(() => {
    if (active === "merch") return MERCH;
    return getFeaturedItems(active, 6);
  }, [active]);

  const isMerch = active === "merch";
  const menuSectionAnchor = isMerch ? "/#merch" : `/menu#${active}`;

  const scrollByCard = (direction: -1 | 1) => {
    const node = scrollerRef.current;
    if (!node) return;
    const card = node.querySelector("article");
    const step = (card?.getBoundingClientRect().width ?? 300) + 24;
    node.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  // Lookup display name for the active tab (used in the footer CTA).
  const activeTabLabel =
    TABS.find((t) => t.key === active)?.label.toLowerCase() ?? "menu";
  // Heading uses the category name from the data source when possible.
  const menu = getMenu();
  const category = menu.categories.find((c) => c.id === active);

  return (
    <section id="menu" className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-360 px-6 sm:px-10">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
            The DHOP Menu
          </p>
          <h2 className="mt-3 font-display text-[32px] leading-10 text-ink sm:text-[40px] sm:leading-11 lg:text-[44px] lg:leading-12">
            Explore <span className="text-brand">More</span>
          </h2>
          <p className="mx-auto mt-3 max-w-150 text-sm leading-6 text-ink-soft">
            From hand-tossed pies to morning slices, sweet finishers and merch you can wear
            to your next slice run — there&apos;s more to DHOP than dinner.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-10 flex justify-center">
          <div
            role="tablist"
            aria-label="Explore the DHOP menu"
            className="inline-flex flex-wrap items-center gap-1 rounded-full border border-ink/10 bg-white p-1.5 shadow-[0_4px_18px_rgba(20,30,42,0.06)]"
          >
            {TABS.map((tab) => {
              const selected = tab.key === active;
              return (
                <button
                  key={tab.key}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  onClick={() => setActive(tab.key)}
                  className={`relative inline-flex h-11 items-center justify-center rounded-full px-4 text-[13px] font-semibold transition-colors duration-200 sm:px-6 sm:text-[14px] ${
                    selected
                      ? "bg-brand text-white shadow-[0_6px_14px_rgba(255,25,25,0.28)]"
                      : "text-ink/80 hover:text-brand"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Slider */}
        <div className="relative mt-10 sm:mt-12">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            aria-label="Scroll menu left"
            className="absolute -left-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-[0_6px_18px_rgba(20,30,42,0.18)] ring-1 ring-ink/10 transition hover:bg-cream lg:flex"
          >
            <Chevron direction="left" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            aria-label="Scroll menu right"
            className="absolute -right-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-[0_6px_18px_rgba(20,30,42,0.18)] ring-1 ring-ink/10 transition hover:bg-cream lg:flex"
          >
            <Chevron direction="right" />
          </button>

          <div
            key={active}
            ref={scrollerRef}
            role="tabpanel"
            aria-label={`${activeTabLabel} menu`}
            className="scrollbar-hide -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-6 px-6 pb-3 sm:-mx-10 sm:scroll-px-10 sm:px-10"
          >
            {items.map((item) => {
              const startingPrice = getStartingPrice(item);
              const badge = item.badges?.[0];
              return (
                <article
                  key={item.id}
                  className="group relative flex w-72 shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_24px_rgba(20,30,42,0.07)] ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(20,30,42,0.14)] sm:w-80"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-cream-2">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 288px, 320px"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    )}
                    {badge && (
                      <span className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-[0_4px_10px_rgba(255,25,25,0.35)]">
                        {badge.replace("-", " ")}
                      </span>
                    )}
                    {startingPrice !== undefined && (
                      <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-sm font-bold text-ink shadow-[0_4px_10px_rgba(20,30,42,0.12)] backdrop-blur">
                        {formatPrice(startingPrice)}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-[22px] leading-7 text-ink transition-colors duration-300 group-hover:text-brand">
                      {item.name}
                    </h3>
                    {item.description && (
                      <p className="mt-2 line-clamp-2 text-[13px] leading-5 text-ink-soft">
                        {item.description}
                      </p>
                    )}

                    <div className="mt-5 flex items-center justify-between">
                      <span className="font-display text-2xl text-ink">
                        {startingPrice !== undefined
                          ? formatPrice(startingPrice)
                          : "—"}
                      </span>
                      <button
                        type="button"
                        className="inline-flex h-10 items-center justify-center rounded-full bg-brand px-5 text-[13px] font-bold text-white transition hover:bg-brand-dark"
                      >
                        {isMerch ? "Add to bag" : "Add to order"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex justify-center sm:mt-12">
          <Link
            href={menuSectionAnchor}
            className="inline-flex h-12 items-center justify-center rounded-full border-2 border-ink px-8 text-[14px] font-bold text-ink transition hover:bg-ink hover:text-white"
          >
            See the full {category?.name.toLowerCase() ?? activeTabLabel} menu
          </Link>
        </div>
      </div>
    </section>
  );
}
