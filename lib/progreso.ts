"use client";
import { useEffect, type RefObject } from "react";

// Progreso 0→1 de un elemento según el scroll, escrito en la variable CSS --p del propio elemento.
// "salida": 0 con el elemento arriba de todo, 1 cuando terminó de salir (el hero).
// "fijo": 0 cuando el bloque llega arriba, 1 cuando su escena sticky termina (las secciones con pin).
// El scroll es nativo y el listener es pasivo: nunca se intercepta ni se frena el scroll.
export function useProgreso(ref: RefObject<HTMLElement | null>, modo: "salida" | "fijo", onP?: (p: number) => void) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Hidrató: marca .io para que el script del <head> no saque .js, y la vuelve a poner por si ya la sacó (carga lenta).
    document.documentElement.classList.add("js", "io");
    let raf = 0;
    const medir = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const recorrido = modo === "salida" ? r.height : r.height - innerHeight;
      const p = recorrido > 0 ? Math.min(1, Math.max(0, -r.top / recorrido)) : 0;
      el.style.setProperty("--p", p.toFixed(4));
      onP?.(p);
    };
    const pedir = () => { if (!raf) raf = requestAnimationFrame(medir); };
    medir();
    addEventListener("scroll", pedir, { passive: true });
    addEventListener("resize", pedir);
    return () => { removeEventListener("scroll", pedir); removeEventListener("resize", pedir); cancelAnimationFrame(raf); };
  }, [ref, modo, onP]);
}
