import sharp from "sharp";
import { readFile } from "node:fs/promises";

const icon = await readFile("public/brand/pazzit-app-icon.svg");
for (const [name, size] of [["icon-32.png", 32], ["icon-192.png", 192], ["icon-512.png", 512]]) {
  await sharp(icon, { density: 384 }).resize(size, size).png().toFile(`public/${name}`);
}
// iOS pinta de negro las esquinas transparentes: se aplana sobre el azul de marca.
await sharp(icon, { density: 384 }).resize(180, 180).flatten({ background: "#2F5BFF" }).png().toFile("public/apple-touch-icon.png");

const lockup = await readFile("public/brand/pazzit-lockup-azul.svg");
// density 600 supera el límite de píxeles de sharp (viewBox 4201x981); 150 sobra para 720px.
const logo = await sharp(lockup, { density: 150 }).resize({ width: 720 }).png().toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: "#2F5BFF" } })
  .composite([{ input: logo, gravity: "center" }])
  .png()
  .toFile("public/og.png");
console.log("íconos y og.png generados en public/");
