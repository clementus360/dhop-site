import Image from "next/image";

const PIZZAS = [
  {
    name: "Pepperoni Pizza",
    description: "The No. 1 favorite pizza since 2005",
    image: "/img/pizzas/pepperoni.webp",
  },
  {
    name: "Tomato Basil Pizza",
    description: "Garlic & Oil base, Fresh Basil and Garlic, Tomatoes and Mozzarella",
    image: "/img/pizzas/tomato-basil.webp",
  },
  {
    name: "White Pizza",
    description: "Garlic & Oil base, Fresh Garlic and Oil, Ricotta and Mozzarella",
    image: "/img/pizzas/white.webp",
  },
  {
    name: "Chicken Bacon Ranch",
    description: "Sicilian style with chicken, bacon, mozzarella and ranch dressing",
    image: "/img/pizzas/chicken-bacon-ranch.webp",
  },
];

export function Favorites() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-360 px-10">
        <h2 className="text-center font-display text-[40px] leading-11 text-ink">
          Staff And Customer <span className="text-brand">Favorites</span>
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PIZZAS.map((p) => (
            <article key={p.name} className="group flex flex-col">
              <div className="relative aspect-square overflow-hidden rounded-[8px] border-b-[6px] border-transparent transition-[border-color,border-width] duration-300 group-hover:border-brand">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>
              <h3 className="mt-5 font-display text-[26px] leading-7.5 text-ink transition-colors duration-300 group-hover:text-brand">
                {p.name}
              </h3>
              <p className="mt-2 text-sm leading-5 text-ink-soft">{p.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
