"use client";
import { useEffect, useRef } from "react";
import { Pass } from "./Pass";

// La animación es CSS (.pass.is-playing). Esto solo la reinicia con hover o tap, y nunca a mitad de una corrida.
export function PassHero() {
  const ref = useRef<HTMLDivElement>(null);
  const running = useRef(true);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) running.current = false;
  }, []);

  function replay() {
    const el = ref.current?.querySelector<HTMLElement>(".pass");
    if (!el || running.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    running.current = true;
    el.classList.remove("is-playing");
    void el.offsetWidth; // fuerza reflow para que la animación arranque de nuevo
    el.classList.add("is-playing");
  }

  return (
    <div
      ref={ref}
      className="pass-hero"
      onPointerEnter={(e) => { if (e.pointerType === "mouse") replay(); }}
      onClick={replay}
      onAnimationEnd={(e) => { if (e.animationName === "pass-chip-in") running.current = false; }}
    >
      <Pass className="is-playing" data-inview />
    </div>
  );
}
