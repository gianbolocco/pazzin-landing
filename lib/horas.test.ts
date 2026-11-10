import { test } from "node:test";
import assert from "node:assert/strict";
import { horas, duracion, decimal } from "./horas.ts";

test("da los mismos números que la tabla del brochure", () => {
  assert.deepEqual(horas(30), { minDia: 52, horasMes: 26, jornadas: 3.3 });
  assert.deepEqual(horas(60), { minDia: 105, horasMes: 52, jornadas: 6.5 });
  assert.deepEqual(horas(120), { minDia: 210, horasMes: 105, jornadas: 13.1 });
});

test("escribe las duraciones como en el brochure", () => {
  assert.equal(duracion(52), "52 min");
  assert.equal(duracion(105), "1 h 45 min");
  assert.equal(duracion(120), "2 h");
  assert.equal(decimal(6.5), "6,5");
});
