import { Logo } from "@/components/Logo";
import { NAV_LINKS } from "./Header";
import { site, isSet } from "@/lib/site";

export function Footer() {
  const links = [...NAV_LINKS, { href: "#demo", label: "Pedí una demo" }];
  return (
    <footer className="grid lg:grid-cols-2">
      <div className="bg-azul grid place-items-center min-h-[44svh] lg:min-h-[640px] p-10">
        <img src="/brand/pazzit-mark-blanco.svg" alt="" width={460} height={300} className="w-[min(64%,420px)] h-auto" />
      </div>
      <div className="flex flex-col px-4 py-12 md:px-8 lg:px-16 lg:py-20">
        <Logo width={120} />
        <p className="t-body text-ink-muted mt-3">Pasá nomás.</p>
        <nav aria-label="Pie de página" className="mt-10">
          <ul className="footer-menu">
            {links.map((l) => (
              <li key={l.href}><a href={l.href} className="t-title">{l.label}</a></li>
            ))}
          </ul>
        </nav>
        <div className="grid gap-8 sm:grid-cols-2 mt-14">
          <div>
            <h2 className="t-small font-semibold text-ink-muted">Contacto</h2>
            {isSet(site.email)
              ? <a className="link t-body mt-1 inline-block" href={`mailto:${site.email}`}>{site.email}</a>
              : <p className="t-body mt-1">{site.email}</p>}
          </div>
          <div>
            <h2 className="t-small font-semibold text-ink-muted">Redes</h2>
            {site.instagramUrl
              ? <a className="link t-body mt-1 inline-block" href={site.instagramUrl}>{site.instagram}</a>
              : <p className="t-body mt-1">{site.instagram}</p>}
          </div>
        </div>
        <p className="t-caption text-ink-muted mt-auto pt-14 flex flex-wrap gap-x-4 gap-y-2">
          <span>© 2026 Pazzit</span>
          {site.terminosUrl ? <a className="link" href={site.terminosUrl}>Términos</a> : <span>Términos [COMPLETAR: URL]</span>}
          {site.privacidadUrl ? <a className="link" href={site.privacidadUrl}>Privacidad</a> : <span>Privacidad [COMPLETAR: URL]</span>}
        </p>
      </div>
    </footer>
  );
}
