"use client";

import { Fragment, type ReactNode, useMemo, useState } from "react";
import type { MenuData, MenuCategory, MenuItem } from "@/data/menu";
import { MenuHero } from "./MenuHero";
import { MenuNav } from "./MenuNav";
import { MenuSection } from "./MenuSection";
import { PizzaSizesPanel } from "./PizzaSizesPanel";
import { WingsExtras } from "./WingsExtras";
import { BuildYourOwnTile } from "./BuildYourOwn";

/**
 * Client wrapper for the menu page body. Owns the search query, renders
 * the hero (with the search input as its primary input field), the
 * category nav and every section. Categories with no matches drop out;
 * the sizes & toppings reference and the wings extras step aside during
 * active search so the focused result list stays clean. The reference
 * panels render once at the end of the menu so they no longer interrupt
 * the category flow.
 */
export function MenuExplorer({
  menu,
  buildYourOwnCta,
}: {
  menu: MenuData;
  buildYourOwnCta?: ReactNode;
}) {
  const [query, setQuery] = useState("");
  const trimmed = query.trim().toLowerCase();
  const isSearching = trimmed.length > 0;

  const filteredCategories = useMemo<MenuCategory[]>(() => {
    if (!isSearching) {
      return menu.categories.filter((c) => c.id !== "build-your-own");
    }
    return menu.categories
      .filter((c) => c.id !== "build-your-own")
      .map((c) => ({
        ...c,
        items: c.items.filter((i) => matchItem(i, trimmed)),
      }))
      .filter((c) => c.items.length > 0);
  }, [menu.categories, isSearching, trimmed]);

  const totalMatches = filteredCategories.reduce(
    (sum, c) => sum + c.items.length,
    0
  );

  const navItems = useMemo(
    () => filteredCategories.map((c) => ({ id: c.id, name: c.name })),
    [filteredCategories]
  );

  return (
    <>
      <MenuHero
        buildYourOwnCta={buildYourOwnCta}
        searchBar={
          <SearchBar
            value={query}
            onChange={setQuery}
            totalMatches={isSearching ? totalMatches : undefined}
          />
        }
      />

      <MenuNav items={navItems} />

      {isSearching && totalMatches === 0 && (
        <NoResults query={query} onClear={() => setQuery("")} />
      )}

      {/* Specialty pizzas first — wide BYO tile leads the grid on the
          default view and steps aside during search so results stay tight. */}
      {filteredCategories
        .filter((c) => c.id === "specialty-pizzas")
        .map((c) => (
          <MenuSection
            key={c.id}
            category={c}
            featureTile={
              isSearching ? undefined : (
                <BuildYourOwnTile
                  sizes={menu.pizzaSizes}
                  toppings={menu.toppings}
                />
              )
            }
          />
        ))}

      {/* Remaining categories in source order, with the wings extras strip
          following the wings section. */}
      {filteredCategories
        .filter((c) => c.id !== "specialty-pizzas")
        .map((c) => (
          <Fragment key={c.id}>
            <MenuSection category={c} />
            {!isSearching && c.id === "wings" && (
              <WingsExtras
                sauces={menu.wingSauces}
                premium={menu.premiumWingSauces}
                dressings={menu.dressings}
              />
            )}
          </Fragment>
        ))}

      {/* Sizes & toppings reference now lives at the end of the menu, after
          every category, so it reads as a "build your own" appendix rather
          than splitting the categories in two. Hidden during search. */}
      {!isSearching && (
        <PizzaSizesPanel sizes={menu.pizzaSizes} toppings={menu.toppings} />
      )}
    </>
  );
}

function matchItem(item: MenuItem, query: string): boolean {
  const haystack = [
    item.name,
    item.description,
    item.note,
    ...(item.badges ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

function SearchBar({
  value,
  onChange,
  totalMatches,
}: {
  value: string;
  onChange: (v: string) => void;
  totalMatches?: number;
}) {
  const inputId = "menu-search";
  return (
    <div className="relative w-full max-w-xl">
      <label htmlFor={inputId} className="sr-only">
        Search the menu
      </label>
      <span
        aria-hidden
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      </span>
      <input
        id={inputId}
        type="search"
        inputMode="search"
        placeholder="Search the menu — try “pepperoni”, “buffalo”, “gluten free”…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-14 w-full rounded-full border border-transparent bg-white pl-12 pr-32 text-[14px] text-ink shadow-[0_18px_40px_rgba(0,0,0,0.18)] placeholder:text-ink-soft/70 focus:border-ink/15 focus:outline-none focus:ring-4 focus:ring-white/30 sm:text-[15px]"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 inline-flex h-10 -translate-y-1/2 items-center gap-1.5 rounded-full bg-cream-2 px-4 text-[12px] font-semibold text-ink transition hover:bg-ink/10"
        >
          {totalMatches !== undefined && (
            <span className="font-display text-[13px] text-brand">{totalMatches}</span>
          )}
          <span>{totalMatches === 1 ? "match" : "matches"}</span>
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      ) : (
        <span className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-full bg-cream-2 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink-soft sm:inline">
          ⌘ K
        </span>
      )}
    </div>
  );
}

function NoResults({
  query,
  onClear,
}: {
  query: string;
  onClear: () => void;
}) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-360 px-6 text-center sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
          No matches
        </p>
        <h2 className="mt-3 font-display text-[28px] leading-9 text-ink sm:text-[36px] sm:leading-12">
          Nothing on the menu matches{" "}
          <span className="text-brand">“{query}”</span>
        </h2>
        <p className="mx-auto mt-3 max-w-150 text-sm leading-6 text-ink-soft">
          Try a simpler term like “pepperoni”, “buffalo”, or “gluten free” — or
          clear the search to see everything we make.
        </p>
        <button
          type="button"
          onClick={onClear}
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-ink px-6 text-[13px] font-bold text-white transition hover:bg-night"
        >
          Clear search
        </button>
      </div>
    </section>
  );
}
