"use client";
import { useCallback, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useProgreso } from "@/lib/progreso";

export type Paso = { titulo: string; texto: string; media: ReactNode };

// Una escena fija mientras se scrollea: cada tramo del scroll activa un paso, su texto se ilumina
// y su captura entra cruzándose con la anterior. Sin JS se ven todos los pasos y la primera captura.
export function Pasos({ id, titulo, bajada, pasos, tema, remate, numerados = false }: {
  id: string; titulo: string; bajada?: string; pasos: Paso[]; tema: "navy" | "papel"; remate?: ReactNode; numerados?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const [activo, setActivo] = useState(0);
  const onP = useCallback((p: number) => setActivo(Math.min(pasos.length - 1, Math.floor(p * pasos.length))), [pasos.length]);
  useProgreso(ref, "fijo", onP);

  return (
    <section ref={ref} id={id} aria-labelledby={`${id}-title`} className={`pasos pasos-${tema}`} style={{ "--n": pasos.length } as CSSProperties}>
      <div className="pasos-fijo">
        <div className="pasos-texto">
          <h2 id={`${id}-title`} className="sec-titulo">{titulo}</h2>
          {bajada && <p className="sec-bajada">{bajada}</p>}
          <ol className="pasos-lista">
            {pasos.map((p, i) => (
              <li key={p.titulo} aria-current={i === activo ? "step" : undefined}>
                {numerados && <span className="pasos-num" aria-hidden>{i + 1}</span>}
                <div><h3>{p.titulo}</h3><p>{p.texto}</p></div>
              </li>
            ))}
          </ol>
          {remate}
        </div>
        <div className="pasos-escena">
          {pasos.map((p, i) => (
            <div key={p.titulo} className="pasos-media" data-activo={i === activo || undefined} data-antes={i < activo || undefined}>
              {p.media}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
