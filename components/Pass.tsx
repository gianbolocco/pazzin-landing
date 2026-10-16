import { CalendarClock, Check, Clock } from "lucide-react";

// QR decorativo de 21×21 módulos: tres patrones de posición y datos pseudoaleatorios fijos.
export function qrPath(seed = 7) {
  let s = seed;
  const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const inFinder = (x: number, y: number) => (x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12);
  let d = "";
  for (let y = 0; y < 21; y++)
    for (let x = 0; x < 21; x++) if (!inFinder(x, y) && rnd() > 0.52) d += `M${x} ${y}h1v1h-1z`;
  for (const [fx, fy] of [[0, 0], [14, 0], [0, 14]])
    d += `M${fx} ${fy}h7v7h-7zM${fx + 1} ${fy + 1}v5h5v-5zM${fx + 2} ${fy + 2}h3v3h-3z`;
  return d;
}
const QR = qrPath();

function Qr() {
  return (
    <svg className="pass-qr" viewBox="0 0 21 21" aria-hidden shapeRendering="crispEdges">
      <path d={QR} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

type Props = { className?: string; "data-inview"?: boolean };

export function Pass({ className = "", ...rest }: Props) {
  return (
    <div
      className={`pass ${className}`}
      role="img"
      data-ui
      aria-label="Pase de visita de Juan Pérez, plomero para la unidad 4°B, sábado 18 de 10 a 12 h. Estado: validado."
      {...rest}
    >
      <div className="pass-piece pass-body-wrap">
        <div className="pass-body">
          <span className="pass-chips">
            <span className="chip chip-inv pass-chip-a"><Clock strokeWidth={2} aria-hidden />Invitado</span>
            <span className="chip chip-ok pass-chip-b"><Check strokeWidth={2.5} aria-hidden />Validado</span>
          </span>
          <span className="pass-nombre">Juan Pérez</span>
          <span className="pass-motivo">Plomero para la unidad 4°B</span>
          <span className="pass-hora"><CalendarClock size={16} strokeWidth={2} aria-hidden />Sáb 18, de 10 a 12 h</span>
        </div>
        <svg className="pass-cut" viewBox="0 0 4 100" preserveAspectRatio="none" aria-hidden>
          <line className="pass-cut-base" x1="2" y1="2" x2="2" y2="98" />
          <line className="pass-cut-on" x1="2" y1="2" x2="2" y2="98" />
        </svg>
        {/* Corte horizontal: solo en el pase vertical del escenario de escritorio. */}
        <svg className="pass-cut-h" viewBox="0 0 100 4" preserveAspectRatio="none" aria-hidden>
          <line className="pass-cut-base" x1="2" y1="2" x2="98" y2="2" />
          <line className="pass-cut-on" x1="2" y1="2" x2="98" y2="2" />
        </svg>
      </div>
      <div className="pass-piece pass-talon-wrap">
        <div className="pass-talon">
          <Qr />
          <span className="pass-talon-sol"><Qr /></span>
        </div>
      </div>
    </div>
  );
}
