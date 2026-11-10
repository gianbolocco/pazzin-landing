import { SeccionTexto } from "@/components/SeccionTexto";

export function Admin() {
  return (
    <SeccionTexto
      id="admin"
      tema="navy"
      titulo="La administración, con todo a la vista."
      bajada="Todo el barrio en un solo lugar, sin planillas ni grupos de WhatsApp."
      puntos={[
        ["Tablero del día", "Ingresos, quién está adentro y las alertas."],
        ["Una cuenta para cada uno", "Vecinos y guardias, cada uno con su usuario."],
        ["Con la identidad de tu barrio", "Su nombre, logo y color en la app y en cada pase."],
      ]}
    />
  );
}
