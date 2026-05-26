"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MegaMenu } from "./menu/MegaMenu";
import { getMenu } from "@/data/menu";

const PRIMARY_NAV: Array<{
  label: string;
  href: string;
  /** Renders the mega menu when hovered. */
  hasMegaMenu?: boolean;
}> = [
  { label: "Menu", href: "/menu", hasMegaMenu: true },
  { label: "Breakfast", href: "/menu#breakfast-pizzas" },
  { label: "The DHOP Way", href: "/#dhop-way" },
  { label: "Catering", href: "/menu#catering" },
  { label: "Merchandise", href: "/merch" },
];

const MEGA_FEATURED_CATEGORIES = [
  "specialty-pizzas",
  "breakfast-pizzas",
  "subs",
  "wings",
  "salads",
  "desserts",
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredCategoryId, setHoveredCategoryId] = useState(
    MEGA_FEATURED_CATEGORIES[0]
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile drawer on Escape, and lock body scroll while open.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const menu = getMenu();

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "bg-brand/95 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.18)]"
          : "bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-360 items-center justify-between px-6 transition-all duration-300 sm:px-10 ${
          scrolled ? "h-20" : "h-24 sm:h-32"
        }`}
      >
        <Link href="/" className="flex items-center" aria-label="DHOP">
          <Image
            src="/img/brand/dhop-logo-white.png"
            alt="DHOP"
            width={140}
            height={120}
            priority
            className={`w-auto transition-all duration-300 ${
              scrolled ? "h-12 sm:h-14" : "h-20 sm:h-32"
            }`}
          />
        </Link>

        {/* The nav is the positioning context for the mega menu so `right-0`
            on the panel anchors against the right edge of the whole nav
            cluster (which sits flush with the page padding), not the
            narrow Menu link — that keeps the panel inside the viewport. */}
        <nav className="relative flex items-center gap-4 lg:gap-10">
          <ul className="hidden items-center gap-6 lg:flex lg:gap-10">
            {PRIMARY_NAV.map((item) => (
              <li
                key={item.label}
                onMouseEnter={() => {
                  if (item.hasMegaMenu) setMegaOpen(true);
                }}
                onMouseLeave={() => {
                  if (item.hasMegaMenu) setMegaOpen(false);
                }}
              >
                <Link
                  href={item.href}
                  aria-haspopup={item.hasMegaMenu ? "menu" : undefined}
                  aria-expanded={
                    item.hasMegaMenu ? (megaOpen ? "true" : "false") : undefined
                  }
                  // h-12 matches the Order Now button so each li spans the
                  // full nav height — together with the menu panel's pt-3
                  // bridge, the cursor never leaves the menu's hover tree.
                  className="inline-flex h-12 items-center gap-1 text-[15px] font-medium text-white/95 transition hover:text-white"
                >
                  {item.label}
                  {item.hasMegaMenu && (
                    <svg
                      viewBox="0 0 24 24"
                      className={`h-3.5 w-3.5 transition-transform ${
                        megaOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  )}
                </Link>
                {item.hasMegaMenu && megaOpen && (
                  <MegaMenu
                    hoveredCategoryId={hoveredCategoryId}
                    setHoveredCategoryId={setHoveredCategoryId}
                    onSelect={() => setMegaOpen(false)}
                  />
                )}
              </li>
            ))}
          </ul>

          <Link
            href="/#order"
            className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-[14px] font-semibold text-brand transition hover:bg-cream sm:h-12 sm:px-7 sm:text-[15px]"
          >
            Order Now
          </Link>

          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/30 transition hover:bg-white/20 lg:hidden"
          >
            {mobileOpen ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </nav>
      </div>

      {/* Mobile drawer — same content as the mega menu, but stacked. */}
      {mobileOpen && (
        <div className="lg:hidden">
          <div className="max-h-[calc(100vh-5rem)] overflow-y-auto bg-brand pb-10">
            <div className="mx-auto max-w-360 px-6 sm:px-10">
              <ul className="flex flex-col divide-y divide-white/15 border-t border-white/15">
                {PRIMARY_NAV.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between py-4 text-[16px] font-semibold text-white"
                    >
                      {item.label}
                      <span aria-hidden className="text-white/70">→</span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
                  Jump to a category
                </p>
                <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {menu.categories
                    .filter((c) => MEGA_FEATURED_CATEGORIES.includes(c.id))
                    .map((c) => (
                      <li key={c.id}>
                        <Link
                          href={`/menu#${c.id}`}
                          onClick={() => setMobileOpen(false)}
                          className="block rounded-xl bg-white/10 px-4 py-3 text-[13px] font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/20"
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>

              <Link
                href="/menu"
                onClick={() => setMobileOpen(false)}
                className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-full bg-white text-[15px] font-bold text-brand transition hover:bg-cream"
              >
                See the full menu
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
