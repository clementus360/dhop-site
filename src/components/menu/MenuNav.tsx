"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

export type MenuNavItem = { id: string; name: string };

export function MenuNav({
  items,
  toolbar,
}: {
  items: MenuNavItem[];
  /** Optional inline slot (search input, filters) rendered next to the chips. */
  toolbar?: ReactNode;
}) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  // Track which section is currently in view so the matching chip lights up.
  useEffect(() => {
    if (items.length === 0) return;
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Prefer the first section whose top has crossed the sticky-nav offset.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  // Keep the active chip visible inside the horizontally-scrolling rail.
  useEffect(() => {
    const node = linkRefs.current.get(activeId);
    if (!node) return;
    node.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [activeId]);

  return (
    <nav
      aria-label="Menu categories"
      className="sticky top-20 z-30 border-y border-ink/10 bg-white/95 backdrop-blur"
    >
      <div className="mx-auto max-w-360 px-6 sm:px-10">
        <div className="flex flex-col gap-3 py-4 lg:flex-row lg:items-center lg:gap-6">
          {toolbar && <div className="shrink-0 lg:order-2">{toolbar}</div>}
          <ul className="scrollbar-hide -mx-2 flex gap-1.5 overflow-x-auto lg:order-1 lg:flex-1">
          {items.map((item) => {
            const isActive = item.id === activeId;
            return (
              <li key={item.id} className="shrink-0">
                <a
                  ref={(el) => {
                    if (el) linkRefs.current.set(item.id, el);
                    else linkRefs.current.delete(item.id);
                  }}
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`inline-flex h-10 items-center justify-center whitespace-nowrap rounded-full px-4 text-[13px] font-semibold transition sm:h-11 sm:px-5 sm:text-[14px] ${
                    isActive
                      ? "bg-brand text-white shadow-[0_6px_14px_rgba(255,25,25,0.28)]"
                      : "bg-cream text-ink hover:bg-ink/5"
                  }`}
                >
                  {item.name}
                </a>
              </li>
            );
          })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
