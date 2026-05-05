import Image from "next/image";
import { Reveal } from "./Reveal";

export function Mission() {
  return (
    <section className="relative overflow-hidden bg-white py-20">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-20 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
            Our Mission Statement
          </p>
          <h2 className="mt-4 font-display text-[60px] leading-[64px] text-ink">
            Quality Ingredients, Pizza Making Skill, And Love Go{" "}
            <span className="text-brand">Into Every Pie.</span>
          </h2>
          <div className="mt-8 max-w-[560px] space-y-4 text-[15px] leading-7 text-ink-soft">
            <p>
              At Downtown House of Pizza, we believe great pizza comes from doing the basics
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

        <div className="relative h-[560px]">
          <Reveal
            anim="scale"
            className="absolute -right-24 top-1/2 aspect-square w-[120%] -translate-y-1/2 rounded-full bg-brand"
          >
            <span className="sr-only">decorative</span>
          </Reveal>
          <Reveal anim="up" delay={180} className="absolute inset-0">
            <Image
              src="/img/hero-pizza.webp"
              alt="Whole pepperoni pizza"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
