import { DemoForm } from "@/components/DemoForm";

export function BandaFinal() {
  return (
    <section id="demo" aria-labelledby="demo-title" className="wrap sec">
      <div className="on-navy grid gap-10 rounded-lg bg-navy p-6 md:p-12 lg:grid-cols-12 lg:gap-16 lg:p-16">
        <div className="lg:col-span-5">
          <p aria-hidden className="font-bagel lowercase text-white leading-none" style={{ fontSize: "clamp(36px, 11vw, 76px)" }}>pasá nomás</p>
          <h2 id="demo-title" className="t-title text-white mt-6">Pedí una demo</h2>
          <p className="t-lead mt-3 max-w-[30ch]" style={{ color: "#A6B0D6" }}>Contanos de tu edificio o barrio y te escribimos.</p>
        </div>
        <div className="lg:col-span-7"><DemoForm /></div>
      </div>
    </section>
  );
}
