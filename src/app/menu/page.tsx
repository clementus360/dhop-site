import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getMenu } from "@/data/menu";
import { MenuExplorer } from "@/components/menu/MenuExplorer";
import { BuildYourOwnButton } from "@/components/menu/BuildYourOwn";

export const metadata: Metadata = {
  title: "Menu — DHOP · Downtown House of Pizza, Fort Myers",
  description:
    "The full DHOP menu — specialty pizzas, breakfast slices, hot subs, strombolis, calzones, wings, salads, desserts and catering. Hand-tossed in Downtown Fort Myers since 2005.",
};

export default function MenuPage() {
  const menu = getMenu();

  return (
    <main className="relative bg-white">
      <Header />

      <MenuExplorer
        menu={menu}
        buildYourOwnCta={
          <BuildYourOwnButton
            sizes={menu.pizzaSizes}
            toppings={menu.toppings}
            variant="ghost"
          >
            Build Your Own
          </BuildYourOwnButton>
        }
      />

      <section
        aria-label="Menu notes"
        className="border-t border-ink/10 bg-cream py-10"
      >
        <div className="mx-auto max-w-360 px-6 sm:px-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
            Good to know
          </p>
          <ul className="mt-3 grid gap-2 text-[12px] leading-5 text-ink-soft sm:grid-cols-2">
            {menu.notes.map((n) => (
              <li key={n} className="flex items-start gap-2">
                <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
}
