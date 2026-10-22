"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const arrowButton =
  "inline-flex size-10 items-center justify-center rounded-md border border-line-strong text-fg transition-[border-color,opacity,transform] duration-150 ease-out hover:border-fg/60 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-30";

// Carrusel con scroll-snap nativo: el swipe y el teclado los da el navegador, las flechas solo desplazan.
export function Carousel({
  children,
  label,
  count,
}: {
  children: ReactNode;
  label: string;
  count: number;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [state, setState] = useState({ index: 0, atStart: true, atEnd: false });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const max = track.scrollWidth - track.clientWidth;
      const slides = Array.from(track.children) as HTMLElement[];
      let index = 0;
      let best = Infinity;
      slides.forEach((slide, i) => {
        const distance = Math.abs(slide.offsetLeft - track.offsetLeft - track.scrollLeft);
        if (distance < best) {
          best = distance;
          index = i;
        }
      });
      const atEnd = track.scrollLeft >= max - 4;
      setState({
        index: atEnd ? slides.length - 1 : index,
        atStart: track.scrollLeft <= 4,
        atEnd,
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    schedule();
    track.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  function go(direction: 1 | -1) {
    const track = trackRef.current;
    const first = track?.children[0] as HTMLElement | undefined;
    if (!track || !first) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({ left: direction * (first.offsetWidth + gap), behavior: reduce ? "auto" : "smooth" });
  }

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-fg-muted">
          <span className="text-fg">{pad(state.index + 1)}</span> / {pad(count)}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            className={arrowButton}
            onClick={() => go(-1)}
            disabled={state.atStart}
            aria-label="Proyecto anterior"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            type="button"
            className={arrowButton}
            onClick={() => go(1)}
            disabled={state.atEnd}
            aria-label="Proyecto siguiente"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
      <ul
        ref={trackRef}
        aria-label={label}
        tabIndex={0}
        // relative: contiene los .sr-only (absolute) de las tarjetas; sin esto estiran la página hacia la derecha
        className="relative mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-2 [scrollbar-width:none] md:gap-6 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>
    </div>
  );
}
