import type { ReactNode } from "react";

export function Marquee({
  children,
  speed = 40,
  className = "",
  itemClassName = "",
  pauseOnHover = true,
}: {
  children: ReactNode[];
  speed?: number;
  className?: string;
  itemClassName?: string;
  pauseOnHover?: boolean;
}) {
  return (
    <div
      className={`group/marquee relative overflow-hidden ${className}`}
      style={{ ["--marquee-duration" as string]: `${speed}s` }}
    >
      <div
        className={`flex w-max items-center animate-marquee will-change-transform ${
          pauseOnHover ? "group-hover/marquee:[animation-play-state:paused]" : ""
        }`}
      >
        {[...children, ...children].map((child, i) => (
          <div key={i} className={`shrink-0 ${itemClassName}`} aria-hidden={i >= children.length}>
            {child}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--marquee-fade,transparent)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--marquee-fade,transparent)] to-transparent" />
    </div>
  );
}
