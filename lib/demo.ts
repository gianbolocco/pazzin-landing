export type FieldKey = "nombre" | "rol" | "lugar" | "lotes" | "contacto";
export type Fields = Record<FieldKey, string> & { empresa: string };
export type Errors = Partial<Record<FieldKey, string>>;

export const FIELD_ORDER: FieldKey[] = ["nombre", "rol", "lugar", "lotes", "contacto"];
export const ROLES = [
  { value: "comision", label: "Comisión directiva" },
  { value: "administracion", label: "Administración" },
  { value: "vecino", label: "Vecino" },
];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isContacto(c: string) {
  if (c.includes("@")) return EMAIL.test(c);
  if (!/^\+?[\d\s().-]+$/.test(c)) return false;
  const digits = c.replace(/\D/g, "").length;
  return digits >= 8 && digits <= 15;
}

export function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.nombre.trim()) e.nombre = "Falta tu nombre para saber a quién escribirle.";
  if (!ROLES.some((r) => r.value === f.rol)) e.rol = "Elegí qué rol tenés así te mostramos lo que te sirve.";
  if (!f.lugar.trim()) e.lugar = "Falta el nombre del barrio.";
  const u = f.lotes.trim();
  if (u && !/^[1-9]\d*$/.test(u)) e.lotes = "Poné la cantidad de lotes, por ejemplo 150.";
  const c = f.contacto.trim();
  if (!c) e.contacto = "Falta tu WhatsApp o email para poder escribirte.";
  else if (!isContacto(c)) e.contacto = "Revisá el WhatsApp o el email; así no nos llega.";
  return e;
}

// El pedido corto del hero: solo el barrio y cómo escribirle. El resto se pregunta al responder.
export function validateCorto(f: Fields): Errors {
  const e: Errors = {};
  if (!f.lugar.trim()) e.lugar = "Falta el nombre del barrio.";
  const c = f.contacto.trim();
  if (!c) e.contacto = "Falta tu WhatsApp o email para poder escribirte.";
  else if (!isContacto(c)) e.contacto = "Revisá el WhatsApp o el email; así no nos llega.";
  return e;
}

export async function submit(f: Fields, endpoint = process.env.NEXT_PUBLIC_DEMO_ENDPOINT): Promise<"ok" | "error"> {
  if (f.empresa) return "ok"; // honeypot: un bot completó el campo oculto
  if (!endpoint) {
    if (process.env.NODE_ENV === "development") {
      console.info("[demo] NEXT_PUBLIC_DEMO_ENDPOINT sin definir: simulo el envío", f);
      await new Promise((r) => setTimeout(r, 600));
      return "ok";
    }
    return "error";
  }
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        nombre: f.nombre.trim(),
        rol: f.rol,
        lugar: f.lugar.trim(),
        lotes: f.lotes.trim() ? Number(f.lotes) : null,
        contacto: f.contacto.trim(),
        origen: "landing",
      }),
    });
    return res.ok ? "ok" : "error";
  } catch {
    return "error";
  }
}
