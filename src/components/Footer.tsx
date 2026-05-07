import Image from "next/image";
import { Clock, Phone, MapPin, Bike } from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";

const NAV = [
  "Order",
  "Menu",
  "Lunch Specials",
  "Careers",
  "Catering",
  "Merchandise",
];

const HOURS = [
  { Icon: Clock, text: "Open Monday–Tuesday 10am–10pm" },
  { Icon: Clock, text: "Open Wednesday–Thursday 10am–1am" },
  { Icon: Clock, text: "Open Friday–Sunday 10am–2am" },
  { Icon: Phone, text: "239-337-3467" },
  {
    Icon: MapPin,
    text: "Pizza Delivery Radius Limited to 3 Miles. Extended delivery through 3rd party services",
  },
  { Icon: Bike, text: "Delivery Fee $3.00" },
];

const SOCIAL = [
  { Icon: FaFacebookF, label: "Facebook", href: "#" },
  { Icon: FaXTwitter, label: "X (Twitter)", href: "#" },
  { Icon: FaInstagram, label: "Instagram", href: "#" },
  { Icon: FaYoutube, label: "YouTube", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-360 px-6 py-12 sm:px-10 sm:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Image
              src="/img/brand/dhop-logo-white.png"
              alt="DHOP"
              width={140}
              height={90}
              className="h-auto w-[120px] object-contain"
            />
            <address className="mt-5 not-italic text-sm leading-6 text-white/80">
              1520 Hendry Street
              <br />
              Fort Myers, FL 33901
              <br />
              239-337-3467
            </address>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-display text-[22px] text-white">Navigation</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              {NAV.map((item) => (
                <li key={item}>
                  <a href="#" className="transition hover:text-white">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="font-display text-[22px] text-white">Hours</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/85">
              {HOURS.map((h) => (
                <li key={h.text} className="flex items-start gap-2.5">
                  <h.Icon className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
                  <span>{h.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="flex gap-3">
              {SOCIAL.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-brand hover:bg-brand hover:text-white"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </a>
              ))}
            </div>
            <p className="mt-4 text-xs text-white/70">Connect With Us</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/60 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} DHOP, Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white">Terms &amp; Conditions</a>
            <span>•</span>
            <a href="#" className="hover:text-white">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
