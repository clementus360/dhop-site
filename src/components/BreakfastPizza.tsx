"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

const SLICES = [
  {
    name: "Bacon & Egg",
    description: "Smoked bacon, scrambled egg, sharp cheddar, mozzarella.",
    image: "/img/pizzas/chicken-bacon-ranch.webp",
    price: "12.99",
  },
  {
    name: "Sunrise White",
    description: "Ricotta, soft egg, scallions, finished with chili oil.",
    image: "/img/pizzas/white.webp",
    price: "12.49",
  },
  {
    name: "Sausage & Pepper",
    description: "Italian breakfast sausage, peppers, basil, mozzarella.",
    image: "/img/pizzas/tomato-basil.webp",
    price: "11.99",
  },
];

const AUTO_DEG_PER_MS = 360 / 45000;

const angleAt = (x: number, y: number, cx: number, cy: number) =>
  (Math.atan2(y - cy, x - cx) * 180) / Math.PI;

export function BreakfastPizza() {
  const pizzaRef = useRef<HTMLDivElement | null>(null);
  const rotationRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragRef = useRef<{
    centerX: number;
    centerY: number;
    startAngle: number;
    startRotation: number;
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Single RAF loop drives both auto-rotation and the rendered transform.
  // Mutating rotationRef directly avoids a React re-render every frame.
  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = now - last;
      last = now;
      if (!isDraggingRef.current && !reduced) {
        rotationRef.current += dt * AUTO_DEG_PER_MS;
      }
      const node = pizzaRef.current;
      if (node) {
        node.style.transform = `rotate(${rotationRef.current}deg)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const node = pizzaRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    dragRef.current = {
      centerX: cx,
      centerY: cy,
      startAngle: angleAt(e.clientX, e.clientY, cx, cy),
      startRotation: rotationRef.current,
    };
    isDraggingRef.current = true;
    setIsDragging(true);
    try {
      node.setPointerCapture(e.pointerId);
    } catch {
      /* capture may already be held */
    }
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    const a = angleAt(e.clientX, e.clientY, drag.centerX, drag.centerY);
    rotationRef.current = drag.startRotation + (a - drag.startAngle);
  }, []);

  const endDrag = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = null;
    isDraggingRef.current = false;
    setIsDragging(false);
    const node = pizzaRef.current;
    if (node) {
      try {
        node.releasePointerCapture(e.pointerId);
      } catch {
        /* not captured */
      }
    }
  }, []);

  return (
    <section id="breakfast" className="relative overflow-hidden bg-night py-16 text-white sm:py-24">
      {/* Decorative red disc — desktop only. Outer wrapper owns the centering
          transform; the disc and DHOP mark are siblings inside so the disc can
          stay blurred without smudging the logo. */}
      <div className="pointer-events-none absolute -left-40 top-1/2 hidden aspect-square w-160 -translate-y-1/2 lg:block">
        <Reveal
          anim="scale"
          className="absolute inset-0 rounded-full bg-brand/90 blur-[1px]"
        >
          <span className="sr-only">decorative</span>
        </Reveal>
        <Reveal
          anim="scale"
          delay={120}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Image
            src="/img/brand/dhop-logo-white.png"
            alt=""
            width={400}
            height={400}
            className="h-md w-md object-contain opacity-20"
          />
        </Reveal>
      </div>

      <div className="relative mx-auto max-w-360 px-6 sm:px-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Hero pizza image */}
          <div className="relative lg:col-span-6">
            <div className="relative mx-auto aspect-square w-full max-w-130">
              <Reveal anim="tilt" delay={120} className="absolute inset-0">
                <div
                  ref={pizzaRef}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={endDrag}
                  onPointerCancel={endDrag}
                  role="slider"
                  aria-label="Drag to rotate the pizza"
                  aria-valuetext="Pizza rotation"
                  tabIndex={0}
                  style={{ touchAction: "none" }}
                  className={`relative h-full w-full select-none drop-shadow-[0_30px_40px_rgba(0,0,0,0.45)] ${
                    isDragging ? "cursor-grabbing" : "cursor-grab"
                  }`}
                >
                  <div className="pointer-events-none absolute inset-0 [clip-path:inset(4%)]">
                    <Image
                      src="/img/hero-pizza.webp"
                      alt="Breakfast pizza fresh out of the oven"
                      fill
                      sizes="(max-width: 1024px) 90vw, 520px"
                      draggable={false}
                      className="object-contain"
                    />
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Hanging price tag */}
            <Reveal
              anim="up"
              delay={260}
              className="absolute -right-2 top-2 hidden sm:block"
            >
              <div className="tag-sway flex flex-col items-center">
                {/* String hanging from above */}
                <div aria-hidden className="h-9 w-px bg-white/55" />
                {/* Tag body */}
                <div className="relative rounded-lg bg-white px-6 pt-5 pb-3 text-ink shadow-[0_14px_30px_rgba(0,0,0,0.45)]">
                  {/* Punched hole */}
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-night/85 ring-1 ring-black/20"
                  />
                  <span className="block text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-soft">
                    Starting at
                  </span>
                  <span className="block text-center font-display text-3xl leading-none text-brand">
                    11.99
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Floating "fresh from 7" badge */}
            <Reveal
              anim="up"
              delay={340}
              className="absolute -left-2 bottom-4 hidden items-center gap-3 rounded-full bg-white px-5 py-3 shadow-[0_10px_24px_rgba(0,0,0,0.45)] ring-1 ring-black/5 sm:flex"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand text-white">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm.9 5h-1.8v6l5.2 3 .9-1.5-4.3-2.5V7Z" />
                </svg>
              </span>
              <span className="text-sm font-bold uppercase tracking-wider text-brand">
                Hot from 7AM
              </span>
            </Reveal>
          </div>

          {/* Copy */}
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              Now serving — mornings only
            </p>
            <h2 className="mt-3 font-display text-[36px] leading-11 text-balance sm:text-[44px] sm:leading-12 lg:text-[56px] lg:leading-15">
              Breakfast,
              <br />
              <span className="text-brand">By the Slice.</span>
            </h2>
            <p className="mt-5 max-w-130 text-base leading-7 text-white/85">
              Same hand-tossed crust. Same in-house dough. Just earlier. Crisp
              bacon, fresh-cracked eggs, and melty mozzarella — every morning
              from 7 to 11.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#order"
                className="inline-flex h-12 items-center justify-center rounded-full bg-brand px-7 text-[15px] font-bold text-white shadow-[0_8px_18px_rgba(255,25,25,0.35)] transition hover:bg-brand-dark"
              >
                Order Breakfast
              </a>
              <a
                href="#menu"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/40 px-7 text-[15px] font-semibold text-white transition hover:bg-white/10"
              >
                See All Slices
              </a>
            </div>
          </div>
        </div>

        {/* Slice cards */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SLICES.map((slice) => (
            <article
              key={slice.name}
              className="group flex items-center gap-4 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:ring-white/20"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={slice.image}
                  alt={slice.name}
                  fill
                  sizes="96px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="truncate font-display text-[20px] leading-7 text-white transition-colors duration-300 group-hover:text-brand">
                    {slice.name}
                  </h3>
                  <span className="font-display text-lg text-brand">{slice.price}</span>
                </div>
                <p className="mt-1 line-clamp-2 text-[13px] leading-5 text-white/70">
                  {slice.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
