"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = [
  { label: "Menu", href: "#menu" },
  { label: "The DHOP Way", href: "#dhop-way" },
  { label: "Catering", href: "#catering" },
  { label: "Merchandise", href: "#merch" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-brand/95 backdrop-blur-md shadow-[0_2px_12px_rgba(0,0,0,0.18)]"
          : "bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1440px] items-center justify-between px-10 transition-all duration-300 ${
          scrolled ? "h-20" : "h-32"
        }`}
      >
        <Link href="/" className="flex items-center" aria-label="DHOP — Downtown House of Pizza">
          <Image
            src="/img/brand/dhop-logo-white.png"
            alt="DHOP"
            width={140}
            height={120}
            priority
            className={`w-auto transition-all duration-300 ${scrolled ? "h-14" : "h-20"}`}
          />
        </Link>

        <nav className="flex items-center gap-10">
          <ul className="flex items-center gap-10">
            {NAV.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-[15px] font-medium text-white/95 transition hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#order"
            className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-[15px] font-semibold text-brand transition hover:bg-cream"
          >
            Order Now
          </a>
        </nav>
      </div>
    </header>
  );
}
