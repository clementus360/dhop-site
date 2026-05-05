import Image from "next/image";

export function WhyDhop() {
  return (
    <section className="bg-cream py-20">
      <div className="mx-auto max-w-[1440px] px-20">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <h2 className="font-display text-[64px] leading-[64px] text-ink text-balance">
            Why Is Downtown House Of Pizza{" "}
            <span className="text-brand">Fort Myers&apos; Favorite?</span>
          </h2>
          <p className="self-center text-base leading-6 text-ink">
            Downtown House of Pizza is a Fort Myers favorite because it keeps things simple
            and consistent—fresh in-house dough, quality toppings, skilled pizza makers,
            and a relaxed spot that works for a quick slice or a full meal with friends and
            family.
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
            <div className="pointer-events-none absolute -right-12 -top-16 h-[280px] w-[280px]">
              <Image
                src="/img/why/quality-toppings.webp"
                alt="Supreme pizza"
                fill
                sizes="280px"
                className="object-contain object-right-top"
              />
            </div>
            <BentoText
              title="Quality Toppings"
              body="Fresh vegetables, premium meats and cheeses create a delicious combination of flavors you can taste with every bite."
              theme="brand"
            />
          </BentoCard>

          {/* Row 2 */}
          <BentoCard className="lg:col-span-5" theme="brand">
            <div className="pointer-events-none absolute -right-10 -top-12 h-[260px] w-[320px]">
              <Image
                src="/img/why/dough-makers.png"
                alt="Pizza dough and ingredients"
                fill
                sizes="320px"
                className="object-contain object-right-top"
              />
            </div>
            <BentoText
              title="Highly Trained pizza makers"
              body="Professional pizza makers with training and years of hands-on experience making pizzas. Plus fast and friendly service each and every time."
              theme="brand"
            />
          </BentoCard>

          <BentoCard className="lg:col-span-7" theme="light">
            <div className="pointer-events-none absolute right-4 -top-10 h-[320px] w-[320px]">
              <div className="absolute right-2 top-4 aspect-square w-[260px] rounded-full bg-brand" />
              <div className="relative h-full w-full">
                <Image
                  src="/img/why/atmosphere.png"
                  alt="DHOP pizza maker"
                  fill
                  sizes="320px"
                  className="object-contain object-right-bottom"
                />
              </div>
            </div>
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
    <div className="pointer-events-none absolute -top-6 right-2 h-[240px] w-[260px]">
      {/* Tomato slices arranged in a small composition */}
      <div className="absolute left-2 top-10 h-[120px] w-[120px]">
        <Image src="/img/why/tomato.png" alt="" fill sizes="120px" className="object-contain" />
      </div>
      <div className="absolute right-4 top-2 h-[100px] w-[100px]">
        <Image src="/img/why/tomato.png" alt="" fill sizes="100px" className="object-contain" />
      </div>
      <div className="absolute right-0 bottom-0 h-[110px] w-[110px]">
        <Image src="/img/why/tomato.png" alt="" fill sizes="110px" className="object-contain" />
      </div>
      {/* Basil leaves on top */}
      <div className="absolute left-12 top-2 h-[60px] w-[60px]">
        <Image src="/img/why/basil.png" alt="" fill sizes="60px" className="object-contain" />
      </div>
      <div className="absolute right-12 bottom-12 h-[55px] w-[55px] rotate-[-25deg]">
        <Image src="/img/why/basil.png" alt="" fill sizes="55px" className="object-contain" />
      </div>
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
      className={`relative h-[275px] overflow-hidden rounded-[8px] ${bg} ${className}`}
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
    <div className="absolute bottom-6 left-6 right-6 z-10 max-w-[55%]">
      <h3 className={`font-display text-[28px] leading-[34px] ${titleColor}`}>
        {title}
      </h3>
      <p className={`mt-2 text-[13px] leading-5 ${bodyColor}`}>{body}</p>
    </div>
  );
}
