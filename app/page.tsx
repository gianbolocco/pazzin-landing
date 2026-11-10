import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Dolores } from "@/components/sections/Dolores";
import { ComoFunciona } from "@/components/sections/ComoFunciona";
import { Quien } from "@/components/sections/Quien";
import { Reglas } from "@/components/sections/Reglas";
import { Seguros } from "@/components/sections/Seguros";
import { Guardia } from "@/components/sections/Guardia";
import { Vecino } from "@/components/sections/Vecino";
import { Admin } from "@/components/sections/Admin";
import { PorQue } from "@/components/sections/PorQue";
import { Cierre } from "@/components/sections/Cierre";
import { Footer } from "@/components/sections/Footer";
import { Arriba } from "@/components/Arriba";
import { site } from "@/lib/site";

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Pazzit",
      url: site.url,
      logo: `${site.url}/icon-512.png`,
      sameAs: [site.youtube],
    },
    {
      "@type": "SoftwareApplication",
      name: "Pazzit",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: "Control de acceso para barrios cerrados: invitaciones con QR, horarios por rubro, seguros de proveedores y autos controlados en la barrera y el registro de cada ingreso.",
      url: site.url,
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <Header />
      <main id="contenido">
        <Hero />
        <Dolores />
        <ComoFunciona />
        <Reglas />
        <Quien />
        <Seguros />
        <Guardia />
        <Vecino />
        <Admin />
        <PorQue />
        <Cierre />
      </main>
      <Footer />
      <Arriba />
    </>
  );
}
