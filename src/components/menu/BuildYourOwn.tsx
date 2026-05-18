"use client";

import Image from "next/image";
import { useState } from "react";
import { formatPrice, type MenuData } from "@/data/menu";
import { BuildYourOwnModal } from "./BuildYourOwnModal";

type SharedProps = {
  sizes: MenuData["pizzaSizes"];
  toppings: MenuData["toppings"];
};

/**
 * Wide promo tile rendered inside the specialty-pizza grid. Spans two
 * grid columns from sm and up to break the card uniformity. Splits the
 * card into a text panel and a full-opacity hero pizza image so neither
 * overlaps the other.
 */
export function BuildYourOwnTile({ sizes, toppings }: SharedProps) {
  const [open, setOpen] = useState(false);
  const startingPrice = Math.min(...sizes.map((s) => s.cheesePrice));

  return (
    <>
      <article className="group relative col-span-1 flex flex-col overflow-hidden rounded-2xl bg-brand text-white shadow-[0_18px_40px_rgba(255,25,25,0.28)] ring-1 ring-brand/40 sm:col-span-2 sm:flex-row">
        {/* Text panel — keeps copy isolated from the image. */}
        <div className="relative flex flex-1 flex-col justify-between gap-6 p-6 sm:p-8">

          <div className="relative">
            <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white ring-1 ring-white/30">
              From {formatPrice(startingPrice)}
            </span>
            <h3 className="mt-4 font-display text-[34px] uppercase leading-[1.02] sm:text-[40px] lg:text-[44px]">
              Build Your <br />
              Own Pizza
            </h3>
            <p className="mt-3 max-w-100 text-[14px] leading-6 text-white/90">
              Five sizes. 24 regular toppings. 9 premium upgrades. Stack it the
              way you like — we&apos;ll hand-toss it.
            </p>
          </div>

          <div className="relative flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-[14px] font-bold text-brand transition hover:bg-cream"
            >
              Start building
            </button>
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/80">
              Hand-tossed · 6 simple ingredients
            </span>
          </div>
        </div>

        {/* Image panel — full opacity, lives in its own column so it never
            sits under the copy. Falls in line under the text on mobile.
            `overflow-hidden` clips the hover-scale so the pizza never spills
            into the text panel or past the card edge. */}
        <div className="relative h-56 w-full shrink-0 overflow-hidden sm:h-auto sm:w-64 lg:w-80">
          {/* Subtle red gradient blends the seam between panel and image on
              the desktop split layout. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-24 bg-linear-to-r from-brand to-transparent sm:block"
          />
          <Image
            src="/img/hero-pizza.webp"
            alt="Hand-tossed pizza"
            fill
            sizes="(max-width: 640px) 100vw, 320px"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </article>

      <BuildYourOwnModal
        open={open}
        onClose={() => setOpen(false)}
        sizes={sizes}
        toppings={toppings}
      />
    </>
  );
}

/**
 * Compact button suitable for the hero or inline CTAs. Renders its own
 * modal instance so it stays self-contained — each instance manages its
 * own open/closed state.
 */
export function BuildYourOwnButton({
  sizes,
  toppings,
  variant = "primary",
  className,
  children = "Build Your Own",
}: SharedProps & {
  variant?: "primary" | "ghost";
  className?: string;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const base =
    "inline-flex h-12 items-center justify-center rounded-full px-7 text-[15px] font-semibold transition";
  const variants = {
    primary: "bg-white text-brand hover:bg-cream",
    ghost: "border border-white/70 text-white hover:bg-white/10",
  } as const;
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`${base} ${variants[variant]} ${className ?? ""}`.trim()}
      >
        {children}
      </button>
      <BuildYourOwnModal
        open={open}
        onClose={() => setOpen(false)}
        sizes={sizes}
        toppings={toppings}
      />
    </>
  );
}
