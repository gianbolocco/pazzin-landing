"use client";
import { useState, type FormEvent } from "react";
import { ArrowRight, Check, CircleAlert } from "lucide-react";
import { submit, validateCorto, type Errors, type Fields } from "@/lib/demo";

const VACIO: Fields = { nombre: "", rol: "", lugar: "", lotes: "", contacto: "", empresa: "" };

// El pedido de demo del hero: barrio y contacto. Sin JS, el form postea directo al endpoint.
export function DemoCorta() {
  const [f, setF] = useState<Fields>(VACIO);
  const [errores, setErrores] = useState<Errors>({});
  const [estado, setEstado] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function enviar(e: FormEvent) {
    e.preventDefault();
    if (estado === "sending") return;
    const errs = validateCorto(f);
    setErrores(errs);
    if (Object.keys(errs).length) return;
    setEstado("sending");
    setEstado(await submit(f));
  }

  const campo = (k: "lugar" | "contacto") => ({
    name: k, id: `h-${k}`, value: f[k],
    onChange: (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value }),
    "aria-invalid": errores[k] ? true : undefined,
    "aria-describedby": errores[k] ? `he-${k}` : undefined,
  });

  if (estado === "ok") {
    return (
      <p role="status" className="demo-corta-ok">
        <Check size={20} strokeWidth={3} aria-hidden />Listo. Te escribimos para coordinar la demo.
      </p>
    );
  }

  return (
    <form className="demo-corta" noValidate onSubmit={enviar} action={process.env.NEXT_PUBLIC_DEMO_ENDPOINT} method="post">
      <div className="demo-corta-campo">
        <label htmlFor="h-lugar" className="sr-only">Tu barrio</label>
        <input {...campo("lugar")} placeholder="Tu barrio" autoComplete="organization" />
      </div>
      <div className="demo-corta-campo">
        <label htmlFor="h-contacto" className="sr-only">WhatsApp o mail</label>
        <input {...campo("contacto")} placeholder="WhatsApp o mail" autoComplete="off" spellCheck={false} />
      </div>
      <input type="hidden" name="origen" value="landing-hero" />
      <div className="hp" aria-hidden>
        <label htmlFor="h-website">No completar este campo</label>
        <input id="h-website" name="website" tabIndex={-1} autoComplete="off" value={f.empresa} onChange={(e) => setF({ ...f, empresa: e.target.value })} />
      </div>
      <button type="submit" className="demo-corta-btn" aria-disabled={estado === "sending" || undefined}>
        {estado === "sending" ? "Enviando…" : "Pedí una demo"}<ArrowRight size={18} strokeWidth={2.5} aria-hidden />
      </button>
      {(errores.lugar || errores.contacto || estado === "error") && (
        <p role="alert" className="demo-corta-error">
          <CircleAlert size={16} strokeWidth={2} aria-hidden />
          {estado === "error"
            ? <span>No pudimos enviarlo. Probá de nuevo en un rato.</span>
            : <span><span id="he-lugar">{errores.lugar}</span> <span id="he-contacto">{errores.contacto}</span></span>}
        </p>
      )}
    </form>
  );
}
