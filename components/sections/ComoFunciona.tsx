"use client";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { Bell, CalendarClock, Check } from "lucide-react";

const STEPS = [
  { titulo: "Invitá", texto: "Cargás nombre y horario. Tarda 15 segundos." },
  { titulo: "Llega el pase", texto: "Tu visita lo recibe por WhatsApp. No instala nada." },
  { titulo: "Pasá nomás", texto: "En la entrada lo escanean y te avisamos que llegó." },
];

export function ComoFunciona() {
  const [step, setStep] = useState(0);
  const [nombre, setNombre] = useState("Juan Pérez");
  const inputId = useId();
  const panelsRef = useRef<HTMLDivElement>(null);
  const moveFocus = useRef(false);
  const go = (n: number) => { moveFocus.current = true; setStep(n); };
  useEffect(() => {
    if (!moveFocus.current) return;
    moveFocus.current = false;
    panelsRef.current?.querySelector<HTMLElement>("[data-active] input, [data-active] button")?.focus();
  }, [step]);
  const quien = nombre.trim() || "tu visita";
  const primer = nombre.trim().split(/\s+/)[0] || "";

  return (
    <section id="como-funciona" aria-labelledby="cf-title" className="cf">
      <div className="cf-head">
        <h2 id="cf-title" className="t-title">Cómo funciona</h2>
        <div aria-live="polite" className="mt-8">
          <p key={step} className="cf-clause t-display">
            <span className="sr-only">Paso {step + 1}: </span>
            {STEPS[step].titulo}.
          </p>
        </div>
        <p key={`t${step}`} className="cf-clause t-lead mt-4 max-w-[30ch]">{STEPS[step].texto}</p>
      </div>

      <div className="cf-stage">
        <div className="cf-panels" ref={panelsRef}>
          <div className="cf-panel app" data-ui data-active={step === 0 || undefined}>
            <p className="app-label">Nueva visita</p>
            <label htmlFor={inputId} className="app-field-label">Nombre de tu visita</label>
            <input
              id={inputId}
              className="app-input"
              value={nombre}
              maxLength={40}
              autoComplete="off"
              onChange={(e) => setNombre(e.target.value)}
            />
            <p className="app-field-label">Horario</p>
            <p className="app-fake"><CalendarClock size={18} strokeWidth={2} aria-hidden />Sáb 18, de 10 a 12 h</p>
            <p className="app-field-label">Motivo</p>
            <p className="app-fake">Plomero para la unidad 4°B</p>
            <button type="button" className="btn btn-primary w-full mt-5" onClick={() => go(1)}>Invitar</button>
          </div>

          <div className="cf-panel app" data-ui data-active={step === 1 || undefined}>
            <p className="app-label">Mensaje de Pazzit</p>
            <div className="bubble-wrap">
              <span className="typing" aria-hidden><i /><i /><i /></span>
              <div className="bubble">
                <p>Hola{primer ? ` ${primer}` : ""}, te esperan el sáb 18 de 10 a 12 h en la unidad 4°B. Este es tu pase:</p>
                <p className="bubble-pass">
                  <span className="font-semibold truncate">Pase de {quien}</span>
                  <span className="chip chip-inv">Invitado</span>
                </p>
              </div>
            </div>
            <button type="button" className="btn btn-primary w-full mt-5" onClick={() => go(2)}>Mostrarlo en la entrada</button>
          </div>

          <div className="cf-panel app" data-ui data-active={step === 2 || undefined}>
            <p className="app-label">Portería · Entrada principal</p>
            <div className="scan-ok">
              <span className="chip chip-ok"><Check strokeWidth={2.5} aria-hidden />Validado</span>
              <p className="app-title mt-3 truncate">{quien}</p>
              <p className="t-small text-ink-muted">Unidad 4°B · Sáb 18, 10:04 h</p>
            </div>
            <p className="notif"><Bell size={18} strokeWidth={2} aria-hidden /><span className="notif-text">Le avisamos a la 4°B: <strong className="font-semibold">{quien} llegó.</strong></span></p>
            <button type="button" className="btn btn-secondary w-full mt-5" onClick={() => go(0)}>Invitar a otra persona</button>
          </div>
        </div>
      </div>

      <div className="cf-controls">
        <div className="cf-range" style={{ "--p": step / 2 } as CSSProperties}>
          <span className="cf-range-fill" aria-hidden />
          <input
            type="range" min={0} max={2} step={1} value={step}
            onChange={(e) => setStep(Number(e.target.value))}
            aria-label="Paso de cómo funciona"
            aria-valuetext={`Paso ${step + 1} de 3: ${STEPS[step].titulo}`}
          />
        </div>
        <ol className="cf-steps">
          {STEPS.map((s, i) => (
            <li key={s.titulo}>
              <button type="button" className="cf-step" aria-current={i === step ? "step" : undefined} onClick={() => setStep(i)}>
                <span>{s.titulo}</span>
              </button>
              <p className="cf-step-text">{s.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
