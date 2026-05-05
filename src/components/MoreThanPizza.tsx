import Image from "next/image";

export function MoreThanPizza() {
  return (
    <section className="bg-night py-20">
      <div className="mx-auto max-w-360 px-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <h2 className="font-display text-[64px] leading-16 text-white text-balance">
            We Are <span className="text-brand">More</span>
            <br />
            <span className="text-brand">Than Just Pizza</span>
          </h2>
          <p className="self-end text-right text-base leading-6 text-white/85">
            We also have strombolis, salads, hot &amp; cold subs, wings, cannolis, and a
            craft beer bar.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Top row */}
          <div className="grid grid-cols-2 gap-4">
            <Tile src="/img/bento/wings.webp" alt="Wings" className="h-143.5" />
            <Tile src="/img/bento/greek-salad.webp" alt="Greek salad" className="h-143.5" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <Tile src="/img/bento/pinwheels.webp" alt="Pinwheels" className="h-68.75" />
              <Tile src="/img/bento/house-salad.webp" alt="House salad" className="h-68.75" />
            </div>
            <Tile src="/img/bento/tiramisu.webp" alt="Tiramisu" className="h-68.75" />
          </div>
          {/* Bottom row */}
          <Tile src="/img/bento/stromboli.webp" alt="Stromboli" className="h-68.75" />
          <Tile src="/img/bento/philly.webp" alt="Philly cheesesteak" className="h-68.75" />
        </div>
      </div>
    </section>
  );
}

function Tile({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`group relative w-full overflow-hidden rounded-lg ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
    </div>
  );
}
