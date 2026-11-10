// Convierte las capturas reales del brochure (barrio ficticio Los Aromos) a WebP para la landing.
// Uso: npm run capturas. Origen: ../documentacion/brochure/img/raw (se regeneran con el brochure).
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const ORIGEN = fileURLToPath(new URL("../../documentacion/brochure/img/raw/", import.meta.url));
const DESTINO = fileURLToPath(new URL("../public/capturas/", import.meta.url));
mkdirSync(DESTINO, { recursive: true });

// [nombre, ancho final, alto de recorte en px del original (opcional)]
const CEL = 600;
const WIN = 1600;
const LISTA = [
  ["vecino-nueva", CEL], ["invitado-pase", CEL], ["veredicto-pasa", WIN], ["auditoria-detalle", WIN, 1200],
];

for (const [nombre, ancho, recorte] of LISTA) {
  let img = sharp(`${ORIGEN}${nombre}.png`);
  if (recorte) {
    const { width } = await img.metadata();
    img = img.extract({ left: 0, top: 0, width, height: recorte });
  }
  const info = await img.resize({ width: ancho }).webp({ quality: 82 }).toFile(`${DESTINO}${nombre}.webp`);
  console.log(nombre, `${info.width}x${info.height}`, `${Math.round(info.size / 1024)} kB`);
}
