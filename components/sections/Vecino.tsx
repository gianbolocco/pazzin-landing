import { SeccionTexto } from "@/components/SeccionTexto";

export function Vecino() {
  return (
    <SeccionTexto
      id="vecino"
      tema="papel"
      titulo="Para el vecino, más simple que mandar un WhatsApp."
      bajada="Desde el celular, sin instalar nada."
      puntos={[
        ["Contactos y delivery", "Los de siempre se invitan en dos toques; el delivery, en uno."],
        ["Aviso de paquetes", "Cuando llega uno a la garita, le aparece en el celular."],
        ["La visita no se pierde", "El pase trae el plano con el lote marcado."],
      ]}
    />
  );
}
