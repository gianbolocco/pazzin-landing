"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check, CircleAlert } from "lucide-react";
import { FIELD_ORDER, ROLES, submit, validate, type Errors, type FieldKey, type Fields } from "@/lib/demo";
import { site } from "@/lib/site";

const EMPTY: Fields = { nombre: "", rol: "", lugar: "", unidades: "", contacto: "", empresa: "" };

export function DemoForm() {
  const [f, setF] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [tried, setTried] = useState(false);
  const [summaryCount, setSummaryCount] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  function set(k: keyof Fields, v: string) {
    const next = { ...f, [k]: v };
    setF(next);
    if (tried) setErrors(validate(next));
  }
  const revalidate = () => { if (tried) setErrors(validate(f)); };

  useEffect(() => { if (status === "ok") doneRef.current?.focus(); }, [status]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setTried(true);
    const errs = validate(f);
    setErrors(errs);
    setSummaryCount(Object.keys(errs).length);
    const first = FIELD_ORDER.find((k) => errs[k]);
    if (first) { formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus(); return; }
    setStatus("sending");
    const r = await submit(f);
    setStatus(r);
  }

  const a11y = (k: FieldKey) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `e-${k}` : undefined,
  });
  const text = (k: FieldKey) => ({
    id: `f-${k}`, name: k, value: f[k], onBlur: revalidate,
    onChange: (e: { target: { value: string } }) => set(k, e.target.value), ...a11y(k),
  });
  const err = (k: FieldKey) =>
    errors[k] ? <p id={`e-${k}`} className="field-error"><CircleAlert size={16} strokeWidth={2} aria-hidden />{errors[k]}</p> : null;

  if (status === "ok") {
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className="form-done">
        <span className="form-done-ic" aria-hidden><Check size={22} strokeWidth={2.5} /></span>
        <p className="t-title text-white">Listo, te escribimos en menos de {site.plazoRespuesta}.</p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      action={process.env.NEXT_PUBLIC_DEMO_ENDPOINT}
      method="post"
      className="demo-form"
    >
      <div className="field">
        <label htmlFor="f-nombre">Tu nombre</label>
        <input {...text("nombre")} autoComplete="name" />
        {err("nombre")}
      </div>

      <fieldset className="field">
        <legend>Sos…</legend>
        <div className="rol-opts">
          {ROLES.map((r) => (
            <label key={r.value} className="rol-opt">
              <input type="radio" name="rol" value={r.value} checked={f.rol === r.value} onChange={() => set("rol", r.value)} {...a11y("rol")} />
              <span>{r.label}</span>
            </label>
          ))}
        </div>
        {err("rol")}
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-[1fr_200px]">
        <div className="field">
          <label htmlFor="f-lugar">Barrio o edificio</label>
          <input {...text("lugar")} autoComplete="organization" />
          {err("lugar")}
        </div>
        <div className="field">
          <label htmlFor="f-unidades">Unidades <span className="font-normal">(opcional)</span></label>
          <input {...text("unidades")} inputMode="numeric" autoComplete="off" />
          {err("unidades")}
        </div>
      </div>

      <div className="field">
        <label htmlFor="f-contacto">WhatsApp o email</label>
        <input {...text("contacto")} autoComplete="email" spellCheck={false} />
        {err("contacto")}
      </div>

      <div className="hp" aria-hidden>
        <label htmlFor="f-website">No completar este campo</label>
        <input id="f-website" name="website" tabIndex={-1} autoComplete="off" value={f.empresa} onChange={(e) => set("empresa", e.target.value)} />
      </div>

      {summaryCount > 0 && <p role="alert" className="form-summary">Revisá {summaryCount === 1 ? "1 campo" : `${summaryCount} campos`}.</p>}
      {status === "error" && (
        <p role="alert" className="form-summary">No pudimos enviarlo. Probá de nuevo o escribinos a {site.email}.</p>
      )}

      <button type="submit" className="btn btn-sol w-full sm:w-auto sm:px-8" style={{ minHeight: 52 }} aria-disabled={status === "sending" || undefined}>
        {status === "sending" ? "Enviando…" : "Pedí una demo"}
      </button>
      <p className="sr-only" role="status">{status === "sending" ? "Enviando…" : ""}</p>
    </form>
  );
}
