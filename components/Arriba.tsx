"use client";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

// Vuelve al principio. Aparece recién después del hero, con un fundido, y nunca tapa el primer pantallazo.
export function Arriba() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    let raf = 0;
    const medir = () => { raf = 0; setVisible(scrollY > innerHeight * 0.9); };
    const pedir = () => { if (!raf) raf = requestAnimationFrame(medir); };
    medir();
    addEventListener("scroll", pedir, { passive: true });
    return () => { removeEventListener("scroll", pedir); cancelAnimationFrame(raf); };
  }, []);
  return (
    <a href="#top" className="arriba" data-visible={visible || undefined} aria-label="Volver al principio" tabIndex={visible ? 0 : -1}>
      <ArrowUp size={22} strokeWidth={2.5} aria-hidden />
    </a>
  );
}
