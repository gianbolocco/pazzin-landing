import { ArrowDown } from "lucide-react";

const DOLORES = [
  ["#quien", "¿Quién lo dejó pasar?", "El cuaderno no tiene hora ni quién autorizó."],
  ["#reglas", "Reglas que no llegan a la barrera", "Las obras no trabajan en la siesta. Pero entran igual."],
  ["#seguros", "Proveedores sin seguro", "Nadie verifica la póliza en la barrera."],
  ["#guardia", "Una guardia saturada", "Llamadas que nadie atiende y autos esperando."],
] as const;

export function Dolores() {
  return (
    <section aria-labelledby="dolores-title" className="dolores">
      <div className="sec-ancho">
        <h2 id="dolores-title" className="sec-titulo">La barrera de hoy funciona a pura buena voluntad.</h2>
        <p className="sec-bajada">Papel, teléfono y WhatsApp. Alcanza hasta que hace falta saber qué pasó.</p>
        <ul className="dolores-lista">
          {DOLORES.map(([href, t, d]) => (
            <li key={href}>
              <a href={href}>
                <h3>{t}</h3>
                <p>{d}</p>
                <span className="dolores-ir">Cómo lo resuelve Pazzit <ArrowDown size={16} strokeWidth={2.5} aria-hidden /></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
