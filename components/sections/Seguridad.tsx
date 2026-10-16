import { Check, TimerOff } from "lucide-react";
import { site } from "@/lib/site";

const PUNTOS = [
  ["Pases con vencimiento.", "Cada pase vale solo para el horario que cargaste. Después, deja de funcionar."],
  ["Registro de cada ingreso.", "Queda anotado quién invitó, quién entró y a qué hora."],
  ["Datos tratados según la Ley 25.326.", `Tratamos los datos personales según la Ley 25.326 de Protección de Datos Personales. ${site.datosAlojamiento}`],
];

export function Seguridad() {
  return (
    <section id="seguridad" aria-labelledby="seg-title" className="seg">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 id="seg-title" className="t-display">Seguridad sin vueltas.</h2>
          <p className="t-lead mt-4 max-w-[34ch]">Cuidamos el acceso a tu edificio y los datos de quienes entran.</p>
          <div className="venc app mt-8" data-ui data-inview aria-hidden>
            <p className="app-label">Pase de Fumigación · SUM</p>
            <p className="app-title">Sáb 18, de 8 a 9 h</p>
            <span className="venc-chips mt-3">
              <span className="chip chip-ok venc-a"><Check strokeWidth={2.5} />Válido</span>
              <span className="chip chip-stop venc-b"><TimerOff strokeWidth={2} />Vencido</span>
            </span>
            <p className="t-small text-ink-muted mt-3">Pasadas las 9 h, el QR ya no sirve para entrar.</p>
          </div>
        </div>
        <dl className="lg:col-span-7 flex flex-col gap-8 lg:pt-3">
          {PUNTOS.map(([t, d]) => (
            <div key={t}>
              <dt className="t-title">{t}</dt>
              <dd className="t-lead mt-2 max-w-[48ch]">{d}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
