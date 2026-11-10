"use client";
import { useRef, useState } from "react";
import { Pase } from "./Pase";

// Repite la secuencia del pase (escaneo, corte, sello) al pasar el mouse o tocarlo, nunca a mitad de una corrida.
// Remontar el pase con otra key reinicia las animaciones CSS sin tocar el DOM a mano.
export function PaseVivo() {
  const [vuelta, setVuelta] = useState(0);
  const corriendo = useRef(true);
  const repetir = () => {
    if (corriendo.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    corriendo.current = true;
    setVuelta((v) => v + 1);
  };
  return (
    <div
      className="pase-vivo"
      onPointerEnter={(e) => { if (e.pointerType === "mouse") repetir(); }}
      onClick={repetir}
      onAnimationEnd={(e) => { if (e.animationName === "sello") corriendo.current = false; }}
    >
      <Pase key={vuelta} className={vuelta ? "otra-vez" : ""} />
    </div>
  );
}
