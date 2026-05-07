import Image from "next/image";

export function MoreThanPizza() {
  return (
    <section className="bg-night py-16 sm:py-20">
      <div className="mx-auto max-w-360 px-6 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              Beyond the slice
            </p>
            <h2 className="mt-3 font-display text-[36px] leading-11 text-white text-balance sm:text-[48px] sm:leading-13 lg:text-[64px] lg:leading-16">
              We Are <span className="text-brand">More</span>
              <br />
              <span className="text-brand">Than Just Pizza</span>
            </h2>
          </div>
          <p className="self-end text-right text-base leading-6 text-white/85">
            We also have strombolis, salads, hot &amp; cold subs, wings, cannolis, and a
            craft beer bar.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Top row */}
          <div className="grid grid-cols-2 gap-4">
            <Tile src="/img/bento/wings.webp" label="Wings" price="$10.99" className="h-72 sm:h-100 lg:h-143.5" />
            <Tile
              src="/img/bento/greek-salad.webp"
              label="Greek Salad"
              price="$9.49"
              className="h-72 sm:h-100 lg:h-143.5"
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <Tile
                src="/img/bento/pinwheels.webp"
                label="Pinwheels"
                price="$5.49"
                className="h-44 sm:h-60 lg:h-68.75"
              />
              <Tile
                src="/img/bento/house-salad.webp"
                label="House Salad"
                price="$8.49"
                className="h-44 sm:h-60 lg:h-68.75"
              />
            </div>
            <Tile
              src="/img/bento/tiramisu.webp"
              label="Tiramisu"
              price="$6.99"
              className="h-44 sm:h-60 lg:h-68.75"
            />
          </div>
          {/* Bottom row */}
          <Tile
            src="/img/bento/stromboli.webp"
            label="Stromboli"
            price="$11.99"
            className="h-44 sm:h-60 lg:h-68.75"
          />
          <Tile
            src="/img/bento/philly.webp"
            label="Philly Cheesesteak"
            price="$12.49"
            className="h-44 sm:h-60 lg:h-68.75"
          />
        </div>
      </div>
    </section>
  );
}

function Tile({
  src,
  label,
  price,
  className = "",
}: {
  src: string;
  label: string;
  price?: string;
  className?: string;
}) {
  return (
    <div
      className={`group relative w-full overflow-hidden rounded-2xl ring-1 ring-white/10 ${className}`}
    >
      <Image
        src={src}
        alt={label}
        fill
        sizes="(max-width: 1024px) 100vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/75 via-black/30 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
        <h3 className="font-display text-[22px] leading-7 text-white drop-shadow-sm">
          {label}
        </h3>
        {price && (
          <span className="rounded-full bg-white px-3 py-1 text-[13px] font-bold text-ink shadow-[0_4px_10px_rgba(0,0,0,0.25)]">
            {price}
          </span>
        )}
      </div>
    </div>
  );
}
