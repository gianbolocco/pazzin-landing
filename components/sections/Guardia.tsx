import { SeccionTexto } from "@/components/SeccionTexto";
import { Horas } from "@/components/Horas";

export function Guardia() {
  return (
    <SeccionTexto
      id="guardia"
      tema="navy"
      titulo="Una llamada por cada visita. Y el vecino no atiende."
      bajada="Con Pazzit, la guardia trabaja con una sola pantalla."
      puntos={[
        ["QR y DNI con la lectora", "El veredicto aparece al instante. También anda con la cámara."],
        ["Sin invitación, igual en orden", "El alta exprés registra al que llega sin aviso."],
        ["Quién está adentro", "Siempre a la vista, y marcado el que se pasa del tiempo."],
      ]}
    >
      <div id="horas" className="sec-ancho horas-bloque">
        <h2 className="sec-titulo">Hacé la cuenta con tu barrio.</h2>
        <p className="sec-bajada">Unos 2 minutos por ingreso con llamada y cuaderno; unos 15 segundos con Pazzit.</p>
        <Horas />
      </div>
    </SeccionTexto>
  );
}
