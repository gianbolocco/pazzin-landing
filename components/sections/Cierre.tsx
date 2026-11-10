import { PlayCircle } from "lucide-react";
import { DemoForm } from "@/components/DemoForm";
import { site } from "@/lib/site";

const SEMANA = [
  ["Configuramos el barrio", "Nombre, logo, color, lotes, rubros y horarios."],
  ["Cargamos a todos", "Los vecinos de cada lote y las cuentas de la guardia."],
  ["Capacitamos a la guardia", "En la misma garita. Con una hora alcanza."],
  ["Los vecinos invitan", "Les llega su acceso y empiezan a usarlo desde el celular."],
];

export function Cierre() {
  return (
    <section id="demo" aria-labelledby="demo-title" className="cierre">
      <div className="sec-ancho cierre-grilla">
        <div>
          <h2 id="demo-title" className="sec-titulo">Empezar es simple.</h2>
          <p className="sec-bajada">En una semana, tu barrio funciona con Pazzit. Y lo probás gratis 30 días.</p>
          <ol className="semana">
            {SEMANA.map(([t, d]) => <li key={t}><h3>{t}</h3><p>{d}</p></li>)}
          </ol>
          <ul className="contacto">
            <li><a href={site.youtube}><PlayCircle size={20} strokeWidth={2} aria-hidden />Mirá los videos en YouTube</a></li>
          </ul>
        </div>
        <div className="cierre-form">
          <p className="cierre-form-titulo">Pedí una demo</p>
          <p className="cierre-form-bajada">Te la mostramos con un barrio de ejemplo y te escribimos para coordinar.</p>
          <DemoForm />
        </div>
      </div>
    </section>
  );
}
