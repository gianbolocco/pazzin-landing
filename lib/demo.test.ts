import { test } from "node:test";
import assert from "node:assert/strict";
import { validate, submit, type Fields } from "./demo.ts";

const ok: Fields = { nombre: "Ana Ruiz", rol: "administrador", lugar: "Torre Sol", unidades: "40", contacto: "ana@mail.com", empresa: "" };

test("un formulario completo no tiene errores", () => {
  assert.deepEqual(validate(ok), {});
});

test("marca cada requerido vacío con su mensaje", () => {
  const e = validate({ nombre: "  ", rol: "", lugar: "", unidades: "", contacto: "", empresa: "" });
  assert.deepEqual(Object.keys(e).sort(), ["contacto", "lugar", "nombre", "rol"]);
  assert.equal(e.nombre, "Falta tu nombre para saber a quién escribirle.");
  assert.equal(e.rol, "Elegí qué rol tenés así te mostramos lo que te sirve.");
  assert.equal(e.lugar, "Falta el nombre del barrio o edificio.");
  assert.equal(e.contacto, "Falta tu WhatsApp o email para poder escribirte.");
});

test("acepta WhatsApp con formato argentino", () => {
  for (const c of ["+54 9 11 1234-5678", "11 1234 5678", "(011) 4555-1234"]) {
    assert.deepEqual(validate({ ...ok, contacto: c }), {}, c);
  }
});

test("rechaza contactos que no son email ni teléfono", () => {
  for (const c of ["ana@", "ana@mail", "1234", "hola", "+54 9 11 1234-5678-9999-1"]) {
    assert.equal(validate({ ...ok, contacto: c }).contacto, "Revisá el WhatsApp o el email; así no nos llega.", c);
  }
});

test("unidades es opcional, pero si está tiene que ser un entero ≥ 1", () => {
  assert.deepEqual(validate({ ...ok, unidades: "" }), {});
  for (const u of ["0", "4.5", "abc", "-3"]) {
    assert.equal(validate({ ...ok, unidades: u }).unidades, "Poné un número de unidades, por ejemplo 40.", u);
  }
});

test("rol inventado no vale", () => {
  assert.ok(validate({ ...ok, rol: "jefe" }).rol);
});

test("honeypot completo: simula éxito sin enviar", async () => {
  assert.equal(await submit({ ...ok, empresa: "spam" }, "http://127.0.0.1:9/nunca"), "ok");
});

test("sin endpoint fuera de desarrollo: error", async () => {
  assert.equal(await submit(ok, ""), "error");
});

test("endpoint caído: error, no excepción", async () => {
  assert.equal(await submit(ok, "http://127.0.0.1:9/nunca"), "error");
});
