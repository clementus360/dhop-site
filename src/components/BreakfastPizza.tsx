import Image from "next/image";
import { Reveal } from "./Reveal";

const SLICES = [
  {
    name: "Bacon & Egg",
    description: "Smoked bacon, scrambled egg, sharp cheddar, mozzarella.",
    image: "/img/pizzas/chicken-bacon-ranch.webp",
    price: "$12.99",
  },
  {
    name: "Sunrise White",
    description: "Ricotta, soft egg, scallions, finished with chili oil.",
    image: "/img/pizzas/white.webp",
    price: "$12.49",
  },
  {
    name: "Sausage & Pepper",
    description: "Italian breakfast sausage, peppers, basil, mozzarella.",
    image: "/img/pizzas/tomato-basil.webp",
    price: "$11.99",
  },
];

export function BreakfastPizza() {
  return (
    <section id="breakfast" className="relative overflow-hidden bg-night py-24 text-white">
      {/* Decorative red disc */}
      <Reveal
        anim="scale"
        className="pointer-events-none absolute -left-40 top-1/2 aspect-square w-160 -translate-y-1/2 rounded-full bg-brand/90 blur-[1px]"
      >
        <span className="sr-only">decorative</span>
      </Reveal>

      <div className="relative mx-auto max-w-360 px-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Hero pizza image */}
          <div className="relative lg:col-span-6">
            <div className="relative mx-auto aspect-square w-full max-w-130">
              <Reveal anim="tilt" delay={120} className="absolute inset-0">
                <div className="pizza-rotate-slow relative h-full w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.45)]">
                  <div className="absolute inset-0 [clip-path:inset(4%)]">
                    <Image
                      src="/img/hero-pizza.webp"
                      alt="Breakfast pizza fresh out of the oven"
                      fill
                      sizes="(max-width: 1024px) 90vw, 520px"
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
                    $11.99
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
            <h2 className="mt-3 font-display text-[56px] leading-15 text-balance">
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
