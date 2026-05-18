import type { ReactNode } from "react";

/**
 * Slim menu page hero. Hosts the primary CTAs (Order Now + Build Your Own)
 * and the page-wide search input. Both `buildYourOwnCta` and `searchBar`
 * are slots so the hero stays a stateless server component while the
 * client-owned modal and search state live in their respective wrappers.
 */
export function MenuHero({
  buildYourOwnCta,
  searchBar,
}: {
  buildYourOwnCta?: ReactNode;
  searchBar?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-brand pt-16 text-white">
      <div className="relative mx-auto flex max-w-360 flex-col gap-6 px-6 pt-28 pb-10 sm:px-10 sm:pt-32 sm:pb-12">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80 sm:text-xs">
              The Whole Menu
            </p>
            <h1 className="mt-2 font-display text-[36px] uppercase leading-[1.02] sm:text-[48px] lg:text-[56px]">
              Hand-tossed. <span className="text-white/85">Made fresh.</span>
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {buildYourOwnCta}
          </div>
        </div>
        {searchBar && (
          <div className="mt-2 max-w-180 sm:mt-0">{searchBar}</div>
        )}
      </div>
    </section>
  );
}
