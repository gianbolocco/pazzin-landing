import { site } from "@/lib/site";

export function Piloto() {
  return (
    <section id="piloto" aria-labelledby="piloto-title" className="piloto" data-inview>
      <div className="piloto-a">
        <h2 id="piloto-title" className="t-display max-w-[14ch]">Probalo gratis 30 días en un edificio.</h2>
        <p className="t-lead mt-4 max-w-[32ch]">Lo ponemos en marcha con tu portería y lo usan de verdad durante un mes.</p>
        <a className="btn btn-primary mt-8 lg:mt-auto self-start" href="#demo">Pedí el piloto</a>
        <svg className="piloto-seam piloto-seam-v" viewBox="0 0 4 100" preserveAspectRatio="none" aria-hidden><line x1="2" y1="2" x2="2" y2="98" /></svg>
        <svg className="piloto-seam piloto-seam-h" viewBox="0 0 100 4" preserveAspectRatio="none" aria-hidden><line x1="2" y1="2" x2="98" y2="2" /></svg>
      </div>
      <div className="piloto-b">
        <h3 className="t-title">Después del piloto</h3>
        <p className="mt-auto pt-10">
          <span className="t-display block break-words">{site.precio}</span>
          <span className="t-lead">por unidad por mes</span>
        </p>
        <p className="t-body mt-4 max-w-[40ch]">{site.precioIncluye}</p>
        <a className="btn btn-light mt-8 self-start" href="#demo">Pedí una demo</a>
      </div>
    </section>
  );
}
