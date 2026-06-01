import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { MerchProduct } from "@/data/merch";

function formatPrice(price: number): string {
  return Number.isInteger(price) ? `$${price}` : `$${price.toFixed(2)}`;
}

export function MerchProductCard({ product }: { product: MerchProduct }) {
  return (
    <a
      id={`p-${product.id}`}
      href={product.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-2xl bg-white ring-1 ring-ink/5 transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(0,0,0,0.10)] hover:ring-brand/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      aria-label={`${product.name}, ${formatPrice(product.price)} — opens on Printify`}
    >
      <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-cream">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 22vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink shadow-sm">
          {formatPrice(product.price)}
        </span>
        <span className="pointer-events-none absolute inset-0 flex items-end justify-end p-3">
          <span className="inline-flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-brand text-white opacity-0 shadow-[0_6px_16px_rgba(255,25,25,0.45)] transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </span>
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-3 p-4 sm:p-5">
        <div>
          <h3 className="font-display text-[18px] leading-6 text-ink transition group-hover:text-brand sm:text-[20px] sm:leading-7">
            {product.name}
          </h3>
          <p className="mt-1 text-[13px] leading-5 text-ink-soft">
            {product.short}
          </p>
        </div>
        <span className="inline-flex items-center gap-1 text-[12px] font-semibold uppercase tracking-wider text-brand">
          View this Merchandise
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </span>
      </div>
    </a>
  );
}
