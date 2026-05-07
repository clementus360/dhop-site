import Image from "next/image";
import { Reveal } from "./Reveal";

export function Mission() {
  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div className="mx-auto grid max-w-360 grid-cols-1 items-center gap-12 px-20 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
            Our Mission Statement
          </p>
          <h2 className="mt-4 font-display text-[60px] leading-16 text-ink">
            Quality Ingredients, Pizza Making Skill, And Love Go{" "}
            <span className="text-brand">Into Every Pie.</span>
          </h2>
          <div className="mt-8 max-w-140 space-y-4 text-[15px] leading-7 text-ink-soft">
            <p>
              At DHOP, we believe great pizza comes from doing the basics
              right—every single time. Fresh dough made daily, quality ingredients sourced
              with care, and skilled hands that know what they&apos;re doing.
            </p>
            <p>
              From classic pepperoni to simple, well-balanced favorites like Tomato Basil, we
              focus on flavor, consistency, and craft over shortcuts.
            </p>
            <p>
              This is the DHOP way—simple, intentional, and built to deliver a great slice,
              every time.
            </p>
          </div>
        </div>

        <div className="relative h-150">
          {/* Red disc backdrop */}
          <Reveal
            anim="scale"
            className="absolute -right-20 top-1/2 aspect-square w-[110%] -translate-y-1/2 rounded-full bg-brand"
          >
            <span className="sr-only">decorative</span>
          </Reveal>

          {/* Main pizza */}
          <Reveal anim="up" delay={180} className="absolute inset-0">
            <Image
              src="/img/hero-pizza.webp"
              alt="Whole pepperoni pizza"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain drop-shadow-[0_22px_30px_rgba(0,0,0,0.18)]"
            />
          </Reveal>

          {/* 20-year anniversary sticker — tilted, top-right */}
          <Reveal
            anim="scale"
            delay={360}
            className="absolute right-2 top-2 h-32 w-32"
          >
            <div className="h-full w-full -rotate-12">
              <Image
                src="/img/brand/dhop-20-circle.webp"
                alt="DHOP — 20 years"
                fill
                sizes="128px"
                className="object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.22)]"
              />
            </div>
          </Reveal>

          {/* Process puck — fresh toppings */}
          <Reveal
            anim="scale"
            delay={440}
            className="absolute -left-4 bottom-10 h-44 w-44 overflow-hidden rounded-full ring-[6px] ring-white shadow-[0_18px_36px_rgba(0,0,0,0.22)]"
          >
            <Image
              src="/img/why/quality-toppings.webp"
              alt="Fresh toppings prepped daily"
              fill
              sizes="176px"
              className="object-cover"
            />
          </Reveal>

          {/* Stat callout — In-house daily */}
          <Reveal
            anim="up"
            delay={520}
            className="absolute right-2 bottom-6 flex items-center gap-3 rounded-full bg-white px-5 py-3 shadow-[0_16px_32px_rgba(0,0,0,0.16)] ring-1 ring-ink/5"
          >
            <span className="font-display text-[32px] leading-none text-brand">100%</span>
            <span className="max-w-28 text-[11px] font-bold uppercase leading-tight tracking-wider text-ink">
              Made In-House Daily
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
