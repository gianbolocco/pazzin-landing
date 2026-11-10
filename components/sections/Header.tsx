export const NAV_LINKS = [
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#reglas", label: "Reglas" },
  { href: "#seguros", label: "Seguros" },
  { href: "#horas", label: "Horas de guardia" },
];

export function Header() {
  return (
    <header className="cab">
      <a href="#contenido" className="skip">Saltar al contenido</a>
      <a href="#top" aria-label="Pazzit, inicio" className="cab-logo">
        <img src="/brand/pazzit-lockup-oscuro.svg" alt="" width={124} height={32} />
      </a>
      <nav aria-label="Principal" className="cab-nav">
        <ul>{NAV_LINKS.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}</ul>
      </nav>
      <a href="#demo" className="cab-cta">Pedí una demo</a>
    </header>
  );
}
