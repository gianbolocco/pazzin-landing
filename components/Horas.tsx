"use client";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { AHORA_S, ANTES_S, DIAS, decimal, duracion, horas } from "@/lib/horas";

const ATAJOS = [30, 60, 120];

// El número grande no salta: se interpola hasta el valor nuevo (sin interpolar si se pidió menos movimiento).
function useInterpolado(valor: number) {
  const [mostrado, setMostrado] = useState(valor);
  const desde = useRef(valor);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setMostrado(valor); desde.current = valor; return; }
    const inicio = performance.now();
    const de = desde.current;
    let raf = requestAnimationFrame(function paso(t) {
      const k = Math.min(1, (t - inicio) / 450);
      const v = de + (valor - de) * (1 - Math.pow(1 - k, 3));
      desde.current = v;
      setMostrado(v);
      if (k < 1) raf = requestAnimationFrame(paso);
    });
    return () => cancelAnimationFrame(raf);
  }, [valor]);
  return Math.round(mostrado);
}

export function Horas() {
  const [ingresos, setIngresos] = useState(60);
  const { minDia, horasMes, jornadas } = horas(ingresos);
  const grande = useInterpolado(horasMes);
  const id = useId();

  return (
    <div className="horas">
      <div className="horas-control">
        <label htmlFor={id} className="horas-label">Ingresos por día en tu barrio</label>
        <div className="horas-fila">
          <output htmlFor={id} className="horas-ingresos">{ingresos}</output>
          <div className="horas-atajos" role="group" aria-label="Ejemplos">
            {ATAJOS.map((n) => (
              <button key={n} type="button" aria-pressed={ingresos === n} onClick={() => setIngresos(n)}>{n}</button>
            ))}
          </div>
        </div>
        <input id={id} type="range" min={10} max={200} step={5} value={ingresos} onChange={(e) => setIngresos(Number(e.target.value))}
          style={{ "--v": (ingresos - 10) / 190 } as CSSProperties} />
      </div>

      <p className="sr-only" aria-live="polite">Con {ingresos} ingresos por día, unas {horasMes} horas de guardia por mes.</p>
      <p className="horas-resultado" aria-hidden>
        <span className="horas-num">≈ {grande} h</span>
        <span className="horas-dice">de guardia por mes que vuelven a la vigilancia. Son {decimal(jornadas)} jornadas de 8 horas.</span>
      </p>

      <p className="horas-cuenta">
        <span>{ingresos} ingresos</span><i>×</i>
        <span>1 min 45 s ahorrados</span><i>=</i>
        <span>{duracion(minDia)} por día</span><i>×</i>
        <span>{DIAS} días</span><i>≈</i>
        <strong>{horasMes} h por mes</strong>
      </p>
      <p className="horas-supuestos">
        Supuestos: unos {ANTES_S / 60} minutos por ingreso hoy (llamar al lote y anotar) y {AHORA_S} segundos con Pazzit, {DIAS} días por mes.
      </p>
    </div>
  );
}
