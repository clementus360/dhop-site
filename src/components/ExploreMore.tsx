"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const TABS = ["Pizza", "Breakfast", "Desserts", "Merch"] as const;
type Tab = (typeof TABS)[number];

type Item = {
  name: string;
  description: string;
  image: string;
  price: string;
  badge?: string;
};

const ITEMS: Record<Tab, Item[]> = {
  Pizza: [
    {
      name: "Pepperoni",
      description: "Our No. 1 since 2005. Classic pepperoni, mozzarella, hand-tossed crust.",
      image: "/img/pizzas/pepperoni.webp",
      price: "14.99",
      badge: "Best Seller",
    },
    {
      name: "Tomato Basil",
      description: "Garlic & oil base, fresh basil, tomatoes and mozzarella.",
      image: "/img/pizzas/tomato-basil.webp",
      price: "13.49",
    },
    {
      name: "White Pizza",
      description: "Garlic & oil, fresh garlic, ricotta and mozzarella.",
      image: "/img/pizzas/white.webp",
      price: "13.99",
    },
    {
      name: "Chicken Bacon Ranch",
      description: "Sicilian style with chicken, bacon, mozzarella and ranch.",
      image: "/img/pizzas/chicken-bacon-ranch.webp",
      price: "15.99",
      badge: "Fan Favorite",
    },
  ],
  Breakfast: [
    {
      name: "Bacon & Egg Pie",
      description: "Scrambled eggs, smoked bacon, sharp cheddar and mozzarella.",
      image: "/img/pizzas/chicken-bacon-ranch.webp",
      price: "12.99",
      badge: "New",
    },
    {
      name: "Sunrise White",
      description: "Ricotta, soft egg, scallions and a drizzle of chili oil.",
      image: "/img/pizzas/white.webp",
      price: "12.49",
    },
    {
      name: "Sausage & Pepper Slice",
      description: "Italian breakfast sausage, peppers, mozzarella, fresh basil.",
      image: "/img/pizzas/tomato-basil.webp",
      price: "11.99",
    },
    {
      name: "Pepperoni Sunny",
      description: "Classic pepperoni meets breakfast — finished with a sunny egg.",
      image: "/img/pizzas/pepperoni.webp",
      price: "13.49",
    },
  ],
  Desserts: [
    {
      name: "House Tiramisu",
      description: "Coffee-soaked ladyfingers, mascarpone, dusted cocoa.",
      image: "/img/bento/tiramisu.webp",
      price: "6.99",
      badge: "Made In-House",
    },
    {
      name: "Cinnamon Pinwheels",
      description: "Pillowy dough rolled with cinnamon sugar and sweet glaze.",
      image: "/img/bento/pinwheels.webp",
      price: "5.49",
    },
    {
      name: "Cannoli Duo",
      description: "Two crisp shells filled with sweet ricotta and chocolate.",
      image: "/img/bento/tiramisu.webp",
      price: "5.99",
    },
    {
      name: "Sweet Stromboli",
      description: "Warm dessert stromboli with Nutella, banana and powdered sugar.",
      image: "/img/bento/stromboli.webp",
      price: "7.49",
    },
  ],
  Merch: [
    {
      name: "DHOP Classic Tee",
      description: "Soft cotton crewneck. Iconic red logo on natural cream.",
      image: "/img/brand/dhop-logo-color.png",
      price: "24.99",
    },
    {
      name: "20-Year Anniversary Cap",
      description: "Heritage 20-year crest. Adjustable strap, structured front.",
      image: "/img/brand/dhop-20-circle.webp",
      price: "22.00",
      badge: "Limited",
    },
    {
      name: "Hand-Tossed Hoodie",
      description: "Heavyweight fleece, oversized fit, classic DHOP wordmark.",
      image: "/img/brand/dhop-logo-white.png",
      price: "48.00",
    },
    {
      name: "House Apron",
      description: "Real kitchen apron, double front pocket, cross-back straps.",
      image: "/img/brand/dhop-logo-color.png",
      price: "28.00",
    },
  ],
};

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
  const [active, setActive] = useState<Tab>("Pizza");
  const items = ITEMS[active];
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: -1 | 1) => {
    const node = scrollerRef.current;
    if (!node) return;
    const card = node.querySelector("article");
    const step = (card?.getBoundingClientRect().width ?? 300) + 24;
    node.scrollBy({ left: direction * step, behavior: "smooth" });
  };

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
              const selected = tab === active;
              return (
                <button
                  key={tab}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  onClick={() => setActive(tab)}
                  className={`relative inline-flex h-11 items-center justify-center rounded-full px-4 text-[13px] font-semibold transition-colors duration-200 sm:px-6 sm:text-[14px] ${
                    selected
                      ? "bg-brand text-white shadow-[0_6px_14px_rgba(255,25,25,0.28)]"
                      : "text-ink/80 hover:text-brand"
                  }`}
                >
                  {tab}
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
            aria-label={`${active} menu`}
            className="scrollbar-hide -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-6 px-6 pb-3 sm:-mx-10 sm:scroll-px-10 sm:px-10"
          >
            {items.map((item) => (
              <article
                key={`${active}-${item.name}`}
                className="group relative flex w-72 shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_24px_rgba(20,30,42,0.07)] ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(20,30,42,0.14)] sm:w-80"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-cream-2">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 288px, 320px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {item.badge && (
                    <span className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-[0_4px_10px_rgba(255,25,25,0.35)]">
                      {item.badge}
                    </span>
                  )}
                  <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-sm font-bold text-ink shadow-[0_4px_10px_rgba(20,30,42,0.12)] backdrop-blur">
                    {item.price}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-[22px] leading-7 text-ink transition-colors duration-300 group-hover:text-brand">
                    {item.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-[13px] leading-5 text-ink-soft">
                    {item.description}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="font-display text-2xl text-ink">{item.price}</span>
                    <button
                      type="button"
                      className="inline-flex h-10 items-center justify-center rounded-full bg-brand px-5 text-[13px] font-bold text-white transition hover:bg-brand-dark"
                    >
                      {active === "Merch" ? "Add to bag" : "Add to order"}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center sm:mt-12">
          <a
            href="#order"
            className="inline-flex h-12 items-center justify-center rounded-full border-2 border-ink px-8 text-[14px] font-bold text-ink transition hover:bg-ink hover:text-white"
          >
            See the full {active.toLowerCase()} menu
          </a>
        </div>
      </div>
    </section>
  );
}
