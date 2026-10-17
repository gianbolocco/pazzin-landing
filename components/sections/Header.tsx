import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MobileNav } from "@/components/MobileNav";

export const NAV_LINKS = [
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#para-quien", label: "Para quién" },
  { href: "#seguridad", label: "Seguridad" },
  { href: "#preguntas", label: "Preguntas" },
];

export function Header() {
  return (
    <header className="site-header">
      <a href="#contenido" className="skip">Saltar al contenido</a>
      <div className="wrap flex items-center gap-4" style={{ height: "var(--header-h)" }}>
        <a href="#top" aria-label="Pazzit, inicio" className="shrink-0 rounded-sm">
          <Logo width={112} alt="" />
        </a>
        <nav aria-label="Principal" className="hidden lg:block ml-auto">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.href}><a href={l.href} className="nav-link">{l.label}</a></li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto lg:ml-2 flex items-center gap-1">
          <ThemeToggle />
          <a href="#demo" className="btn btn-primary btn-sm hidden min-[420px]:inline-flex ml-1">Pedí una demo</a>
          <MobileNav links={NAV_LINKS} />
        </div>
      </div>
    </header>
  );
}
