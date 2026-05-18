import Image from "next/image";
import type { MenuItem } from "@/data/menu";
import { formatPrice, getStartingPrice } from "@/data/menu";

const BADGE_LABEL: Record<NonNullable<MenuItem["badges"]>[number], string> = {
  new: "New",
  "best-seller": "Best Seller",
  "fan-favorite": "Fan Favorite",
  limited: "Limited",
};

const DIET_LABEL: Record<NonNullable<MenuItem["diet"]>[number], string> = {
  vegetarian: "V",
  vegan: "Vg",
  "gluten-free": "GF",
};

/**
 * The card has three layouts driven from data:
 *  - default: classic vertical card (image top, content below).
 *  - wide:   spans two grid columns from sm+ and uses a horizontal image-
 *            and-copy split, so the image and text never stack on top of
 *            each other on larger screens.
 *  - full:   spans the full grid row as a hero-style card, with a larger
 *            image and roomier copy for a flagship product.
 */
export function MenuItemCard({ item }: { item: MenuItem }) {
  const layout = item.layout ?? "default";

  if (layout === "default") return <DefaultCard item={item} />;
  return <WideCard item={item} variant={layout} />;
}

function DefaultCard({ item }: { item: MenuItem }) {
  const starting = getStartingPrice(item);
  const hasMultiplePrices = Boolean(
    item.sizes?.length || item.counts?.length || item.pizzaPrices
  );

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_24px_rgba(20,30,42,0.07)] ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(20,30,42,0.14)]">
      {item.image && (
        <div className="relative aspect-4/3 overflow-hidden bg-cream-2">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <CardOverlays item={item} />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <CardBody item={item} />
        <CardFooter
          starting={starting}
          hasMultiplePrices={hasMultiplePrices}
        />
      </div>
    </article>
  );
}

function WideCard({
  item,
  variant,
}: {
  item: MenuItem;
  variant: "wide" | "full";
}) {
  const starting = getStartingPrice(item);
  const hasMultiplePrices = Boolean(
    item.sizes?.length || item.counts?.length || item.pizzaPrices
  );
  const colSpan =
    variant === "full"
      ? "sm:col-span-2 lg:col-span-3 xl:col-span-4"
      : "sm:col-span-2";
  const imageWidth =
    variant === "full"
      ? "sm:w-72 md:w-96 lg:w-[28rem]"
      : "sm:w-56 lg:w-64";
  const imageHeight = variant === "full" ? "h-64 sm:h-auto" : "h-52 sm:h-auto";
  const titleClasses =
    variant === "full"
      ? "font-display text-[26px] leading-8 text-ink transition-colors duration-300 group-hover:text-brand sm:text-[32px] sm:leading-10"
      : "font-display text-[22px] leading-7 text-ink transition-colors duration-300 group-hover:text-brand sm:text-[24px]";
  const descClasses =
    variant === "full"
      ? "mt-3 max-w-150 text-[14px] leading-6 text-ink-soft sm:text-[15px]"
      : "mt-2 text-[13px] leading-5 text-ink-soft";

  return (
    <article
      className={`group relative col-span-1 flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_24px_rgba(20,30,42,0.07)] ring-1 ring-ink/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(20,30,42,0.14)] sm:flex-row ${colSpan}`}
    >
      {item.image && (
        <div
          className={`relative w-full shrink-0 overflow-hidden bg-cream-2 ${imageHeight} ${imageWidth}`}
        >
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes={
              variant === "full"
                ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                : "(max-width: 640px) 100vw, 320px"
            }
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <CardOverlays item={item} />
        </div>
      )}

      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          <h3 className={titleClasses}>{item.name}</h3>
          {item.description && (
            <p className={descClasses}>{item.description}</p>
          )}
          {item.note && (
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft/80">
              {item.note}
            </p>
          )}

          {item.pizzaPrices && <PizzaPriceList prices={item.pizzaPrices} />}
          {item.sizes && item.sizes.length > 0 && (
            <SizePills sizes={item.sizes} />
          )}
          {item.counts && item.counts.length > 0 && (
            <CountPills counts={item.counts} />
          )}
          {item.addOns && item.addOns.length > 0 && (
            <AddOnList addOns={item.addOns} max={variant === "full" ? 6 : 4} />
          )}
        </div>
        <div className="mt-5">
          <CardFooter
            starting={starting}
            hasMultiplePrices={hasMultiplePrices}
          />
        </div>
      </div>
    </article>
  );
}

