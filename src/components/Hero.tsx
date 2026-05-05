import Image from "next/image";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand text-white">
      <div className="mx-auto max-w-[1440px] px-10 pt-32 pb-0">
        <div className="relative z-10 mx-auto max-w-[840px] text-center">
          <h1 className="font-display text-[64px] leading-[68px] tracking-tight text-balance">
            Watch It Made.
            <br />
            Taste the Difference.
          </h1>
          <p className="mx-auto mt-5 max-w-[520px] text-base leading-6 text-white/90">
            Hand-tossed New York–style pizza. Made fresh. No shortcuts.
            <br />
            Grab a slice or order your pizza your way.
          </p>
          <div className="mt-6 flex items-center justify-center gap-5">
            <a
              href="#order"
              className="inline-flex h-12 min-w-[242px] items-center justify-center rounded-full bg-white px-8 text-[15px] font-semibold text-brand transition hover:bg-cream"
            >
              Order Now
            </a>
            <a
              href="#menu"
              className="inline-flex h-12 min-w-[242px] items-center justify-center rounded-full border border-white px-8 text-[15px] font-semibold text-white transition hover:bg-white/10"
            >
              Read Menu
            </a>
          </div>
        </div>
      </div>

      <div className="relative mx-auto -mt-2 h-[340px] w-full max-w-[1440px] overflow-visible">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[480px] w-[480px] animate-pizza-enter">
          <Image
            src="/img/hero-pizza.webp"
            alt="Hand-tossed pepperoni pizza"
            fill
            priority
            sizes="480px"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
