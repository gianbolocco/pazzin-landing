import { Pasos } from "@/components/Pasos";
import { Captura } from "@/components/Captura";

export function ComoFunciona() {
  return (
    <Pasos
      id="como-funciona"
      tema="navy"
      numerados
      titulo="Cuatro pasos, y cada ingreso queda registrado."
      pasos={[
        { titulo: "El vecino invita", texto: "Desde el celular: visita, frecuente o proveedor.",
          media: <Captura tipo="cel" src="vecino-nueva" alt="Pantalla del vecino para crear una invitación: tipo visita, nombre del invitado y fecha." /> },
        { titulo: "La visita recibe su QR", texto: "Un link con su pase y el plano con el lote marcado.",
          media: <Captura tipo="cel" src="invitado-pase" alt="El pase de la visita en el celular: barrio Los Aromos, lote 12, el QR y cómo llegar." /> },
        { titulo: "La guardia escanea", texto: "INGRESO o NO PASA, y por qué, en un segundo.",
          media: <Captura tipo="win" src="veredicto-pasa" alt="Pantalla de la garita con el veredicto INGRESO, la nota del vecino, documento y patente." /> },
        { titulo: "Queda registrado", texto: "Quién entró, a qué hora y quién lo dejó pasar.",
          media: <Captura tipo="win" src="auditoria-detalle" alt="Detalle de un ingreso en la auditoría: proveedor, vehículo, invitación y movimientos." /> },
      ]}
    />
  );
}
