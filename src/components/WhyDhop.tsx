import Image from "next/image";
import { Reveal } from "./Reveal";

export function WhyDhop() {
  return (
    <section id="dhop-way" className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-360 px-6 sm:px-10 lg:px-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              The DHOP Way
            </p>
            <h2 className="mt-3 font-display text-[36px] leading-11 text-ink text-balance sm:text-[48px] sm:leading-13 lg:text-[64px] lg:leading-16">
              Best in Lee County,{" "}
              <span className="text-brand">Awesome and Delicious!</span>
            </h2>
          </div>
          <p className="self-center text-base leading-6 text-ink">
            DHOP is a Fort Myers favorite because it keeps things simple and
            consistent—fresh in-house dough, quality toppings, skilled pizza makers, and a
            relaxed spot that works for a quick slice or a full meal with friends and family.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Row 1 */}
          <BentoCard className="lg:col-span-7" theme="light">
            <SimpleIngredientsArt />
            <BentoText
              title="Simple Ingredients"
              body="Our dough is made in-house daily with simple ingredients including flour, water, yeast, and enough time for the perfect rise."
            />
          </BentoCard>

          <BentoCard className="lg:col-span-5" theme="brand">
            <Reveal
              anim="scale"
              delay={120}
              className="pointer-events-none absolute -right-6 -top-4 h-40 w-40 sm:-right-12 sm:-top-16 sm:h-70 sm:w-70"
            >
              <Image
                src="/img/why/simple-ingredients.png"
                alt="Supreme pizza"
                fill
                sizes="280px"
                className="object-contain object-top-right"
              />
            </Reveal>
            <BentoText
              title="Quality Toppings"
              body="Fresh vegetables, premium meats and cheeses create a delicious combination of flavors you can taste with every bite."
              theme="brand"
            />
          </BentoCard>

          {/* Row 2 */}
          <BentoCard className="lg:col-span-5" theme="brand">
            <Reveal
              anim="right"
              delay={80}
              className="pointer-events-none absolute -right-8 -top-4 h-40 w-48 sm:-right-20 sm:-top-20 sm:h-65 sm:w-80"
            >
              <Image
                src="/img/why/dough-makers.png"
                alt="Pizza dough and ingredients"
                fill
                sizes="320px"
                className="object-contain object-top-right"
              />
            </Reveal>
            <BentoText
              title="Highly Trained pizza makers"
              body="Professional pizza makers with training and years of hands-on experience making pizzas. Plus fast and friendly service each and every time."
              theme="brand"
            />
          </BentoCard>

          <BentoCard className="lg:col-span-7" theme="light">
            {/* Mobile + tablet: compact atmosphere image (upper-right corner) */}
            <Reveal
              anim="scale"
              delay={150}
              className="pointer-events-none absolute -right-2 -top-2 h-40 w-40 sm:-right-4 sm:-top-4 sm:h-52 sm:w-52 lg:hidden"
            >
              <Image
                src="/img/why/atmosphere.png"
                alt=""
                fill
                sizes="(max-width: 640px) 160px, 208px"
                className="object-contain object-top-right"
              />
            </Reveal>
            {/* Desktop: red circle accent with DHOP mark */}
            <Reveal
              anim="scale"
              delay={150}
              className="pointer-events-none absolute -right-10 -top-10 hidden aspect-square w-56 items-center justify-center rounded-full bg-brand lg:flex"
            >
              <Image
                src="/img/brand/dhop-logo-white.png"
                alt=""
                width={200}
                height={200}
                className="h-44 w-44 object-contain opacity-90"
              />
            </Reveal>
            {/* Desktop: full atmosphere photo bottom-anchored — feet at card bottom */}
            <Reveal
              anim="up"
              delay={280}
              className="pointer-events-none absolute bottom-0 right-2 hidden h-full w-65 lg:block"
            >
              <Image
                src="/img/why/atmosphere.png"
                alt="DHOP pizza maker"
                fill
                sizes="280px"
                className="object-contain object-bottom-right"
              />
            </Reveal>
            <BentoText
              title="Vibrant and relaxed atmosphere"
              body="Choose a window seat right on Hendry Street, a long table with family, or relax in the shade out back on the patio."
            />
          </BentoCard>
        </div>
      </div>
    </section>
  );
}

function SimpleIngredientsArt() {
  return (
    <div className="pointer-events-none absolute -top-6 right-2 h-60 w-65 origin-top-right scale-75 sm:scale-100">
      {/* Tomato slices arranged in a small composition */}
      <Reveal anim="scale" delay={60} className="absolute left-2 top-10 h-30 w-30">
        <Image src="/img/why/tomato.png" alt="" fill sizes="120px" className="object-contain" />
      </Reveal>
      <Reveal anim="scale" delay={140} className="absolute right-4 top-2 h-25 w-25">
        <Image src="/img/why/tomato.png" alt="" fill sizes="100px" className="object-contain" />
      </Reveal>
      <Reveal anim="scale" delay={220} className="absolute right-0 bottom-0 h-27.5 w-27.5">
        <Image src="/img/why/tomato.png" alt="" fill sizes="110px" className="object-contain" />
      </Reveal>
      {/* Basil leaves on top */}
      <Reveal anim="tilt" delay={320} className="absolute left-12 top-2 h-15 w-15">
        <Image src="/img/why/basil.png" alt="" fill sizes="60px" className="object-contain" />
      </Reveal>
      <Reveal
        anim="tilt"
        delay={400}
        className="absolute right-12 bottom-12 h-13.75 w-13.75 rotate-[-25deg]"
      >
        <Image src="/img/why/basil.png" alt="" fill sizes="55px" className="object-contain" />
      </Reveal>
    </div>
  );
}

function BentoCard({
  children,
  className = "",
  theme,
}: {
  children: React.ReactNode;
  className?: string;
  theme: "brand" | "light";
}) {
  const bg = theme === "brand" ? "bg-brand" : "bg-white";
  return (
    <div
      className={`relative h-68.75 overflow-hidden rounded-lg ${bg} ${className}`}
    >
      {children}
    </div>
  );
}

function BentoText({
  title,
  body,
  theme,
}: {
  title: string;
  body: string;
  theme?: "brand";
}) {
  const titleColor = theme === "brand" ? "text-white" : "text-ink";
  const bodyColor = theme === "brand" ? "text-white/95" : "text-ink-soft";
  return (
    <div className="absolute bottom-6 left-6 right-6 z-10 max-w-full sm:max-w-[55%]">
      <h3 className={`font-display text-[28px] leading-8.5 ${titleColor}`}>
        {title}
      </h3>
      <p className={`mt-2 text-[13px] leading-5 ${bodyColor}`}>{body}</p>
    </div>
  );
}
