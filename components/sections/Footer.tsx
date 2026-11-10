import { NAV_LINKS } from "./Header";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="pie">
      <div className="sec-ancho pie-grilla">
        <div>
          <img src="/brand/pazzit-lockup-oscuro.svg" alt="Pazzit" width={140} height={33} loading="lazy" />
          <p>Control de acceso para barrios cerrados.</p>
        </div>
        <nav aria-label="Pie de página">
          <ul>{NAV_LINKS.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}<li><a href="#demo">Pedí una demo</a></li></ul>
        </nav>
        <ul>
          <li><a href={site.youtube}>YouTube</a></li>
        </ul>
      </div>
      <p className="sec-ancho pie-legal"><span translate="no">© 2026 Pazzit</span> · Las pantallas muestran un barrio de ejemplo con datos ficticios.</p>
    </footer>
  );
}
