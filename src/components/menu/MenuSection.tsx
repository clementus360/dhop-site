import type { ReactNode } from "react";
import type { MenuCategory } from "@/data/menu";
import { MenuItemCard } from "./MenuItemCard";

export function MenuSection({
  category,
  featureTile,
}: {
  category: MenuCategory;
  /** Optional wide tile injected at the start of the grid. */
  featureTile?: ReactNode;
}) {
  return (
    <section
      id={category.id}
      aria-labelledby={`${category.id}-heading`}
      className="scroll-mt-32 py-14 sm:py-20"
    >
      <div className="mx-auto max-w-360 px-6 sm:px-10">
        <header className="max-w-180">
          {category.tagline && (
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              {category.tagline}
            </p>
          )}
          <h2
            id={`${category.id}-heading`}
            className="mt-2 font-display text-[32px] leading-10 text-ink sm:text-[40px] sm:leading-11 lg:text-[44px] lg:leading-12"
          >
            {category.name}
          </h2>
          {category.pricingNote && (
            <p className="mt-3 inline-flex items-center rounded-full bg-ink/5 px-4 py-1.5 text-[12px] font-semibold text-ink">
              {category.pricingNote}
            </p>
          )}
          {category.description && (
            <p className="mt-4 text-sm leading-6 text-ink-soft">
              {category.description}
            </p>
          )}
        </header>

        {/* grid-flow-dense lets wider cards (col-span-2/-3/-4) sit next to
            smaller cards on lg+ breakpoints, avoiding awkward half-empty
            rows after a feature tile. */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-flow-dense lg:grid-cols-3 xl:grid-cols-4">
          {featureTile}
          {category.items.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
