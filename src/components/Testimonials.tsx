import { Marquee } from "./Marquee";

const REVIEWS = [
  {
    quote:
      "Last night was the first time that I had been to Downtown House of Pizza. I grabbed two slices of their Supreme, and it was excellent, very large slices. Great toppings and plenty of them. It was an enjoyable experience.",
    name: "Wayne T",
    source: "Google Review",
  },
  {
    quote:
      "I visited Downtown House of Pizza on a whim and was pleasantly surprised by their crust—it was thin but held all the toppings perfectly. The atmosphere was cozy and welcoming, making it a great spot for a casual dinner.",
    name: "Emily R",
    source: "Yelp Review",
  },
  {
    quote:
      "The Supreme pizza here is loaded with fresh vegetables and quality meats. I really appreciated how the crust didn't get soggy at all. Will definitely come back.",
    name: "Carlos M",
    source: "TripAdvisor",
  },
  {
    quote:
      "We grabbed a few slices and a salad on lunch break and were back at our desks faster than I expected. Solid crust, generous toppings, and the staff was friendly.",
    name: "Harper L",
    source: "Google Review",
  },
  {
    quote:
      "Best New York-style slice in Fort Myers, hands down. The pepperoni cups are perfect and the dough has actual chew to it.",
    name: "Marcus J",
    source: "Yelp Review",
  },
  {
    quote:
      "Brought a group of 12 and they handled us with no fuss. Pies kept coming, the patio was perfect, and everyone left happy.",
    name: "Priya R",
    source: "TripAdvisor",
  },
];

export function Testimonials() {
  return (
    <section className="bg-cream py-20">
      <div className="mx-auto max-w-[1440px] px-10">
        <h2 className="text-center font-display text-[40px] leading-[44px] text-ink">
          What Customers Are <span className="text-brand">Saying</span>
        </h2>

        <div
          className="mt-12"
          style={{ ["--marquee-fade" as string]: "#f7f1eb" }}
        >
          <Marquee speed={60} itemClassName="px-3">
            {REVIEWS.map((r) => (
              <article
                key={r.name}
                className="flex h-[260px] w-[420px] flex-col rounded-[12px] bg-white p-7 shadow-[0_2px_10px_rgba(26,37,47,0.07)] transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(26,37,47,0.12)]"
              >
                <span aria-hidden className="font-display text-[54px] leading-none text-brand">
                  &ldquo;
                </span>
                <p className="mt-2 line-clamp-5 flex-1 text-[14px] leading-6 text-ink-soft">
                  {r.quote}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div aria-hidden className="h-11 w-11 rounded-full bg-cream-2" />
                  <div>
                    <p className="font-display text-[19px] leading-tight text-brand">
                      {r.name}
                    </p>
                    <p className="text-xs text-ink-soft">{r.source}</p>
                  </div>
                </div>
              </article>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
