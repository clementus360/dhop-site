"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type Anim = "up" | "scale" | "right" | "tilt";

export function Reveal({
  children,
  anim = "up",
  delay = 0,
  className = "",
  as: Tag = "div",
  threshold = 0.18,
  once = true,
}: {
  children: ReactNode;
  anim?: Anim;
  delay?: number;
  className?: string;
  as?: ElementType;
  threshold?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) io.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [once, threshold]);

  const Component = Tag;
  return (
    <Component
      ref={ref}
      data-anim={anim}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
      className={`reveal ${inView ? "in-view" : ""} ${className}`}
    >
      {children}
    </Component>
  );
}
