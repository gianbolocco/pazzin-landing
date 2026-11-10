import { SeccionTexto } from "@/components/SeccionTexto";

export function Seguros() {
  return (
    <SeccionTexto
      id="seguros"
      tema="papel"
      titulo="Un albañil sin seguro se accidenta adentro. ¿Quién responde?"
      bajada="Con Pazzit, la barrera controla el seguro del proveedor y del auto."
      puntos={[
        ["Vencido o sin cargar, no pasa", "La guardia ve la póliza y la fecha, y la renueva ahí mismo."],
        ["Lo carga el propio proveedor", "Desde el link de su invitación. Vale para todos los lotes."],
        ["Avisos antes de que venza", "El tablero muestra los que vencen pronto y los vencidos que igual entraron."],
      ]}
    />
  );
}
