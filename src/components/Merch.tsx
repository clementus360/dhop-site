import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Shirt } from "lucide-react";
import { Reveal } from "./Reveal";
import { getFeaturedMerch } from "@/data/merch";

export function Merch() {
  const featured = getFeaturedMerch();

  return (
    <section
      id="merch"
      className="relative overflow-hidden bg-white py-16 sm:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-10 hidden h-72 w-72 rounded-full bg-brand/8 blur-3xl lg:block"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 bottom-10 hidden h-72 w-72 rounded-full bg-ink/8 blur-3xl lg:block"
      />

      <div className="mx-auto max-w-360 px-6 sm:px-10">
        <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              <Shirt className="h-3.5 w-3.5" aria-hidden />
              Rep the brand
            </p>
            <h2 className="mt-3 font-display text-[36px] leading-11 text-ink text-balance sm:text-[48px] sm:leading-13 lg:text-[60px] lg:leading-16">
              Take DHOP
              <br />
              <span className="text-brand">With You.</span>
            </h2>
            <p className="mt-5 max-w-150 text-base leading-7 text-ink-soft">
              Tees, caps, tumblers, totes — same hand-tossed energy, made
              to be worn out the door. Pizza-loving dogs are covered too.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/merch"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand px-7 text-[15px] font-bold text-white shadow-[0_8px_18px_rgba(255,25,25,0.35)] transition hover:bg-brand-dark"
            >
              Shop all merch
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {featured.map((p, idx) => (
            <li key={p.id}>
              <Reveal anim="up" delay={idx * 80}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block focus:outline-none"
                  aria-label={`${p.name}, $${p.price} — opens on Printify`}
                >
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-cream ring-1 ring-ink/5 transition group-hover:ring-brand/30 group-focus-visible:ring-brand">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 22vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink shadow-sm">
                      ${Number.isInteger(p.price) ? p.price : p.price.toFixed(2)}
                    </span>
                    <span
                      aria-hidden
                      className="absolute right-3 bottom-3 inline-flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-brand text-white opacity-0 shadow-[0_6px_16px_rgba(255,25,25,0.45)] transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="mt-3">
                    <h3 className="font-display text-[18px] leading-6 text-ink transition group-hover:text-brand">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-[13px] leading-5 text-ink-soft">
                      {p.short}
                    </p>
                  </div>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
