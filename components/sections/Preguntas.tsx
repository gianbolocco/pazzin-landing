import { ChevronDown } from "lucide-react";
import { site } from "@/lib/site";

const FAQ = [
  ["¿La visita tiene que instalar algo?", "No. Recibe el pase por WhatsApp y lo muestra en la entrada. Solo necesita un celular con WhatsApp."],
  ["¿Qué pasa si se corta internet en la entrada?", site.faq.offline],
  ["¿Cómo se carga a los vecinos?", site.faq.altaVecinos],
  ["¿Qué datos se guardan y por cuánto tiempo?", `Guardamos lo necesario para registrar cada ingreso: nombre de la visita, unidad, horario y quién la invitó. ${site.faq.retencion}. Los datos se tratan según la Ley 25.326.`],
  ["¿Cuánto tarda la implementación?", site.faq.implementacion],
];

export function Preguntas() {
  return (
    <section id="preguntas" aria-labelledby="faq-title" className="wrap sec grid gap-8 lg:grid-cols-12">
      <h2 id="faq-title" className="t-display lg:col-span-4 max-w-[12ch]">Preguntas frecuentes.</h2>
      <div className="lg:col-span-8 flex flex-col gap-2">
        {FAQ.map(([q, a]) => (
          <details key={q} name="faq" className="faq">
            <summary>
              <h3 className="t-heading">{q}</h3>
              <ChevronDown className="faq-chev" size={22} strokeWidth={2} aria-hidden />
            </summary>
            <p className="faq-a t-body">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
