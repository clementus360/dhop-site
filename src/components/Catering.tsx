import Image from "next/image";
import Link from "next/link";
import { Phone, Utensils, Users, CalendarCheck } from "lucide-react";
import { Reveal } from "./Reveal";

const PERKS = [
  {
    Icon: Users,
    title: "Built for a crowd",
    body: "Pizzas, strombolis, wings, salads and dessert trays — scaled to feed the team, the office or the whole block.",
  },
  {
    Icon: CalendarCheck,
    title: "Plan ahead with us",
    body: "Give us a call and we'll build the order with you. Lead times depend on size, but we'll lock it in.",
  },
  {
    Icon: Utensils,
    title: "Same hand-tossed pies",
    body: "Same dough, same skill — just more of it. Catering doesn't mean shortcuts at DHOP.",
  },
];

export function Catering() {
  return (
    <section id="catering" className="relative overflow-hidden bg-cream py-16 sm:py-24">
      <div className="mx-auto max-w-360 px-6 sm:px-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Copy */}
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
              Catering
            </p>
            <h2 className="mt-3 font-display text-[36px] leading-11 text-ink text-balance sm:text-[48px] sm:leading-13 lg:text-[60px] lg:leading-16">
              Feed the Office, the Team
              <br />
              <span className="text-brand">or the Whole Block.</span>
            </h2>
            <p className="mt-5 max-w-150 text-base leading-7 text-ink-soft">
              Hand-tossed pizzas, fresh-tossed salads, hot strombolis, wings and trays
              of dessert — all made the DHOP way, just in bigger numbers. Give us a
              call and we&apos;ll build the menu with you.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="tel:+12393373467"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand px-7 text-[15px] font-bold text-white shadow-[0_8px_18px_rgba(255,25,25,0.35)] transition hover:bg-brand-dark"
              >
                <Phone className="h-4 w-4" aria-hidden />
                Call 239-337-3467
              </a>
              <Link
                href="/menu#catering"
                className="inline-flex h-12 items-center justify-center rounded-full border-2 border-ink px-7 text-[15px] font-bold text-ink transition hover:bg-ink hover:text-white"
              >
                See catering items
              </Link>
            </div>

            <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {PERKS.map(({ Icon, title, body }) => (
                <li
                  key={title}
                  className="rounded-2xl bg-white p-5 shadow-[0_8px_24px_rgba(20,30,42,0.07)] ring-1 ring-ink/5"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-3 font-display text-[20px] leading-7 text-ink">
                    {title}
                  </h3>
                  <p className="mt-1 text-[13px] leading-5 text-ink-soft">{body}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual */}
          <div className="relative lg:col-span-5">
            <div className="relative mx-auto aspect-square w-full max-w-130">
              <Reveal
                anim="scale"
                className="absolute inset-0 flex items-center justify-center rounded-full bg-brand"
              >
                <Image
                  src="/img/brand/dhop-logo-white.png"
                  alt=""
                  width={400}
                  height={400}
                  className="h-72 w-72 object-contain opacity-20 sm:h-96 sm:w-96"
                />
              </Reveal>

              <Reveal
                anim="up"
                delay={160}
                className="absolute -left-2 top-4 hidden h-44 w-44 overflow-hidden rounded-2xl ring-[6px] ring-white shadow-[0_18px_36px_rgba(0,0,0,0.22)] sm:block"
              >
                <Image
                  src="/img/bento/wings.webp"
                  alt="Trays of wings"
                  fill
                  sizes="176px"
                  className="object-cover"
                />
              </Reveal>

              <Reveal
                anim="up"
                delay={240}
                className="absolute -right-2 bottom-8 hidden h-44 w-44 overflow-hidden rounded-2xl ring-[6px] ring-white shadow-[0_18px_36px_rgba(0,0,0,0.22)] sm:block"
              >
                <Image
                  src="/img/bento/pinwheels.webp"
                  alt="Pepperoni pinwheels"
                  fill
                  sizes="176px"
                  className="object-cover"
                />
              </Reveal>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
