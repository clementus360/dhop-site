"use client";

import { useRef, useState } from "react";

const FAQ_ITEMS = [
  {
    q: "Do you offer gluten-free or vegan options?",
    a: "Yes — we have gluten-free crust available on most pizzas, and our garlic & oil base with fresh vegetables makes a great vegan option.",
  },
  {
    q: "Can I order online for delivery or pickup?",
    a: "Absolutely. Order online and pick up in-store, or get it delivered within our 3-mile radius. Extended delivery is available through 3rd party services.",
  },
  {
    q: "Do you cater large events?",
    a: "Yes. From office lunches to wedding rehearsals, our catering team will work with you on a menu that fits your group, your budget, and your schedule.",
  },
  {
    q: "What are your hours?",
    a: "Open Monday–Tuesday 10am–10pm, Wednesday–Thursday 10am–1am, and Friday–Sunday 10am–2am.",
  },
  {
    q: "Where are you located?",
    a: "1520 Hendry Street, Fort Myers, FL 33901 — right in the heart of downtown.",
  },
];

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-night py-24">
      <div className="mx-auto max-w-[1440px] px-10">
        <h2 className="text-center font-display text-[40px] leading-[44px] text-white">
          Frequently Asked <span className="text-brand">Questions</span>
        </h2>

        <div className="mx-auto mt-12 max-w-[876px] rounded-[12px] border border-brand/40 p-4 md:p-6">
          <ul className="divide-y divide-white/10">
            {FAQ_ITEMS.map((item, i) => (
              <FaqRow
                key={item.q}
                index={i}
                question={item.q}
                answer={item.a}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function FaqRow({
  index,
  question,
  answer,
  isOpen,
  onToggle,
}: {
  index: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const maxH = panelRef.current?.scrollHeight ?? 0;

  return (
    <li className="group/faq">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 rounded-md px-3 py-5 text-left transition-colors duration-200 hover:bg-white/[0.04] focus:bg-white/[0.04] focus:outline-none"
      >
        <div className="flex items-center gap-4">
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white transition-all duration-300 ${
              isOpen ? "bg-brand scale-105" : "bg-brand/85 group-hover/faq:scale-110"
            }`}
          >
            {index + 1}
          </span>
          <span className="font-display text-[22px] leading-7 text-white transition-colors duration-200 group-hover/faq:text-brand">
            {question}
          </span>
        </div>
        <span
          aria-hidden
          className={`text-2xl font-light text-brand transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <div
        className="grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="min-h-0">
          <p
            ref={panelRef}
            className="max-w-[700px] px-3 pb-5 pt-1 text-[13px] leading-5 text-white/75"
            style={{ maxHeight: isOpen ? maxH || 200 : 0 }}
          >
            {answer}
          </p>
        </div>
      </div>
    </li>
  );
}
