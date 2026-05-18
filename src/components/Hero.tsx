"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }

    let raf = 0;
    const update = () => {
      const node = heroRef.current;
      if (!node) return;
      // Map the user's scroll past the top of the hero into a 0..1 progress.
      // Reveal completes within roughly half a viewport of scrolling.
      const distance = Math.max(window.innerHeight * 0.5, 280);
      const scrolled = Math.max(0, -node.getBoundingClientRect().top);
      setProgress(Math.max(0, Math.min(1, scrolled / distance)));
    };

    update();
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Tagline: faintly visible at rest (so the layout reads), brightens and rises
  // into final position as the user scrolls. Keep the rise small so it never
  // crosses into the pizza's space.
  const taglineStyle = {
    opacity: 0.18 + progress * 0.82,
    transform: `translate3d(0, ${(1 - progress) * 18}px, 0)`,
  } as const;
  // Pizza: very subtle downward drift so the gap above it grows slightly as the
  // user scrolls — this gives a parallax feel without ever encroaching on the
  // tagline above it.
  const pizzaStyle = {
    transform: `translate3d(0, ${progress * 8}px, 0)`,
  } as const;

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-brand text-white"
    >
      <div className="relative mx-auto max-w-360 px-6 pt-32 pb-0 sm:px-10 sm:pt-40">
        <div className="relative z-30 mx-auto max-w-220 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/85 sm:text-xs">
            Hand-tossed in Fort Myers since 2005
          </p>

          {/* Prominent DHOP logo — replaces the headline */}
          <div className="mt-6 flex justify-center sm:mt-8">
            <Image
              src="/img/brand/DHOP-logo-RGB-light.png"
              alt="Downtown House of Pizza — Fort Myers"
              width={720}
              height={355}
              priority
              className="h-auto w-72 drop-shadow-[0_18px_30px_rgba(0,0,0,0.25)] sm:w-100 lg:w-130"
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-5">
            <a
              href="#order"
              className="inline-flex h-12 min-w-60.5 items-center justify-center rounded-full bg-white px-8 text-[15px] font-semibold text-brand transition hover:bg-cream"
            >
              Order Now
            </a>
            <a
              href="/menu"
              className="inline-flex h-12 min-w-60.5 items-center justify-center rounded-full border border-white px-8 text-[15px] font-semibold text-white transition hover:bg-white/10"
            >
              Read Menu
            </a>
          </div>
          <div className="mt-5 flex items-center justify-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/85">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-white" />
            Slices from 4.99 — daily 11am to close
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-white" />
          </div>
        </div>
      </div>

      {/* Tagline — gradually fades & lifts into place as the user scrolls */}
      <div
        className="relative z-10 mx-auto mt-10 max-w-360 px-6 text-center sm:mt-14 sm:px-10"
        style={taglineStyle}
      >
        <h2 className="font-display text-[34px] uppercase leading-[1.05] text-balance sm:text-[48px] lg:text-[64px]">
          Watch It Made.
          <br />
          Taste the Difference.
        </h2>
      </div>

      {/* Pizza — small parallax drift; static margin keeps a comfortable gap
          above the pizza so it never crosses into the tagline */}
      <div
        className="relative z-20 mx-auto mt-4 h-50 w-full max-w-360 overflow-visible sm:mt-8 sm:h-60 lg:mt-4 lg:h-70"
        style={pizzaStyle}
      >
        <div className="absolute left-1/2 top-0 h-90 w-90 -translate-x-1/2 sm:h-130 sm:w-130 lg:h-160 lg:w-160">
          <div
            aria-hidden
            className="float-a pointer-events-none absolute left-12 top-14 z-5 hidden h-16 w-16 sm:block"
          >
            <Image
              src="/img/why/tomato.png"
              alt=""
              fill
              sizes="64px"
              className="object-contain drop-shadow-[0_6px_8px_rgba(0,0,0,0.18)]"
            />
          </div>
          <div
            aria-hidden
            className="float-c pointer-events-none absolute right-10 top-44 z-5 hidden h-14 w-14 sm:block"
          >
            <Image
              src="/img/why/tomato.png"
              alt=""
              fill
              sizes="56px"
              className="object-contain drop-shadow-[0_6px_8px_rgba(0,0,0,0.18)]"
            />
          </div>

          <div className="absolute inset-0 z-10 animate-pizza-enter">
            <Image
              src="/img/hero-pizza.webp"
              alt="Hand-tossed pepperoni pizza"
              fill
              priority
              sizes="600px"
              className="object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.22)]"
            />
          </div>

          <div
            aria-hidden
            className="float-b pointer-events-none absolute right-24 top-20 z-30 hidden h-12 w-12 sm:block"
          >
            <Image
              src="/img/why/basil.png"
              alt=""
              fill
              sizes="48px"
              className="object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.28)]"
            />
          </div>
          <div
            aria-hidden
            className="float-d pointer-events-none absolute left-32 top-48 z-30 hidden h-14 w-14 sm:block"
          >
            <Image
              src="/img/why/basil.png"
              alt=""
              fill
              sizes="56px"
              className="object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.28)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
