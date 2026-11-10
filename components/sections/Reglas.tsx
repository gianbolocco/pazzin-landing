"use client";
import { useCallback, useRef, useState } from "react";
import { useProgreso } from "@/lib/progreso";

// La escena: la franja del electricista termina a las 17. El scroll mueve el reloj de 16:57 a 17:02
// y la garita pasa de INGRESO a NO PASA. Los textos copian la pantalla real del veredicto.
const DESDE = 16 * 60 + 57;
const MINUTOS = 5;
const CIERRE = 17 * 60; // a las 17:00 todavía entra; a las 17:01, no

const PASOS = [
  ["Cada rubro, con su horario.", "Rubros con franjas por temporada, cargados una vez."],
  ["Fuera de horario, no pasa.", "La garita muestra el motivo. Sin discusiones."],
  ["Las excepciones quedan registradas.", "La guardia puede autorizar igual, y queda anotado."],
] as const;

const hora = (m: number) => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, "0")}`;

const DATOS = [["Documento", "29.654.312"], ["Tipo", "Proveedor · Electricista"], ["Lote", "Lote 55"], ["Invita", "Pablo Giménez"], ["Vigencia", "Hoy"]];

function Datos() {
  return (
    <dl className="gar-datos">
      {DATOS.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
    </dl>
  );
}

export function Reglas() {
  const ref = useRef<HTMLElement>(null);
  const [minuto, setMinuto] = useState(DESDE);
  const [paso, setPaso] = useState(0);

  const onP = useCallback((p: number) => {
    const q = Math.min(1, Math.max(0, (p - 0.1) / 0.5));
    setMinuto(DESDE + Math.min(MINUTOS, Math.floor(q * (MINUTOS + 1))));
    setPaso(p < 0.36 ? 0 : p < 0.76 ? 1 : 2);
  }, []);
  useProgreso(ref, "fijo", onP);

  const cerrado = minuto > CIERRE;
  const faltan = CIERRE - minuto;

  return (
    <section ref={ref} id="reglas" aria-labelledby="reglas-title" className="reglas" data-paso={paso} data-cerrado={cerrado || undefined}>
      <div className="reglas-fijo">
        <div className="reglas-texto">
          <h2 id="reglas-title" className="reglas-titulo">Las reglas de tu barrio, cumplidas en la barrera.</h2>
          <ol className="reglas-pasos">
            {PASOS.map(([t, d], i) => (
              <li key={t} aria-current={i === paso ? "step" : undefined}>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="reglas-escena" aria-hidden>
          <div className="franja">
            <div className="franja-cab">
              <p><strong>Electricista</strong> · lunes a viernes de 8 a 17</p>
              <p className="reloj"><span key={minuto} className="reloj-num">{hora(minuto)}</span></p>
            </div>
            <div className="franja-pista">
              <span className="franja-abierta" />
              <span className="franja-ahora" />
              <span className="franja-marca" style={{ left: "50%" }}>17:00</span>
            </div>
            <p className="franja-aviso" data-visible={!cerrado && faltan <= 1 || undefined}>
              {faltan === 0 ? "La franja cierra ahora" : "La franja cierra en 1 min"}
            </p>
          </div>

          <div className="gar">
            <div className="gar-capa gar-ingreso">
              <div className="gar-izq">
                <p className="gar-palabra">INGRESO</p>
                <p className="gar-nombre">Gustavo Lescano</p>
              </div>
              <div className="gar-der">
                <Datos />
                <p className="gar-btn gar-btn-negro">Registrar ingreso</p>
              </div>
            </div>
            <div className="gar-capa gar-nopasa">
              <div className="gar-izq">
                <p className="gar-palabra">NO PASA</p>
                <p className="gar-motivo">Fuera de horario</p>
                <p className="gar-regla">Electricista: lunes a viernes de 8 a 17 · Son las {hora(Math.max(minuto, CIERRE + 1))}</p>
                <p className="gar-nombre">Gustavo Lescano</p>
              </div>
              <div className="gar-der">
                <Datos />
                <p className="gar-btn gar-btn-claro">Volver (Esc)</p>
                <p className="gar-autorizar">Autorizar igual…</p>
              </div>
            </div>
          </div>
          <div className="gar-pie">
            <p className="gar-nota">Queda en la auditoría: quién autorizó y a qué hora.</p>
            <p className="gar-ficticio">Pantalla de la garita · datos de ejemplo</p>
          </div>
        </div>
      </div>
    </section>
  );
}
