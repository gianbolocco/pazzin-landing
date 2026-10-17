// Lockups como <img>: todos los SVG usan mask id="m1"; inline colisionarían.
const RATIO = 981 / 4201;

type Props = { width?: number; alt?: string; onDark?: boolean; className?: string };

export function Logo({ width = 120, alt = "Pazzit", onDark = false, className = "" }: Props) {
  const height = Math.round(width * RATIO);
  if (onDark) {
    return <img src="/brand/pazzit-lockup-oscuro.svg" alt={alt} width={width} height={height} className={className} />;
  }
  return (
    <span className={`logo ${className}`}>
      <img className="logo-claro" src="/brand/pazzit-lockup-claro.svg" alt={alt} width={width} height={height} />
      <img className="logo-oscuro" src="/brand/pazzit-lockup-oscuro.svg" alt={alt} width={width} height={height} />
    </span>
  );
}
