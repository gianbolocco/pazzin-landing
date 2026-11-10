// Una captura real de la app (barrio de demostración Los Aromos) en su marco: celular o ventana.
const MEDIDAS = { cel: [600, 1298], win: [1600, 1000] } as const;

export function Captura({ src, alt, tipo, className = "", prioridad = false }: {
  src: string; alt: string; tipo: "cel" | "win"; className?: string; prioridad?: boolean;
}) {
  const [w, h] = MEDIDAS[tipo];
  return (
    <figure className={`marco-${tipo} ${className}`}>
      {tipo === "win" && <span className="marco-barra" aria-hidden><i /><i /><i /></span>}
      <img src={`/capturas/${src}.webp`} alt={alt} width={w} height={h} loading={prioridad ? "eager" : "lazy"} decoding="async" />
    </figure>
  );
}