function CardBody({ item }: { item: MenuItem }) {
  return (
    <>
      <h3 className="font-display text-[20px] leading-7 text-ink transition-colors duration-300 group-hover:text-brand sm:text-[22px]">
        {item.name}
      </h3>
      {item.description && (
        <p className="mt-2 text-[13px] leading-5 text-ink-soft">
          {item.description}
        </p>
      )}
      {item.note && (
        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft/80">
          {item.note}
        </p>
      )}

      {item.pizzaPrices && <PizzaPriceList prices={item.pizzaPrices} />}
      {item.sizes && item.sizes.length > 0 && <SizePills sizes={item.sizes} />}
      {item.counts && item.counts.length > 0 && <CountPills counts={item.counts} />}
      {item.addOns && item.addOns.length > 0 && (
        <AddOnList addOns={item.addOns} max={4} />
      )}
    </>
  );
}

function CardOverlays({ item }: { item: MenuItem }) {
  return (
    <>
      {item.badges && item.badges.length > 0 && (
        <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
          {item.badges.map((b) => (
            <span
              key={b}
              className="rounded-full bg-brand px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-[0_4px_10px_rgba(255,25,25,0.35)]"
            >
              {BADGE_LABEL[b]}
            </span>
          ))}
        </div>
      )}
      {item.diet && item.diet.length > 0 && (
        <div className="absolute right-4 top-4 flex gap-1.5">
          {item.diet.map((d) => (
            <span
              key={d}
              title={d}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/95 text-[10px] font-extrabold uppercase tracking-wide text-emerald-700 shadow-[0_4px_10px_rgba(20,30,42,0.12)] backdrop-blur"
            >
              {DIET_LABEL[d]}
            </span>
          ))}
        </div>
      )}
    </>
  );
}

function CardFooter({
  starting,
  hasMultiplePrices,
}: {
  starting: number | undefined;
  hasMultiplePrices: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="font-display text-2xl text-ink">
        {starting !== undefined ? (
          <>
            {hasMultiplePrices && (
              <span className="mr-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
                from
              </span>
            )}
            {formatPrice(starting)}
          </>
        ) : (
          <span className="text-[14px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
            Market price
          </span>
        )}
      </span>
      <button
        type="button"
        className="inline-flex h-10 items-center justify-center rounded-full bg-brand px-5 text-[13px] font-bold text-white transition hover:bg-brand-dark"
      >
        Add to order
      </button>
    </div>
  );
}

function SizePills({ sizes }: { sizes: NonNullable<MenuItem["sizes"]> }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-1.5">
      {sizes.map((s) => (
        <li
          key={s.size}
          className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3 py-1 text-[12px] font-semibold text-ink"
        >
          <span className="text-ink-soft">{s.size}</span>
          <span className="font-display text-[13px] text-brand">
            {formatPrice(s.price)}
          </span>
        </li>
      ))}
    </ul>
  );
}

function CountPills({ counts }: { counts: NonNullable<MenuItem["counts"]> }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-1.5">
      {counts.map((c) => (
        <li
          key={c.count}
          className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3 py-1 text-[12px] font-semibold text-ink"
        >
          <span className="text-ink-soft">{c.count} ct</span>
          <span className="font-display text-[13px] text-brand">
            {formatPrice(c.price)}
          </span>
        </li>
      ))}
    </ul>
  );
}

function AddOnList({
  addOns,
  max,
}: {
  addOns: NonNullable<MenuItem["addOns"]>;
  max: number;
}) {
  return (
    <ul className="mt-3 grid grid-cols-1 gap-1 text-[11px] text-ink-soft sm:grid-cols-2">
      {addOns.slice(0, max).map((a) => (
        <li key={a.label} className="flex items-center justify-between gap-2">
          <span className="truncate">{a.label}</span>
          <span className="font-display text-ink">+{formatPrice(a.price)}</span>
        </li>
      ))}
    </ul>
  );
}

function PizzaPriceList({
  prices,
}: {
  prices: NonNullable<MenuItem["pizzaPrices"]>;
}) {
  const sizes: Array<{ key: keyof typeof prices; label: string }> = [
    { key: "large", label: "LG" },
    { key: "xlarge", label: "XL" },
    { key: "jumbo", label: "Jumbo" },
    { key: "sicilian", label: "Sicilian" },
    { key: "glutenFree", label: "GF" },
  ];
  const visible = sizes.filter(({ key }) => typeof prices[key] === "number");
  if (visible.length === 0) return null;
  return (
    <ul className="mt-3 flex flex-wrap gap-1.5">
      {visible.map(({ key, label }) => (
        <li
          key={String(key)}
          className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3 py-1 text-[12px] font-semibold text-ink"
        >
          <span className="text-ink-soft">{label}</span>
          <span className="font-display text-[13px] text-brand">
            {formatPrice(prices[key] as number)}
          </span>
        </li>
      ))}
    </ul>
  );
}
