import type { CSSProperties, ReactNode } from "react";
import { Bell, Check, Search } from "lucide-react";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

const REGISTRO = [
  { h: "11:15", v: "María Gómez", u: "7°C", e: "Esperando", c: "chip-wait" },
  { h: "10:40", v: "Delivery", u: "2°A", e: "Validado", c: "chip-ok" },
  { h: "10:04", v: "Juan Pérez", u: "4°B", e: "Validado", c: "chip-ok" },
  { h: "09:00", v: "Fumigación", u: "SUM", e: "Vencido", c: "chip-stop" },
];

function Registro() {
  return (
    <table className="reg" data-ui data-inview>
      <caption className="sr-only">Registro de ingresos del sábado 18 (datos de ejemplo)</caption>
      <thead>
        <tr><th scope="col">Hora</th><th scope="col">Visita</th><th scope="col">Unidad</th><th scope="col">Estado</th></tr>
      </thead>
      <tbody>
        {REGISTRO.map((r, n) => (
          <tr key={r.h} style={i(n)}>
            <td>{r.h}</td><td>{r.v}</td><td>{r.u}</td>
            <td><span className={`chip ${r.c}`}>{r.e}</span></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Busqueda() {
  return (
    <div className="srch" data-ui data-inview aria-hidden>
      <p className="srch-box"><Search size={18} strokeWidth={2} /><span className="srch-q">4°B</span></p>
      <ul className="srch-res">
        <li style={i(0)}><span>Sáb 18 · 10:04</span><span className="font-semibold">Juan Pérez</span><span className="chip chip-ok">Validado</span></li>
        <li style={i(1)}><span>Jue 16 · 19:30</span><span className="font-semibold">Laura Paz</span><span className="chip chip-ok">Validado</span></li>
      </ul>
    </div>
  );
}

function Detalle() {
  const rows = [["Ingreso", "Sáb 18, 10:04 h"], ["Visita", "Juan Pérez"], ["Autorizó", "Unidad 4°B"], ["Validó", "Portería, entrada principal"]];
  return (
    <dl className="detalle" data-ui data-inview aria-hidden>
      {rows.map(([k, v], n) => (
        <div key={k} style={i(n)}><dt>{k}</dt><dd>{v}</dd></div>
      ))}
    </dl>
  );
}

function AvisoVecino() {
  return (
    <div className="vnotif" data-ui data-inview aria-hidden>
      <div className="vnotif-card">
        <span className="vnotif-ic"><Bell size={18} strokeWidth={2} /></span>
        <div><p className="font-semibold">Juan Pérez llegó</p><p className="t-small text-ink-muted">Entrada principal · 10:04 h</p></div>
      </div>
    </div>
  );
}

function Escaneo() {
  return (
    <div className="scan" data-ui data-inview aria-hidden>
      <div className="scan-frame"><span /><span /><span /><span /></div>
      <div>
        <span className="chip chip-ok"><Check strokeWidth={2.5} />Validado</span>
        <p className="font-semibold mt-2">Juan Pérez</p>
        <p className="t-small text-ink-muted">Va a la unidad 4°B</p>
      </div>
    </div>
  );
}

function Modulo({ titulo, children, panel }: { titulo: string; children: ReactNode; panel: ReactNode }) {
  return (
    <div className="mod">
      <div className="mod-panel">{panel}</div>
      <div className="mod-text">
        <h4 className="t-heading">{titulo}</h4>
        <div className="t-body mt-2 flex flex-col gap-2">{children}</div>
      </div>
    </div>
  );
}

export function ParaQuien() {
  return (
    <section id="para-quien" aria-labelledby="pq-title" className="wrap sec">
      <h2 id="pq-title" className="t-display max-w-[18ch]">Hecho para los tres lados de la puerta.</h2>

      <div className="pq-group">
        <h3 className="t-title">Administración</h3>
        <p className="t-lead mt-2 max-w-[40ch]">Historial buscable, menos reclamos, todo en orden.</p>
        <div className="pq-mods">
          <Modulo titulo="Cada ingreso, anotado." panel={<Registro />}>
            <p>Fecha, hora, unidad y quién lo autorizó. Sin letra ilegible ni hojas arrancadas.</p>
          </Modulo>
          <Modulo titulo="Lo encontrás en segundos." panel={<Busqueda />}>
            <p>Buscás por unidad, por nombre o por día.</p>
          </Modulo>
          <Modulo titulo="Menos reclamos." panel={<Detalle />}>
            <p>Cuando alguien pregunta quién entró, tenés el dato en vez de una discusión.</p>
          </Modulo>
        </div>
      </div>

      <div className="pq-group">
        <h3 className="t-title">Vecinos</h3>
        <div className="pq-mods">
          <Modulo titulo="Invitás desde el celu y te enterás cuando llegan." panel={<AvisoVecino />}>
            <p>Sin llamadas a la portería. Tu visita no instala nada.</p>
          </Modulo>
        </div>
      </div>

      <div className="pq-group">
        <h3 className="t-title">Portería</h3>
        <div className="pq-mods">
          <Modulo titulo="Validás en un segundo, sin llamar a nadie." panel={<Escaneo />}>
            <p>Escaneás el QR y ves quién es y a dónde va. Todo queda anotado solo; chau cuaderno.</p>
          </Modulo>
        </div>
      </div>
    </section>
  );
}
