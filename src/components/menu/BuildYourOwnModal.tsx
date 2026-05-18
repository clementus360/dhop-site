"use client";

import { useEffect, useMemo, useState } from "react";
import { formatPrice, type MenuData } from "@/data/menu";

type SizeId = MenuData["pizzaSizes"][number]["id"];

/**
 * Build Your Own Pizza modal.
 *
 * Pure UI — pricing data flows in via the `sizes` and `toppings` props so
 * the modal stays fully API-pluggable. When the backend menu API ships,
 * the page-level fetch swaps the data source; this component does not
 * need to change.
 */
export function BuildYourOwnModal({
  open,
  onClose,
  sizes,
  toppings,
}: {
  open: boolean;
  onClose: () => void;
  sizes: MenuData["pizzaSizes"];
  toppings: MenuData["toppings"];
}) {
  const [sizeId, setSizeId] = useState<SizeId>(sizes[0]?.id ?? "large");
  const [regular, setRegular] = useState<Set<string>>(new Set());
  const [premium, setPremium] = useState<Set<string>>(new Set());

  // Lock body scroll while open and close on Escape.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const size = useMemo(
    () => sizes.find((s) => s.id === sizeId) ?? sizes[0],
    [sizes, sizeId]
  );

  const total = useMemo(() => {
    if (!size) return 0;
    return (
      size.cheesePrice +
      regular.size * size.addRegularTopping +
      premium.size * size.addPremiumTopping
    );
  }, [size, regular, premium]);

  const toggle = (set: Set<string>, value: string) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    return next;
  };

  const reset = () => {
    setSizeId(sizes[0]?.id ?? "large");
    setRegular(new Set());
    setPremium(new Set());
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="byo-title"
      className="fixed inset-0 z-60 flex items-end justify-center sm:items-center sm:p-6"
    >
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-night/70 backdrop-blur-sm"
      />

      <div className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-white text-ink shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:rounded-3xl">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4 border-b border-ink/10 bg-cream px-6 py-4 sm:px-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
              Hand-tossed, your way
            </p>
            <h2
              id="byo-title"
              className="mt-1 font-display text-[22px] leading-7 text-ink sm:text-[26px]"
            >
              Build Your Own Pizza
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink ring-1 ring-ink/10 transition hover:bg-cream-2"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
          <Step number={1} title="Pick a size">
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
              {sizes.map((s) => {
                const selected = s.id === sizeId;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => setSizeId(s.id)}
                      aria-pressed={selected}
                      className={`flex h-full w-full flex-col items-start gap-1 rounded-2xl border-2 p-3 text-left transition ${
                        selected
                          ? "border-brand bg-brand/5 shadow-[0_8px_18px_rgba(255,25,25,0.18)]"
                          : "border-ink/10 bg-white hover:border-ink/30"
                      }`}
                    >
                      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-ink-soft">
                        {s.dims}
                      </span>
                      <span className="font-display text-[16px] leading-5 text-ink">
                        {s.label}
                      </span>
                      <span className="font-display text-[18px] text-brand">
                        {formatPrice(s.cheesePrice)}
                      </span>
                      <span className="text-[10px] text-ink-soft">
                        +{formatPrice(s.addRegularTopping)} reg · +{formatPrice(s.addPremiumTopping)} prem
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Step>

          <Step number={2} title="Regular toppings" subtitle={`+${size ? formatPrice(size.addRegularTopping) : "—"} each`}>
            <ToppingPicker
              options={toppings.regular}
              selected={regular}
              onToggle={(v) => setRegular((s) => toggle(s, v))}
              tone="regular"
            />
          </Step>

          <Step number={3} title="Premium toppings" subtitle={`+${size ? formatPrice(size.addPremiumTopping) : "—"} each`}>
            <ToppingPicker
              options={toppings.premium}
              selected={premium}
              onToggle={(v) => setPremium((s) => toggle(s, v))}
              tone="premium"
            />
          </Step>
        </div>

        {/* Sticky footer */}
        <div className="sticky bottom-0 flex flex-col items-stretch gap-3 border-t border-ink/10 bg-white px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-baseline gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-soft">
              Total
            </span>
            <span className="font-display text-3xl text-ink">{formatPrice(total)}</span>
            <span className="text-[11px] text-ink-soft">
              {regular.size + premium.size} topping{regular.size + premium.size === 1 ? "" : "s"}
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={reset}
              className="inline-flex h-11 items-center justify-center rounded-full border border-ink/15 px-4 text-[13px] font-semibold text-ink transition hover:bg-cream"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-brand px-6 text-[14px] font-bold text-white shadow-[0_8px_18px_rgba(255,25,25,0.32)] transition hover:bg-brand-dark sm:flex-none"
            >
              Add to order · {formatPrice(total)}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

function Step({
  number,
  title,
  subtitle,
  children,
}: {
  number: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8 last:mb-0">
      <div className="flex items-baseline gap-3">
        <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-[12px] font-bold text-white">
          {number}
        </span>
        <h3 className="font-display text-[20px] leading-6 text-ink">{title}</h3>
        {subtitle && (
          <span className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
            {subtitle}
          </span>
        )}
      </div>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function ToppingPicker({
  options,
  selected,
  onToggle,
  tone,
}: {
  options: string[];
  selected: Set<string>;
  onToggle: (value: string) => void;
  tone: "regular" | "premium";
}) {
  return (
    <ul className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isOn = selected.has(option);
        const offClasses =
          tone === "premium"
            ? "border-brand/30 bg-white text-ink hover:border-brand/60"
            : "border-ink/15 bg-white text-ink hover:border-ink/30";
        const onClasses =
          tone === "premium"
            ? "border-brand bg-brand text-white shadow-[0_6px_14px_rgba(255,25,25,0.28)]"
            : "border-ink bg-ink text-white shadow-[0_6px_14px_rgba(20,30,42,0.18)]";
        return (
          <li key={option}>
            <button
              type="button"
              onClick={() => onToggle(option)}
              aria-pressed={isOn}
              className={`inline-flex h-9 items-center gap-1.5 rounded-full border-2 px-3.5 text-[12px] font-semibold transition ${
                isOn ? onClasses : offClasses
              }`}
            >
              <span
                aria-hidden
                className={`inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border ${
                  isOn ? "border-white bg-white/20" : "border-ink/30"
                }`}
              >
                {isOn && (
                  <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                )}
              </span>
              {option}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
