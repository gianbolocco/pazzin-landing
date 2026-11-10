import { SeccionTexto } from "@/components/SeccionTexto";

export function Quien() {
  return (
    <SeccionTexto
      id="quien"
      tema="navy"
      titulo="Pasó algo el sábado. ¿Quién lo dejó pasar?"
      bajada="Con Pazzit, cada ingreso queda registrado y se exporta a Excel."
      puntos={[
        ["Buscá en segundos", "Por nombre, DNI, patente o lote."],
        ["Quién invitó y quién lo dejó pasar", "El vecino que autorizó y el guardia que registró el ingreso."],
        ["El vehículo y su seguro", "Tal como estaban ese día."],
      ]}
    />
  );
}
