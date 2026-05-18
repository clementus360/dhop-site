import Image from "next/image";
import { Reveal } from "./Reveal";

export function VotedBest() {
  return (
    <section className="voted-best-bg relative overflow-hidden bg-cream py-24 sm:py-32 lg:py-40">
      {/* Soft confetti — pinned to the section, not the content column */}
      <span className="voted-confetti voted-confetti-a pointer-events-none absolute left-[8%] top-20 h-3 w-3 rounded-full bg-brand/70" />
      <span className="voted-confetti voted-confetti-b pointer-events-none absolute right-[10%] top-28 h-2 w-2 rounded-full bg-ink/30" />
      <span className="voted-confetti voted-confetti-c pointer-events-none absolute left-[14%] bottom-24 h-2 w-2 rounded-full bg-brand/60" />
      <span className="voted-confetti voted-confetti-d pointer-events-none absolute right-[18%] bottom-32 h-3 w-3 rounded-full bg-ink/25" />

      <div className="relative mx-auto max-w-220 px-6 sm:px-10">
        {/* Eyebrow */}
        <Reveal anim="up" className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand sm:text-sm">
            A community honor
          </p>
        </Reveal>

        {/* Headline */}
        <Reveal anim="up" delay={100} className="mt-5 text-center sm:mt-6">
          <h2 className="font-display text-[34px] leading-tight text-ink text-balance sm:text-[52px] lg:text-[68px]">
            Voted <span className="text-brand">Best Pizza</span>
            <br />
            in Lee County
          </h2>
        </Reveal>

        {/* Stamp */}
        <Reveal anim="scale" delay={220} className="mt-8 text-center sm:mt-10">
          <span className="voted-stamp inline-block font-display text-3xl uppercase tracking-tight text-brand sm:text-5xl">
            Because of you!
          </span>
        </Reveal>

        {/* Logo flanked by laurels — the whole row is the medallion */}
        <Reveal
          anim="scale"
          delay={320}
          className="relative mx-auto mt-14 flex w-full max-w-180 items-center justify-center gap-4 sm:mt-16 sm:gap-8"
        >
          {/* Twinkles */}
          <span className="voted-stars pointer-events-none absolute -left-2 -top-4 text-brand sm:-left-6 sm:-top-6">
            <svg viewBox="0 0 24 24" className="h-6 w-6 sm:h-8 sm:w-8" fill="currentColor" aria-hidden>
              <path d="M12 2 L14 9 L21 12 L14 15 L12 22 L10 15 L3 12 L10 9 Z" />
            </svg>
          </span>
          <span className="voted-stars-2 pointer-events-none absolute -right-2 -bottom-4 text-ink/60 sm:-right-6 sm:-bottom-6">
            <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-7 sm:w-7" fill="currentColor" aria-hidden>
              <path d="M12 2 L14 9 L21 12 L14 15 L12 22 L10 15 L3 12 L10 9 Z" />
            </svg>
          </span>

          {/* Logo */}
          <div className="voted-logo-wrap flex-1 px-2 sm:px-4">
            <Image
              src="/img/brand/DHOP-logo-RGB-light.png"
              alt="Downtown House of Pizza"
              width={720}
              height={355}
              className="mx-auto h-auto w-full max-w-72 sm:max-w-100 lg:max-w-120"
            />
          </div>

        </Reveal>

        {/* Supporting copy */}
        <Reveal anim="up" delay={420} className="mx-auto mt-12 max-w-150 text-center sm:mt-16">
          <p className="text-base leading-7 text-ink-soft sm:text-lg sm:leading-8">
            It is an honor to serve in a community with so many other amazing pizza
            businesses.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
