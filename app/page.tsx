import { Header } from "@/components/sections/Header";
import { HeroYProblema } from "@/components/sections/HeroYProblema";
import { Footer } from "@/components/sections/Footer";
import { InView } from "@/components/InView";

export default function Page() {
  return (
    <>
      <Header />
      <main id="contenido">
        <HeroYProblema />
      </main>
      <Footer />
      <InView />
    </>
  );
}
