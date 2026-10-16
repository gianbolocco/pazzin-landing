import { Logo } from "@/components/Logo";

export default function Page() {
  return (
    <main className="wrap sec">
      <Logo width={160} />
      <h1 className="t-display-xl mt-8">Tus visitas entran sin vueltas.</h1>
      <a className="btn btn-primary mt-6" href="#demo">Pedí una demo</a>
    </main>
  );
}
