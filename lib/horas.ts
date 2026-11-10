// La cuenta de las horas de guardia que se recuperan, con los mismos supuestos que el brochure:
// un ingreso con llamada y cuaderno lleva ~2 min; con Pazzit, ~15 s; 30 días por mes.
export const ANTES_S = 120;
export const AHORA_S = 15;
export const DIAS = 30;
export const AHORRO_S = ANTES_S - AHORA_S;

export function horas(ingresosPorDia: number) {
  const minDia = Math.floor((ingresosPorDia * AHORRO_S) / 60);
  const horasMes = Math.floor((ingresosPorDia * AHORRO_S * DIAS) / 3600);
  return { minDia, horasMes, jornadas: Math.round((horasMes / 8) * 10) / 10 };
}

export function duracion(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h ? (m ? `${h} h ${m} min` : `${h} h`) : `${m} min`;
}

export const decimal = (n: number) => n.toLocaleString("es-AR", { maximumFractionDigits: 1 });
