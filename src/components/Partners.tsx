import Image from "next/image";
import { Marquee } from "./Marquee";

const LOGOS = [
  { src: "/img/logos/fm-brewing.png", alt: "Fort Myers Brewing", w: 200 },
  { src: "/img/logos/cycle.webp", alt: "Cycle Brewing", w: 110 },
  { src: "/img/logos/miller.webp", alt: "Miller Lite", w: 110 },
  { src: "/img/logos/bud-light.webp", alt: "Bud Light", w: 130 },
  { src: "/img/logos/angry-orchard.png", alt: "Angry Orchard", w: 140 },
  { src: "/img/logos/yuengling.webp", alt: "Yuengling", w: 130 },
  { src: "/img/logos/white-claw.png", alt: "White Claw", w: 120 },
];

export function Partners() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[1440px] px-10">
        <h2 className="text-center font-display text-[40px] leading-[44px] text-ink">
          Beers <span className="text-brand">·</span> Seltzers{" "}
          <span className="text-brand">·</span> Wines
        </h2>

        <div
          className="mt-12"
          style={{ ["--marquee-fade" as string]: "#ffffff" }}
        >
          <Marquee speed={45} itemClassName="px-10">
            {LOGOS.map((l) => (
              <div
                key={l.alt}
                className="relative flex h-16 items-center justify-center grayscale opacity-80 transition hover:opacity-100 hover:grayscale-0"
                style={{ width: l.w }}
              >
                <Image
                  src={l.src}
                  alt={l.alt}
                  width={l.w}
                  height={64}
                  style={{ width: "auto", height: "auto", maxHeight: 64, maxWidth: l.w }}
                  className="object-contain"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
