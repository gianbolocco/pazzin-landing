import { Header } from "@/components/sections/Header";
import { HeroYProblema } from "@/components/sections/HeroYProblema";
import { ComoFunciona } from "@/components/sections/ComoFunciona";
import { Footer } from "@/components/sections/Footer";
import { InView } from "@/components/InView";

export default function Page() {
  return (
    <>
      <Header />
      <main id="contenido">
        <HeroYProblema />
        <ComoFunciona />
      </main>
      <Footer />
      <InView />
    </>
  );
}
