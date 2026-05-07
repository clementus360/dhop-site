import Image from "next/image";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand text-white">
      <div className="relative mx-auto max-w-360 px-10 pt-40 pb-0">
        <div className="relative z-10 mx-auto max-w-210 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
            Hand-tossed in Fort Myers since 2005
          </p>
          <h1 className="mt-3 font-display text-[64px] leading-17 tracking-tight text-balance">
            Watch It Made.
            <br />
            Taste the Difference.
          </h1>
          <p className="mx-auto mt-5 max-w-130 text-base leading-6 text-white/90">
            Hand-tossed New York–style pizza. Made fresh. No shortcuts.
            <br />
            Grab a slice or order your pizza your way.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-5">
            <a
              href="#order"
              className="inline-flex h-12 min-w-60.5 items-center justify-center rounded-full bg-white px-8 text-[15px] font-semibold text-brand transition hover:bg-cream"
            >
              Order Now
            </a>
            <a
              href="#menu"
              className="inline-flex h-12 min-w-60.5 items-center justify-center rounded-full border border-white px-8 text-[15px] font-semibold text-white transition hover:bg-white/10"
            >
              Read Menu
            </a>
          </div>
          <div className="mt-5 flex items-center justify-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-white/85">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-white" />
            Slices from $4.99 — daily 11am to close
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-white" />
          </div>
        </div>
      </div>

      <div className="relative mx-auto -mt-2 h-70 w-full max-w-360 overflow-visible">
        <div className="absolute left-1/2 top-0 h-160 w-160 -translate-x-1/2">
          {/* Behind the pizza — tomatoes peek from under the crust */}
          <div
            aria-hidden
            className="float-a pointer-events-none absolute left-12 top-14 z-0 h-16 w-16"
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
            className="float-c pointer-events-none absolute right-10 top-44 z-0 h-14 w-14"
          >
            <Image
              src="/img/why/tomato.png"
              alt=""
              fill
              sizes="56px"
              className="object-contain drop-shadow-[0_6px_8px_rgba(0,0,0,0.18)]"
            />
          </div>

          {/* Pizza */}
          <div className="absolute inset-0 z-10 animate-pizza-enter">
            <Image
              src="/img/hero-pizza.webp"
              alt="Hand-tossed pepperoni pizza"
              fill
              priority
              sizes="600px"
              className="object-contain"
            />
          </div>

          {/* In front of the pizza — basil garnish resting on top */}
          <div
            aria-hidden
            className="float-b pointer-events-none absolute right-24 top-20 z-20 h-12 w-12"
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
            className="float-d pointer-events-none absolute left-32 top-48 z-20 h-14 w-14"
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
