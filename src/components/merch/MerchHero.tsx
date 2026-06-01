import Image from "next/image";
import { ShieldCheck, Truck, Package } from "lucide-react";
import { MERCH_STORE_URL } from "@/data/merch";

const BADGES = [
  { Icon: Package, label: "Printed on demand" },
  { Icon: Truck, label: "Ships from the US" },
  { Icon: ShieldCheck, label: "Secure checkout" },
];

export function MerchHero() {
  return (
    <section className="relative overflow-hidden bg-brand pt-16 text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 20%, rgba(255,255,255,0.6), transparent 35%), radial-gradient(circle at 90% 80%, rgba(0,0,0,0.4), transparent 40%)",
        }}
      />

      <div className="relative mx-auto flex max-w-360 flex-col gap-10 px-6 pt-24 pb-12 sm:px-10 sm:pt-32 sm:pb-16 lg:flex-row items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80 sm:text-xs">
            The DHOP Shop
          </p>
          <h1 className="mt-2 font-display text-[40px] uppercase leading-[1.02] sm:text-[56px] lg:text-[72px]">
            Wear the Slice.
            <br />
            <span className="text-white/85">Rep the House.</span>
          </h1>
          <p className="mt-5 max-w-150 text-[15px] leading-7 text-white/85 sm:text-base">
            Tees, caps, tumblers, totes and a few surprises — every piece
            made on demand by our print partner and shipped straight to
            your door.
          </p>

          <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[12px] font-semibold uppercase tracking-wider text-white/90">
            {BADGES.map(({ Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5" aria-hidden />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden shrink-0 lg:block">
          <div className="relative h-44 w-44 rounded-full bg-white/10 ring-1 ring-white/20 backdrop-blur-sm">
            <Image
              src="/img/brand/dhop-logo-white.png"
              alt=""
              fill
              sizes="176px"
              className="object-contain p-6 opacity-90"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
