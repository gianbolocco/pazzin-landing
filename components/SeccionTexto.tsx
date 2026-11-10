import type { ReactNode } from "react";

// Una sección de lectura: el título a la izquierda y los puntos con filete a la derecha.
export function SeccionTexto({ id, titulo, bajada, puntos, tema, children }: {
  id: string; titulo: string; bajada: string; puntos: readonly (readonly [string, string])[]; tema: "navy" | "papel"; children?: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`texto-sec texto-${tema}`}>
      <div className="sec-ancho texto-grilla">
        <div className="texto-cab">
          <h2 id={`${id}-title`} className="sec-titulo">{titulo}</h2>
          <p className="sec-bajada">{bajada}</p>
        </div>
        <dl className="puntos puntos-col">
          {puntos.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}
        </dl>
      </div>
      {children}
    </section>
  );
}
