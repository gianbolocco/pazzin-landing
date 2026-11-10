import { Check } from "lucide-react";
// QR decorativo de 21×21 módulos: tres patrones de posición y datos pseudoaleatorios fijos.
function qrPath(seed = 7) {
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

// El pase de la carátula del brochure. Datos ficticios del barrio de demostración Los Aromos.
export function Pase({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pase ${className}`}
      role="img"
      aria-label="Pase de visita de Rosa Benítez al lote 12 del barrio Los Aromos, invitada por Laura Fernández. Ingresó a las 18:42; la registró el guardia Ramón Sosa."
    >
      <div className="pase-cuerpo">
        <p className="pase-barrio">Los Aromos · Pase de visita</p>
        <p className="pase-nombre">Rosa Benítez</p>
        <p className="pase-lote">Lote 12 · invita Laura Fernández</p>
        <p className="pase-sello"><Check size={18} strokeWidth={3} aria-hidden />Ingresó 18:42 · Ramón Sosa</p>
        <span className="pase-perfo" aria-hidden />
      </div>
      <div className="pase-talon">
        <svg viewBox="0 0 21 21" shapeRendering="crispEdges" aria-hidden><path d={QR} fill="currentColor" fillRule="evenodd" /></svg>
        <span className="pase-lector" aria-hidden><i /><i /><i /><i /><b /></span>
      </div>
    </div>
  );
}
