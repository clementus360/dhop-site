import type { MenuData } from "@/data/menu";
import { formatPrice } from "@/data/menu";

export function PizzaSizesPanel({
  sizes,
  toppings,
}: {
  sizes: MenuData["pizzaSizes"];
  toppings: MenuData["toppings"];
}) {
  return (
    <section
      id="pizza-sizes"
      aria-labelledby="pizza-sizes-heading"
      className="bg-night py-14 text-white sm:py-20"
    >
      <div className="mx-auto max-w-360 px-6 sm:px-10">
        <div className="max-w-150">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
            Pricing reference
          </p>
          <h2
            id="pizza-sizes-heading"
            className="mt-3 font-display text-[32px] leading-10 sm:text-[40px] sm:leading-11"
          >
            Sizes & <span className="text-brand">Toppings</span>
          </h2>
          <p className="mt-3 text-sm leading-6 text-white/75">
            Every pizza starts with our scratch-made dough, house red sauce and
            mozzarella. Below is what cheese pies cost — every regular or
            premium topping adds the amount shown.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {sizes.map((s) => (
            <div
              key={s.id}
              className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 backdrop-blur"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/65">
                {s.dims}
              </p>
              <h3 className="mt-2 font-display text-[22px] leading-7">{s.label}</h3>
              <p className="mt-3 font-display text-3xl text-brand">
                {formatPrice(s.cheesePrice)}
              </p>
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/60">
                Cheese pizza
              </p>
              <ul className="mt-4 space-y-1 text-[12px] text-white/85">
                <li className="flex items-center justify-between">
                  <span>+ Regular</span>
                  <span className="font-display text-brand">
                    +{formatPrice(s.addRegularTopping)}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span>+ Premium</span>
                  <span className="font-display text-brand">
                    +{formatPrice(s.addPremiumTopping)}
                  </span>
                </li>
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur">
            <h3 className="font-display text-[22px]">Regular Toppings</h3>
            <p className="mt-1 text-[12px] uppercase tracking-[0.18em] text-white/55">
              Pile on as many as you like
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {toppings.regular.map((t) => (
                <li
                  key={t}
                  className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-[12px] text-white/90"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur">
            <h3 className="font-display text-[22px]">
              Premium <span className="text-brand">Toppings</span>
            </h3>
            <p className="mt-1 text-[12px] uppercase tracking-[0.18em] text-white/55">
              Worth the upgrade
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {toppings.premium.map((t) => (
                <li
                  key={t}
                  className="inline-flex items-center rounded-full bg-brand/20 px-3 py-1 text-[12px] text-white ring-1 ring-brand/40"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
