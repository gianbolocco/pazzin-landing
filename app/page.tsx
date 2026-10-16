import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main id="contenido">
        <div className="wrap sec"><h1 className="t-display-xl">Tus visitas entran sin vueltas.</h1></div>
      </main>
      <Footer />
    </>
  );
}
