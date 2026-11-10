import { FileDown } from "lucide-react";
import { Escena } from "@/components/Escena";
import { PaseVivo } from "@/components/PaseVivo";
import { DemoCorta } from "@/components/DemoCorta";

export function Hero() {
  return (
    <Escena modo="salida" aria-labelledby="hero-title" className="hero">
      <div className="hero-fondo" aria-hidden />
      <div className="hero-texto">
        <h1 id="hero-title" className="hero-titulo">La barrera de tu barrio, <em>en&nbsp;orden.</em></h1>
        <p className="hero-bajada">
          Invitaciones con QR, reglas claras para proveedores, seguros controlados en la barrera y el registro de cada ingreso.
        </p>
        <DemoCorta />
        <a className="hero-brochure" href="/pazzit-brochure.pdf" download>
          <FileDown size={18} strokeWidth={2.25} aria-hidden />Descargá el brochure <span>(PDF)</span>
        </a>
      </div>
      <div className="hero-pase"><PaseVivo /></div>
      <div className="hero-pie">
        <p>Control de acceso para barrios cerrados.</p>
        <p>Probalo gratis 30 días</p>
      </div>
    </Escena>
  );
}
