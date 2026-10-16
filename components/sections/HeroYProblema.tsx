import { ArrowDown } from "lucide-react";
import { PassHero } from "@/components/PassHero";

const PROBLEMAS = [
  ["El cuaderno de la entrada que nadie lee.", "Nombres a mano, letra ilegible y nada para buscar cuando hace falta."],
  ["Una llamada al departamento por cada delivery.", "El portero llama, el vecino no atiende y la visita espera en la vereda."],
  ["«¿Quién dejó pasar a quién?»", "Reclamos sin respuesta, porque no queda registro de nada."],
];

export function HeroYProblema() {
  return (
    <div className="wrap hero-grid">
      <section aria-labelledby="hero-title" className="hero-text">
        <h1 id="hero-title" className="t-display-xl max-w-[12ch] md:max-w-[14ch]">Tus visitas entran sin vueltas.</h1>
        <p className="t-lead mt-6 max-w-[38ch]">
          El vecino invita, la visita recibe su pase por WhatsApp y la portería lo valida con un escaneo. Sin cuaderno, sin llamadas, todo registrado.
        </p>
        <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
          <a className="btn btn-primary" href="#demo">Pedí una demo</a>
          <a className="btn btn-secondary" href="#como-funciona">
            Ver cómo funciona <ArrowDown className="btn-nudge" size={18} strokeWidth={2} aria-hidden />
          </a>
        </div>
      </section>

      <div className="hero-stage">
        <PassHero />
      </div>

      <section aria-labelledby="problema-title" className="problema">
        <h2 id="problema-title" className="t-display max-w-[16ch]">La entrada no tendría que ser un trámite.</h2>
        <div className="mt-8 flex flex-col gap-6 max-w-[46ch]">
          {PROBLEMAS.map(([a, b]) => (
            <p key={a} className="t-lead">
              <strong className="font-bold">{a}</strong> {b}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
