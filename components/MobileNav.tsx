"use client";
import { useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

// <details> abre y cierra sin JS; el JS suma Escape, clic afuera y cierre al elegir un link.
export function MobileNav({ links }: { links: { href: string; label: string }[] }) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && d.open) { d.open = false; d.querySelector("summary")?.focus(); }
    };
    const onClick = (e: MouseEvent) => { if (d.open && !d.contains(e.target as Node)) d.open = false; };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("click", onClick); };
  }, []);

  const close = () => { if (ref.current) ref.current.open = false; };

  return (
    <details ref={ref} className="mnav lg:hidden">
      <summary className="icon-btn" aria-label="Menú">
        <Menu className="i-open" size={24} strokeWidth={2} aria-hidden />
        <X className="i-close" size={24} strokeWidth={2} aria-hidden />
      </summary>
      <div className="mnav-panel">
        <nav aria-label="Principal">
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={close} className="mnav-link">{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#demo" onClick={close} className="btn btn-primary w-full mt-4">Pedí una demo</a>
      </div>
    </details>
  );
}
