import type { MenuData } from "@/data/menu";

export function WingsExtras({
  sauces,
  premium,
  dressings,
}: {
  sauces: MenuData["wingSauces"];
  premium: MenuData["premiumWingSauces"];
  dressings: MenuData["dressings"];
}) {
  return (
    <section
      aria-label="Wing sauces and dressings"
      className="bg-cream py-12 sm:py-16"
    >
      <div className="mx-auto grid max-w-360 gap-6 px-6 sm:px-10 lg:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 ring-1 ring-ink/5 shadow-[0_8px_24px_rgba(20,30,42,0.05)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
            Wing sauces
          </p>
          <h3 className="mt-2 font-display text-[22px] text-ink">
            House Tosses
          </h3>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {sauces.map((s) => (
              <li
                key={s}
                className="inline-flex items-center rounded-full bg-cream-2 px-3 py-1 text-[12px] font-semibold text-ink"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-white p-6 ring-1 ring-ink/5 shadow-[0_8px_24px_rgba(20,30,42,0.05)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
            Premium sauces
          </p>
          <h3 className="mt-2 font-display text-[22px] text-ink">Upgrade Your Toss</h3>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {premium.map((s) => (
              <li
                key={s}
                className="inline-flex items-center rounded-full bg-brand/10 px-3 py-1 text-[12px] font-semibold text-brand ring-1 ring-brand/30"
              >
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
            +$2 (6 ct) · +$3 (12 ct) · +$4 (25 ct)
          </p>
        </div>
        <div className="rounded-2xl bg-white p-6 ring-1 ring-ink/5 shadow-[0_8px_24px_rgba(20,30,42,0.05)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
            Dressings
          </p>
          <h3 className="mt-2 font-display text-[22px] text-ink">
            House Dressings
          </h3>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {dressings.map((d) => (
              <li
                key={d}
                className="inline-flex items-center rounded-full bg-cream-2 px-3 py-1 text-[12px] font-semibold text-ink"
              >
                {d}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
            3.5 oz served with wings · Extra +$1
          </p>
        </div>
      </div>
    </section>
  );
}
