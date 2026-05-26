import type { Metadata } from "next";
import { connection } from "next/server";
import { ShieldCheck, Truck, Package, ExternalLink } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MerchHero } from "@/components/merch/MerchHero";
import { MerchCatalog } from "@/components/merch/MerchCatalog";
import { MERCH_PRODUCTS, MERCH_STORE_URL } from "@/data/merch";

export const metadata: Metadata = {
  title: "Merch — DHOP · Downtown House of Pizza",
  description:
    "Official DHOP merchandise — tees, caps, tumblers, totes and more. Designed in Fort Myers, printed on demand and shipped from our trusted Printify partner.",
};

const STEPS = [
  {
    Icon: Package,
    title: "Browse the gear",
    body: "Pick the tee, cap, tumbler or tote you want. All real DHOP designs.",
  },
  {
    Icon: ShieldCheck,
    title: "Checkout securely",
    body: "Tap a product to finish on Printify — our official print and fulfillment partner.",
  },
  {
    Icon: Truck,
    title: "Made on demand",
    body: "Your order is printed fresh and shipped straight from the US to your door.",
  },
];

export default async function MerchPage() {
  await connection();

  return (
    <main className="relative bg-white">
      <Header />

      <MerchHero />

      <MerchCatalog products={MERCH_PRODUCTS} />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-360 px-6 sm:px-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
                How it works
              </p>
              <h2 className="mt-3 font-display text-[36px] leading-11 text-ink text-balance sm:text-[44px] sm:leading-12">
                Same hand-tossed
                <br />
                <span className="text-brand">brand love.</span>
              </h2>
              <p className="mt-5 max-w-150 text-[15px] leading-7 text-ink-soft">
                We design the gear, and our trusted print partner makes
                every piece on demand — no warehouses of stock, no
                guesswork. Checkout happens on their secure storefront so
                your payment and shipping are handled the right way.
              </p>
              <a
                href={MERCH_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-ink px-7 text-[14px] font-bold text-ink transition hover:bg-ink hover:text-white"
              >
                Open full Printify store
                <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
            </div>

            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-7">
              {STEPS.map(({ Icon, title, body }, idx) => (
                <li
                  key={title}
                  className="relative rounded-2xl bg-cream p-5 ring-1 ring-ink/5"
                >
                  <span className="absolute right-4 top-4 font-display text-[28px] leading-none text-ink/10">
                    0{idx + 1}
                  </span>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-3 font-display text-[20px] leading-7 text-ink">
                    {title}
                  </h3>
                  <p className="mt-1 text-[13px] leading-5 text-ink-soft">
                    {body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
