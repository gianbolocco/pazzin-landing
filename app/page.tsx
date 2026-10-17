import { Header } from "@/components/sections/Header";
import { HeroYProblema } from "@/components/sections/HeroYProblema";
import { ComoFunciona } from "@/components/sections/ComoFunciona";
import { ParaQuien } from "@/components/sections/ParaQuien";
import { Seguridad } from "@/components/sections/Seguridad";
import { Piloto } from "@/components/sections/Piloto";
import { Preguntas } from "@/components/sections/Preguntas";
import { BandaFinal } from "@/components/sections/BandaFinal";
import { Footer } from "@/components/sections/Footer";
import { InView } from "@/components/InView";

export default function Page() {
  return (
    <>
      <Header />
      <main id="contenido">
        <HeroYProblema />
        <ComoFunciona />
        <ParaQuien />
        <Seguridad />
        <Piloto />
        <Preguntas />
        <BandaFinal />
      </main>
      <Footer />
      <InView />
    </>
  );
}
