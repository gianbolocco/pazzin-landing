# Pazzit landing — plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Landing estática de Pazzit en Next.js. Tiene que convertir administradores en pedidos de demo y explicarle el producto a un vecino en 10 segundos, con una dirección de arte propia y no de plantilla.

**Architecture:** Next.js App Router con `output: "export"`: una sola ruta `/`, Server Components por defecto y cinco islas cliente (ThemeToggle, MobileNav, PassHero, ComoFunciona, DemoForm), más un observador `InView`. Todo el movimiento es CSS (keyframes y transitions sobre transform, opacity y clip-path), disparado por clases. El JS solo reinicia la animación o marca `is-in`. Los tokens de marca son CSS variables que Tailwind v4 expone vía `@theme inline`.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, lucide-react, TypeScript 5, sharp (íconos), @playwright/test (capturas). Node 24.

**Spec:** `docs/superpowers/specs/2026-10-16-pazzit-landing-design.md`. Dirección de arte: `.taste-skill/direction.json` ("split stage", seed 1502073476).

## Cambios respecto del spec

Salen de aplicar `design-taste-frontend` (dirección "split stage" con `--keep palette,type`) y de tu pedido de que no se vea genérica y tenga buen movimiento. Mandan sobre el spec donde lo contradicen.

1. **La idea:** "En esta página, el pase de la visita se vuelve el objeto fijo del escenario". El pase vive en una mitad azul sticky mientras se lee el hero y el problema. Después, cada sección muestra un fragmento real de la interfaz (registro, búsqueda, aviso, escaneo, vencimiento) en lugar de íconos o tarjetas.
2. **La cosa viva:** en "Cómo funciona", el visitante escribe el nombre de su visita y lo ve viajar por los tres pasos: invitación, mensaje y validación en portería. Se maneja con un slider real (`<input type="range">`) y con los botones del propio fragmento.
3. **Sin Motion:** la animación de marca y todo lo demás sale con CSS. Pesa 0 kB, funciona sin JS (el estado final es el de reposo) y con reduced motion se ve directo el final. La única dependencia de UI es `lucide-react`.
4. **Nada de reglas finas, glass ni íconos-tarjeta:**
   - El header es una barra lisa, sin blur ni borde. Al scrollear sube un tono a `--surface` con una scroll-timeline, en CSS.
   - "El problema" pasa a ser una columna de párrafos con la primera frase en negrita, sin íconos.
   - Las preguntas son bloques `--surface` separados por espacio, sin divisores.
5. **Movimiento coreografiado, no fade-in genérico.** Los títulos y párrafos de las secciones no se animan. Cada fragmento de interfaz hace su pequeño ritual una vez, al entrar en pantalla:
   - las filas del registro llegan;
   - la búsqueda se tipea;
   - el aviso baja;
   - el marco de escaneo asienta;
   - el pase pasa de "Válido" a "Vencido";
   - la costura del piloto se marca.

   Los rituales suman 12 elementos en movimiento, por encima del piso de 8 del inspector. Se agregan:
   - el slider con crossfade;
   - el "escribiendo…" del mensaje;
   - la altura del acordeón;
   - el menú;
   - el toggle de tema;
   - la presión de los botones;
   - el corrimiento del menú del footer.
6. **Precio:** dos campos de color con un borde duro entre ellos ("Piloto" en azul-tint y "Después del piloto" en azul), recortados con las muescas del ticket y una costura punteada. Es el segundo y último uso del recurso ticket.
7. **El sol aparece una vez por pantalla:** el talón del pase (hero), el pulgar del slider (cómo funciona) y el botón del formulario (banda final). El número del paso 3 ya no es sol.
8. **Footer:** dos mitades. A la izquierda, un campo azul con el isotipo blanco grande. A la derecha, el menú en tamaño title, contacto, redes y legales.
9. **Prueba social:** sin logos ni nombres reales no hay sección, ni siquiera con placeholder. Se quita `socialProof`.
10. **Caption de 13px** (el brief dice 12): manda la regla de la skill, que no permite menos de 13px.
11. **Imágenes:** el brief prohíbe stock y no hay fotos propias. Las "fotos" de la dirección son fragmentos de la interfaz en HTML (`data-ui`). El inspector puede marcar el piso de 4 fotos: se acepta con `--allow`, y se informa.
12. **H1 en móvil:** el brief fija 40px. A 360px, "Tus visitas entran sin vueltas." ocupa 3 líneas. Se acepta como WARN defendido (titular y tamaño fijados por la marca).

## Global Constraints

- Idioma: español rioplatense con voseo, sentence case. La marca se escribe "Pazzit". Eslogan: "Pasá nomás."
- Nada inventado: métricas, testimonios, logos de clientes, premios o prensa. Lo que falta es `[PLACEHOLDER]` y vive en `lib/site.ts`.
- Colores: solo desde tokens (`var(--…)` o las utilidades `bg-azul`, `text-ink`, etc.). Verde, ámbar y rojo solo para estados y siempre con su palabra. Texto sobre sol, siempre navy.
- Onest para todo. Bagel Fat One solo en "pasá nomás" de la banda final.
- Radios: 8px (inputs, chips), 14px (botones, tarjetas), 24px (pase, bloques destacados).
- Sombra solo en el pase: `drop-shadow(0 14px 16px rgba(11,22,64,.14))`. Con `filter` se respeta la forma con muescas; equivale a `0 14px 32px` en box-shadow.
- Movimiento: solo `transform`, `opacity` y `clip-path`. Hover entre 150 y 250 ms. Todo dentro de `@media (prefers-reduced-motion: no-preference)`. El estado de reposo es el final.
- Accesibilidad:
  - foco `2px var(--focus)` con offset de 2px;
  - áreas táctiles de 44px o más;
  - labels reales;
  - un único `h1`;
  - sin scroll horizontal desde 320px.
- Logos siempre como `<img src="/brand/…">`, nunca inline, porque todos usan `mask id="m1"`. El lockup mide 100px de ancho o más.
- Íconos lucide con `strokeWidth={2}` y `aria-hidden`. Sin emojis.
- Repo: todavía no existe. Los pasos "Commit" corren solo si el repo ya está creado; si no, se saltean.

## Mapa de archivos

```
package.json, tsconfig.json, next.config.mjs, postcss.config.mjs, .gitignore
app/layout.tsx            fuentes, metadata, script de tema
app/page.tsx              compone la página
app/globals.css           tokens, tipografía, botones, pase, rituales, secciones
lib/site.ts               placeholders
lib/demo.ts               validate() + submit()
lib/demo.test.ts          node:test
components/Logo.tsx
components/Pass.tsx       pase (markup) + QR
components/PassHero.tsx   cliente: replay de la animación
components/InView.tsx     cliente: IntersectionObserver → .is-in
components/ThemeToggle.tsx
components/MobileNav.tsx
components/DemoForm.tsx
components/sections/{Header,HeroYProblema,ComoFunciona,ParaQuien,Seguridad,Piloto,Preguntas,BandaFinal,Footer}.tsx
scripts/serve.mjs         servidor estático de out/
scripts/icons.mjs         favicons, apple-touch-icon y OG
scripts/shots.mjs         capturas + chequeo de overflow
public/brand/*.svg        copia sin tocar del zip
README.md
```

---

### Task 1: Esqueleto, tokens y layout

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.mjs`, `postcss.config.mjs`, `.gitignore`, `app/layout.tsx`, `app/page.tsx` (provisorio), `app/globals.css`, `lib/site.ts`, `components/Logo.tsx`, `public/brand/*`

**Interfaces:**
- Produces: tokens CSS (`--azul`, `--azul-text`, `--azul-tint`, `--sol`, `--navy`, `--bg`, `--surface`, `--text`, `--text-muted`, `--line`, `--control-border`, `--verde(-tint)`, `--espera(-tint)`, `--alto(-tint)`, `--focus`, `--r-sm|md|lg`, `--ease-out`, `--ease-in-out`, `--t-press|hover|ui`, `--pass-shadow`); utilidades Tailwind `bg-azul text-azul-text bg-azul-tint bg-sol text-navy bg-navy bg-bg bg-surface text-ink text-ink-muted bg-verde-tint text-verde … rounded-sm|md|lg font-sans font-bagel`; clases `.wrap .sec .t-display-xl .t-display .t-title .t-heading .t-lead .t-body .t-small .t-caption .btn .btn-primary .btn-secondary .btn-sol .btn-light .btn-sm .icon-btn .link .chip .chip-inv .chip-ok .chip-wait .chip-stop .sr-only`; `site` (de `lib/site.ts`); `<Logo width alt? onDark? className?/>`; la clase `js` en `<html>` cuando hay JS; `data-theme="light|dark"` en `<html>` cuando hay elección guardada.

- [ ] **Step 1: Copiar los logos**

```bash
mkdir -p public/brand && cp /c/Users/gianl/Downloads/pazzit-logos/*.svg public/brand/
ls public/brand
```
Expected: 13 archivos `.svg`, entre ellos `pazzit-lockup-claro.svg`, `pazzit-lockup-oscuro.svg`, `pazzit-lockup-azul.svg`, `pazzit-mark-blanco.svg`, `pazzit-app-icon.svg` y `pazzit-app-icon-noche.svg`.

- [ ] **Step 2: Escribir la configuración**

`package.json`:
```json
{
  "name": "pazzit-landing",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "node scripts/serve.mjs",
    "test": "node --test lib/demo.test.ts",
    "icons": "node scripts/icons.mjs",
    "shots": "node scripts/shots.mjs"
  }
}
```

`next.config.mjs`:
```js
/** @type {import('next').NextConfig} */
export default {
  output: "export",
  images: { unoptimized: true },
};
```

`postcss.config.mjs`:
```js
export default { plugins: { "@tailwindcss/postcss": {} } };
```

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "allowImportingTsExtensions": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules", "out"]
}
```

`.gitignore`:
```
node_modules/
.next/
out/
.env*.local
next-env.d.ts
*.tsbuildinfo
.taste-skill/inspect/
```

- [ ] **Step 3: Instalar dependencias**

```bash
npm install next@16 react@19 react-dom@19 lucide-react
npm install -D typescript@5 @types/react @types/react-dom @types/node tailwindcss@4 @tailwindcss/postcss@4 sharp @playwright/test
```
Expected: termina sin errores de peer deps. Si Next 16 pide otra versión mayor de React, aceptá la que pide.

- [ ] **Step 4: Verificar los nombres de íconos de lucide v1**

```bash
node -e "const l=require('lucide-react');for(const n of ['ArrowDown','Bell','CalendarClock','Check','ChevronDown','CircleAlert','Clock','Menu','Moon','Search','Sun','TimerOff','X'])console.log(n, typeof l[n])"
```
Expected: los 13 nombres imprimen `object` o `function`. Si alguno imprime `undefined`, buscá su nombre nuevo con `grep -o "export { [A-Za-z]*" node_modules/lucide-react/dist/lucide-react.d.ts | grep -i <palabra>` y reemplazalo en este plan donde aparezca.

- [ ] **Step 5: Escribir `lib/site.ts`**

```ts
// Todos los placeholders del sitio. Cambiá un valor acá y se actualiza en toda la página.
// Un valor que empieza con "[" se considera sin completar.
export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  email: "[EMAIL]",
  instagram: "[@pazzit]",
  instagramUrl: null as string | null,
  precio: "[PRECIO]",
  precioIncluye: "[COMPLETAR: qué incluye el precio]",
  plazoRespuesta: "[PLAZO]",
  terminosUrl: null as string | null,
  privacidadUrl: null as string | null,
  datosAlojamiento: "[COMPLETAR: dónde se alojan los datos y quién es el responsable registrado]",
  faq: {
    offline: "[COMPLETAR: qué pasa en la portería si se corta internet]",
    altaVecinos: "[COMPLETAR: cómo se da de alta a los vecinos]",
    retencion: "[COMPLETAR: por cuánto tiempo se guardan]",
    implementacion: "[COMPLETAR: cuánto tarda la implementación]",
  },
};

export const isSet = (v: string | null) => !!v && !v.startsWith("[");
```

- [ ] **Step 6: Escribir `app/globals.css` (base y tokens; las tareas siguientes agregan bloques al final)**

```css
@import "tailwindcss";

/* ---------- Tokens ---------- */
:root {
  color-scheme: light;
  --azul: #2F5BFF;
  --azul-text: #2F5BFF;
  --azul-tint: #E3E9FF;
  --sol: #FFC933;
  --navy: #0B1640;
  --bg: #F3F6FF;
  --surface: #FFFFFF;
  --text: #0B1640;
  --text-muted: #4A5578;
  --line: #E1E6F5;
  --control-border: #7C86A8;
  --verde: #0E7A55;
  --verde-tint: #E2F6EC;
  --espera: #8A5A00;
  --espera-tint: #FFF3D1;
  --alto: #B42318;
  --alto-tint: #FDE7E4;
  --focus: #2F5BFF;
  --pass-shadow: drop-shadow(0 14px 16px rgba(11, 22, 64, 0.14));

  --r-sm: 8px;
  --r-md: 14px;
  --r-lg: 24px;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out: cubic-bezier(0.76, 0, 0.24, 1);
  --t-press: 120ms;
  --t-hover: 180ms;
  --t-ui: 220ms;
  --header-h: 64px;
}
@media (min-width: 1024px) {
  :root { --header-h: 72px; }
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    color-scheme: dark;
    --azul-text: #7D93FF;
    --azul-tint: #24306A;
    --bg: #0A1030;
    --surface: #131B45;
    --text: #E6ECFF;
    --text-muted: #A6B0D6;
    --line: #24306A;
    --control-border: #7480B8;
    --verde: #5BE0A8;
    --verde-tint: #0F2B26;
    --espera: #FFD166;
    --espera-tint: #2E2410;
    --alto: #FF8A7A;
    --alto-tint: #3A1620;
    --focus: #FFC933;
    --pass-shadow: drop-shadow(0 14px 16px rgba(0, 0, 0, 0.35));
  }
}
:root[data-theme="dark"] {
  color-scheme: dark;
  --azul-text: #7D93FF;
  --azul-tint: #24306A;
  --bg: #0A1030;
  --surface: #131B45;
  --text: #E6ECFF;
  --text-muted: #A6B0D6;
  --line: #24306A;
  --control-border: #7480B8;
  --verde: #5BE0A8;
  --verde-tint: #0F2B26;
  --espera: #FFD166;
  --espera-tint: #2E2410;
  --alto: #FF8A7A;
  --alto-tint: #3A1620;
  --focus: #FFC933;
  --pass-shadow: drop-shadow(0 14px 16px rgba(0, 0, 0, 0.35));
}

@theme inline {
  --color-azul: var(--azul);
  --color-azul-text: var(--azul-text);
  --color-azul-tint: var(--azul-tint);
  --color-sol: var(--sol);
  --color-navy: var(--navy);
  --color-bg: var(--bg);
  --color-surface: var(--surface);
  --color-ink: var(--text);
  --color-ink-muted: var(--text-muted);
  --color-line: var(--line);
  --color-control: var(--control-border);
  --color-verde: var(--verde);
  --color-verde-tint: var(--verde-tint);
  --color-espera: var(--espera);
  --color-espera-tint: var(--espera-tint);
  --color-alto: var(--alto);
  --color-alto-tint: var(--alto-tint);
  --font-sans: var(--font-onest), system-ui, sans-serif;
  --font-bagel: var(--font-bagel-fat), var(--font-onest), sans-serif;
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 24px;
}

/* ---------- Base ---------- */
@layer base {
  html {
    background: var(--bg);
    color: var(--text);
    -webkit-text-size-adjust: 100%;
    scroll-padding-top: calc(var(--header-h) + 16px);
  }
  body {
    font-family: var(--font-sans);
    font-size: 16px;
    line-height: 26px;
    background: var(--bg);
    color: var(--text);
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
    overflow-x: clip;
  }
  h1, h2, h3, h4 { text-wrap: balance; }
  p, li, dd { text-wrap: pretty; }
  :focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
  ::selection { background: var(--sol); color: var(--navy); }
}
@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
}

/* ---------- Tipografía ---------- */
@layer components {
  .t-display-xl { font-size: 40px; line-height: 44px; font-weight: 800; letter-spacing: -1px; }
  .t-display { font-size: 32px; line-height: 36px; font-weight: 800; letter-spacing: -1px; }
  .t-title { font-size: 24px; line-height: 30px; font-weight: 700; letter-spacing: -0.5px; }
  .t-heading { font-size: 20px; line-height: 28px; font-weight: 700; }
  .t-lead { font-size: 18px; line-height: 28px; }
  .t-body { font-size: 16px; line-height: 26px; }
  .t-small { font-size: 14px; line-height: 20px; }
  .t-caption { font-size: 13px; line-height: 16px; font-weight: 600; letter-spacing: 0.2px; }
  @media (min-width: 768px) {
    .t-display { font-size: 44px; line-height: 48px; }
    .t-title { font-size: 28px; line-height: 34px; }
    .t-lead { font-size: 20px; line-height: 30px; }
  }
  @media (min-width: 1024px) {
    .t-display-xl { font-size: clamp(48px, 4.4vw, 64px); line-height: 1; letter-spacing: -2px; }
  }

  /* ---------- Layout ---------- */
  .wrap { width: 100%; max-width: 1264px; margin-inline: auto; padding-inline: 16px; }
  .sec { padding-block: 48px; }
  @media (min-width: 768px) { .wrap { padding-inline: 32px; } }
  @media (min-width: 1024px) { .sec { padding-block: 96px; } }

  /* ---------- Botones y links ---------- */
  .btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    min-height: 48px; padding: 0 20px; border-radius: var(--r-md);
    font-size: 16px; line-height: 20px; font-weight: 700; text-decoration: none;
    user-select: none; touch-action: manipulation; cursor: pointer;
    border: 2px solid transparent;
    transition: transform var(--t-press) var(--ease-out), background-color var(--t-hover) ease,
      border-color var(--t-hover) ease, color var(--t-hover) ease;
  }
  .btn:active { transform: scale(0.97); }
  .btn:disabled { cursor: progress; }
  .btn-sm { min-height: 44px; padding: 0 16px; font-size: 15px; }
  .btn-primary { background: var(--azul); color: #fff; }
  .btn-secondary { border-color: var(--control-border); color: var(--azul-text); background: transparent; }
  .btn-sol { background: var(--sol); color: var(--navy); }
  .btn-light { background: #fff; color: var(--navy); }
  .btn-nudge { transition: transform var(--t-hover) var(--ease-out); }
  @media (hover: hover) and (pointer: fine) {
    .btn-primary:hover { background: color-mix(in srgb, var(--azul) 84%, var(--navy)); }
    .btn-secondary:hover { border-color: var(--azul-text); background: var(--azul-tint); }
    .btn-sol:hover { background: color-mix(in srgb, var(--sol) 88%, var(--navy)); }
    .btn-light:hover { background: var(--azul-tint); }
    .btn:hover .btn-nudge { transform: translateY(2px); }
  }

  .icon-btn {
    display: inline-grid; place-items: center; width: 44px; height: 44px;
    border-radius: var(--r-md); color: var(--text); cursor: pointer;
    transition: background-color var(--t-hover) ease, transform var(--t-press) var(--ease-out);
  }
  .icon-btn:active { transform: scale(0.94); }
  @media (hover: hover) and (pointer: fine) { .icon-btn:hover { background: var(--azul-tint); } }

  .link {
    color: var(--azul-text); font-weight: 600;
    text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 3px;
    text-decoration-color: color-mix(in srgb, currentColor 35%, transparent);
    transition: text-decoration-color var(--t-hover) ease;
  }
  @media (hover: hover) and (pointer: fine) { .link:hover { text-decoration-color: currentColor; } }

  /* ---------- Chips de estado (siempre con su palabra) ---------- */
  .chip {
    display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px;
    border-radius: var(--r-sm); font-size: 13px; line-height: 16px; font-weight: 600; white-space: nowrap;
  }
  .chip svg { width: 14px; height: 14px; flex: none; }
  .chip-inv { background: var(--azul-tint); color: var(--text); }
  .chip-inv svg { color: var(--azul-text); }
  .chip-ok { background: var(--verde-tint); color: var(--verde); }
  .chip-wait { background: var(--espera-tint); color: var(--espera); }
  .chip-stop { background: var(--alto-tint); color: var(--alto); }
}

@media (prefers-reduced-motion: reduce) {
  .btn:active, .icon-btn:active { transform: none; }
}

/* ---------- Logo (alterna por tema) ---------- */
.logo { display: inline-block; line-height: 0; }
.logo-oscuro { display: none; }
:root[data-theme="dark"] .logo-claro { display: none; }
:root[data-theme="dark"] .logo-oscuro { display: block; }
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) .logo-claro { display: none; }
  :root:not([data-theme="light"]) .logo-oscuro { display: block; }
}

.skip {
  position: absolute; left: 16px; top: -200px; z-index: 100;
  background: var(--surface); color: var(--text); padding: 12px 16px; border-radius: var(--r-sm); font-weight: 600;
}
.skip:focus { top: 12px; }
```

- [ ] **Step 7: Escribir `components/Logo.tsx`**

```tsx
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
```

- [ ] **Step 8: Escribir `app/layout.tsx`**

```tsx
import type { Metadata, Viewport } from "next";
import { Onest, Bagel_Fat_One } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const onest = Onest({ subsets: ["latin"], weight: ["400", "600", "700", "800"], display: "swap", variable: "--font-onest" });
const bagel = Bagel_Fat_One({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-bagel-fat", preload: false });

const title = "Pazzit, el pase de tus visitas";
const description =
  "Tus visitas entran sin vueltas. El vecino invita, la visita recibe su pase por WhatsApp y la portería lo valida con un escaneo. Para barrios cerrados y edificios.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "Pazzit",
    title,
    description,
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Pazzit" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  icons: {
    icon: [
      { url: "/brand/pazzit-app-icon.svg", type: "image/svg+xml", media: "(prefers-color-scheme: light)" },
      { url: "/brand/pazzit-app-icon-noche.svg", type: "image/svg+xml", media: "(prefers-color-scheme: dark)" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F3F6FF" },
    { media: "(prefers-color-scheme: dark)", color: "#0A1030" },
  ],
};

// Antes del primer paint: marca que hay JS y aplica el tema guardado (sin flash).
const THEME_SCRIPT = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('pazzit-theme');if(t==='light'||t==='dark')d.dataset.theme=t}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${onest.variable} ${bagel.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 9: Escribir el `app/page.tsx` provisorio**

```tsx
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
```

- [ ] **Step 10: Build y verificación**

Run: `npm run build`
Expected: `✓ Compiled`, sin errores de tipos, y se genera `out/index.html`. Run: `grep -c "es-AR" out/index.html` → `1` o más.

- [ ] **Step 11: Commit (si el repo existe)**

```bash
git add -A && git commit -m "chore: esqueleto Next + tokens de marca + layout"
```

---

### Task 2: Lógica del formulario (TDD)

**Files:**
- Create: `lib/demo.ts`
- Test: `lib/demo.test.ts`

**Interfaces:**
- Produces: `type Fields = { nombre: string; rol: string; lugar: string; unidades: string; contacto: string; empresa: string }`; `type FieldKey = "nombre" | "rol" | "lugar" | "unidades" | "contacto"`; `type Errors = Partial<Record<FieldKey, string>>`; `validate(f: Fields): Errors`; `submit(f: Fields, endpoint?: string): Promise<"ok" | "error">`; `FIELD_ORDER: FieldKey[]`; `ROLES: { value: string; label: string }[]`.

- [ ] **Step 1: Escribir el test que falla, `lib/demo.test.ts`**

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { validate, submit, type Fields } from "./demo.ts";

const ok: Fields = { nombre: "Ana Ruiz", rol: "administrador", lugar: "Torre Sol", unidades: "40", contacto: "ana@mail.com", empresa: "" };

test("un formulario completo no tiene errores", () => {
  assert.deepEqual(validate(ok), {});
});

test("marca cada requerido vacío con su mensaje", () => {
  const e = validate({ nombre: "  ", rol: "", lugar: "", unidades: "", contacto: "", empresa: "" });
  assert.deepEqual(Object.keys(e).sort(), ["contacto", "lugar", "nombre", "rol"]);
  assert.equal(e.nombre, "Falta tu nombre para saber a quién escribirle.");
  assert.equal(e.rol, "Elegí qué rol tenés así te mostramos lo que te sirve.");
  assert.equal(e.lugar, "Falta el nombre del barrio o edificio.");
  assert.equal(e.contacto, "Falta tu WhatsApp o email para poder escribirte.");
});

test("acepta WhatsApp con formato argentino", () => {
  for (const c of ["+54 9 11 1234-5678", "11 1234 5678", "(011) 4555-1234"]) {
    assert.deepEqual(validate({ ...ok, contacto: c }), {}, c);
  }
});

test("rechaza contactos que no son email ni teléfono", () => {
  for (const c of ["ana@", "ana@mail", "1234", "hola", "+54 9 11 1234-5678-9999-1"]) {
    assert.equal(validate({ ...ok, contacto: c }).contacto, "Revisá el WhatsApp o el email; así no nos llega.", c);
  }
});

test("unidades es opcional, pero si está tiene que ser un entero ≥ 1", () => {
  assert.deepEqual(validate({ ...ok, unidades: "" }), {});
  for (const u of ["0", "4.5", "abc", "-3"]) {
    assert.equal(validate({ ...ok, unidades: u }).unidades, "Poné un número de unidades, por ejemplo 40.", u);
  }
});

test("rol inventado no vale", () => {
  assert.ok(validate({ ...ok, rol: "jefe" }).rol);
});

test("honeypot completo: simula éxito sin enviar", async () => {
  assert.equal(await submit({ ...ok, empresa: "spam" }, "http://127.0.0.1:9/nunca"), "ok");
});

test("sin endpoint fuera de desarrollo: error", async () => {
  assert.equal(await submit(ok, ""), "error");
});

test("endpoint caído: error, no excepción", async () => {
  assert.equal(await submit(ok, "http://127.0.0.1:9/nunca"), "error");
});
```

- [ ] **Step 2: Correrlo para ver que falla**

Run: `npm test`
Expected: FAIL con `Cannot find module` / `ERR_MODULE_NOT_FOUND` para `./demo.ts`.

- [ ] **Step 3: Implementar `lib/demo.ts`**

```ts
export type FieldKey = "nombre" | "rol" | "lugar" | "unidades" | "contacto";
export type Fields = Record<FieldKey, string> & { empresa: string };
export type Errors = Partial<Record<FieldKey, string>>;

export const FIELD_ORDER: FieldKey[] = ["nombre", "rol", "lugar", "unidades", "contacto"];
export const ROLES = [
  { value: "vecino", label: "Vecino" },
  { value: "administrador", label: "Administrador" },
  { value: "porteria", label: "Portería" },
];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isContacto(c: string) {
  if (c.includes("@")) return EMAIL.test(c);
  if (!/^\+?[\d\s().-]+$/.test(c)) return false;
  const digits = c.replace(/\D/g, "").length;
  return digits >= 8 && digits <= 15;
}

export function validate(f: Fields): Errors {
  const e: Errors = {};
  if (!f.nombre.trim()) e.nombre = "Falta tu nombre para saber a quién escribirle.";
  if (!ROLES.some((r) => r.value === f.rol)) e.rol = "Elegí qué rol tenés así te mostramos lo que te sirve.";
  if (!f.lugar.trim()) e.lugar = "Falta el nombre del barrio o edificio.";
  const u = f.unidades.trim();
  if (u && !/^[1-9]\d*$/.test(u)) e.unidades = "Poné un número de unidades, por ejemplo 40.";
  const c = f.contacto.trim();
  if (!c) e.contacto = "Falta tu WhatsApp o email para poder escribirte.";
  else if (!isContacto(c)) e.contacto = "Revisá el WhatsApp o el email; así no nos llega.";
  return e;
}

export async function submit(f: Fields, endpoint = process.env.NEXT_PUBLIC_DEMO_ENDPOINT): Promise<"ok" | "error"> {
  if (f.empresa) return "ok"; // honeypot: un bot completó el campo oculto
  if (!endpoint) {
    if (process.env.NODE_ENV === "development") {
      console.info("[demo] NEXT_PUBLIC_DEMO_ENDPOINT sin definir: simulo el envío", f);
      await new Promise((r) => setTimeout(r, 600));
      return "ok";
    }
    return "error";
  }
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        nombre: f.nombre.trim(),
        rol: f.rol,
        lugar: f.lugar.trim(),
        unidades: f.unidades.trim() ? Number(f.unidades) : null,
        contacto: f.contacto.trim(),
        origen: "landing",
      }),
    });
    return res.ok ? "ok" : "error";
  } catch {
    return "error";
  }
}
```

- [ ] **Step 4: Correr los tests**

Run: `npm test`
Expected: `# pass 9`, `# fail 0`.

- [ ] **Step 5: Commit (si el repo existe)**

```bash
git add lib/demo.ts lib/demo.test.ts && git commit -m "feat: validación y envío del formulario de demo"
```

---

### Task 3: Header, tema, menú móvil y footer

**Files:**
- Create: `components/ThemeToggle.tsx`, `components/MobileNav.tsx`, `components/sections/Header.tsx`, `components/sections/Footer.tsx`
- Modify: `app/globals.css` (bloque al final), `app/page.tsx`

**Interfaces:**
- Consumes: `Logo`, `site`, `isSet`, las clases `.icon-btn .btn .wrap .t-*`.
- Produces: `NAV_LINKS: { href: string; label: string }[]` exportado desde `Header.tsx`; `<Header/>`, `<Footer/>`.

- [ ] **Step 1: Escribir `components/ThemeToggle.tsx`**

```tsx
"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

function currentIsDark() {
  const t = document.documentElement.dataset.theme;
  return t ? t === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
}

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(currentIsDark());
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => { if (!document.documentElement.dataset.theme) setDark(mq.matches); };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  function toggle() {
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("pazzit-theme", next); } catch {}
    setDark(!dark);
  }

  return (
    <button
      type="button"
      className="icon-btn theme-btn"
      onClick={toggle}
      aria-label={dark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      data-dark={dark ? "" : undefined}
      style={{ visibility: dark === null ? "hidden" : undefined }}
    >
      <Moon className="i-moon" size={20} strokeWidth={2} aria-hidden />
      <Sun className="i-sun" size={20} strokeWidth={2} aria-hidden />
    </button>
  );
}
```

- [ ] **Step 2: Escribir `components/MobileNav.tsx`**

```tsx
"use client";
import { useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

// <details> abre y cierra sin JS; el JS suma Escape, clic afuera y cierre al elegir un link.
export function MobileNav({ links }: { links: { href: string; label: string }[] }) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && d.open) { d.open = false; d.querySelector("summary")?.focus(); }
    };
    const onClick = (e: MouseEvent) => { if (d.open && !d.contains(e.target as Node)) d.open = false; };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("click", onClick); };
  }, []);

  const close = () => { if (ref.current) ref.current.open = false; };

  return (
    <details ref={ref} className="mnav lg:hidden">
      <summary className="icon-btn" aria-label="Menú">
        <Menu className="i-open" size={24} strokeWidth={2} aria-hidden />
        <X className="i-close" size={24} strokeWidth={2} aria-hidden />
      </summary>
      <div className="mnav-panel">
        <nav aria-label="Principal">
          <ul>
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={close} className="mnav-link">{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a href="#demo" onClick={close} className="btn btn-primary w-full mt-4">Pedí una demo</a>
      </div>
    </details>
  );
}
```

- [ ] **Step 3: Escribir `components/sections/Header.tsx`**

```tsx
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MobileNav } from "@/components/MobileNav";

export const NAV_LINKS = [
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#para-quien", label: "Para quién" },
  { href: "#seguridad", label: "Seguridad" },
  { href: "#preguntas", label: "Preguntas" },
];

export function Header() {
  return (
    <header className="site-header">
      <a href="#contenido" className="skip">Saltar al contenido</a>
      <div className="wrap flex items-center gap-4" style={{ height: "var(--header-h)" }}>
        <a href="#top" aria-label="Pazzit, inicio" className="shrink-0 rounded-sm">
          <Logo width={112} alt="" />
        </a>
        <nav aria-label="Principal" className="hidden lg:block ml-auto">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <li key={l.href}><a href={l.href} className="nav-link">{l.label}</a></li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto lg:ml-2 flex items-center gap-1">
          <ThemeToggle />
          <a href="#demo" className="btn btn-primary btn-sm hidden min-[420px]:inline-flex ml-1">Pedí una demo</a>
          <MobileNav links={NAV_LINKS} />
        </div>
      </div>
    </header>
  );
}
```

- [ ] **Step 4: Escribir `components/sections/Footer.tsx`**

```tsx
import { Logo } from "@/components/Logo";
import { NAV_LINKS } from "./Header";
import { site, isSet } from "@/lib/site";

export function Footer() {
  const links = [...NAV_LINKS, { href: "#demo", label: "Pedí una demo" }];
  return (
    <footer className="grid lg:grid-cols-2">
      <div className="bg-azul grid place-items-center min-h-[44svh] lg:min-h-[640px] p-10">
        <img src="/brand/pazzit-mark-blanco.svg" alt="" width={460} height={300} className="w-[min(64%,420px)] h-auto" />
      </div>
      <div className="flex flex-col px-4 py-12 md:px-8 lg:px-16 lg:py-20">
        <Logo width={120} />
        <p className="t-body text-ink-muted mt-3">Pasá nomás.</p>
        <nav aria-label="Pie de página" className="mt-10">
          <ul className="footer-menu">
            {links.map((l) => (
              <li key={l.href}><a href={l.href} className="t-title">{l.label}</a></li>
            ))}
          </ul>
        </nav>
        <div className="grid gap-8 sm:grid-cols-2 mt-14">
          <div>
            <h2 className="t-small font-semibold text-ink-muted">Contacto</h2>
            {isSet(site.email)
              ? <a className="link t-body mt-1 inline-block" href={`mailto:${site.email}`}>{site.email}</a>
              : <p className="t-body mt-1">{site.email}</p>}
          </div>
          <div>
            <h2 className="t-small font-semibold text-ink-muted">Redes</h2>
            {site.instagramUrl
              ? <a className="link t-body mt-1 inline-block" href={site.instagramUrl}>{site.instagram}</a>
              : <p className="t-body mt-1">{site.instagram}</p>}
          </div>
        </div>
        <p className="t-caption text-ink-muted mt-auto pt-14 flex flex-wrap gap-x-4 gap-y-2">
          <span>© 2026 Pazzit</span>
          {site.terminosUrl ? <a className="link" href={site.terminosUrl}>Términos</a> : <span>Términos [COMPLETAR: URL]</span>}
          {site.privacidadUrl ? <a className="link" href={site.privacidadUrl}>Privacidad</a> : <span>Privacidad [COMPLETAR: URL]</span>}
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 5: Agregar el CSS al final de `app/globals.css`**

```css
/* ---------- Header ---------- */
.site-header { position: sticky; top: 0; z-index: 50; background: var(--bg); }
@supports (animation-timeline: scroll()) {
  .site-header { animation: header-tone linear both; animation-timeline: scroll(); animation-range: 0 96px; }
  @keyframes header-tone { to { background-color: var(--surface); } }
}
.nav-link {
  display: inline-flex; align-items: center; min-height: 44px; padding: 0 12px;
  border-radius: var(--r-sm); font-size: 15px; font-weight: 600; color: var(--text);
  transition: background-color var(--t-hover) ease, color var(--t-hover) ease;
}
@media (hover: hover) and (pointer: fine) { .nav-link:hover { background: var(--azul-tint); } }

.theme-btn svg { grid-area: 1 / 1; transition: opacity var(--t-ui) var(--ease-out), transform var(--t-ui) var(--ease-out); }
.theme-btn .i-sun { opacity: 0; transform: rotate(-45deg) scale(0.8); }
.theme-btn[data-dark] .i-moon { opacity: 0; transform: rotate(45deg) scale(0.8); }
.theme-btn[data-dark] .i-sun { opacity: 1; transform: none; }

/* ---------- Menú móvil ---------- */
.mnav summary { list-style: none; }
.mnav summary::-webkit-details-marker { display: none; }
.mnav summary svg { grid-area: 1 / 1; }
.mnav .i-close, .mnav[open] .i-open { display: none; }
.mnav[open] .i-close { display: block; }
.mnav-panel {
  position: absolute; left: 0; right: 0; top: 100%;
  background: var(--surface); padding: 8px 16px 20px;
}
.mnav-link { display: flex; align-items: center; min-height: 52px; font-size: 20px; font-weight: 700; color: var(--text); }
@media (prefers-reduced-motion: no-preference) {
  .mnav[open] .mnav-panel { animation: menu-in var(--t-ui) var(--ease-out); transform-origin: top right; }
}
@keyframes menu-in { from { opacity: 0; transform: translateY(-6px) scale(0.98); } }

/* ---------- Footer ---------- */
.footer-menu { display: flex; flex-direction: column; gap: 12px; }
.footer-menu a { display: inline-flex; min-height: 44px; align-items: center; color: var(--text);
  transition: transform var(--t-ui) var(--ease-out), color var(--t-hover) ease; }
@media (hover: hover) and (pointer: fine) {
  .footer-menu:hover a:not(:hover) { color: var(--text-muted); }
  .footer-menu a:hover { transform: translateX(12px); }
}
```

- [ ] **Step 6: Montar en `app/page.tsx`**

```tsx
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
```

- [ ] **Step 7: Verificar a mano**

Run: `npm run dev` y abrí `http://localhost:3000`.
Expected:
- A 1280px se ven los cuatro links, el toggle y el CTA.
- A 360px se ven el logo, el toggle y el botón de menú; el menú abre, se cierra con Escape y el foco vuelve al botón.
- El toggle cambia el tema y el lockup pasa a la versión oscura. Al recargar, el tema se mantiene sin flash.
- En el footer, al pasar el mouse por un link, ese se corre 12px y los demás se aclaran.

- [ ] **Step 8: Commit (si el repo existe)**

```bash
git add -A && git commit -m "feat: header con tema y menú móvil, footer"
```

---

### Task 4: El pase, la animación de marca, el hero y el problema

**Files:**
- Create: `components/Pass.tsx`, `components/PassHero.tsx`, `components/InView.tsx`, `components/sections/HeroYProblema.tsx`
- Modify: `app/globals.css` (bloque al final), `app/page.tsx`

**Interfaces:**
- Produces:
  - `<Pass className? />`: el markup del pase en estado final "validado". La animación vive en CSS bajo `.pass.is-playing`.
  - `<PassHero/>`: renderiza `<Pass className="is-playing" data-inview>` y reinicia la animación al pasar el mouse o tocar.
  - `<InView/>`: agrega `.is-in` una sola vez a cada `[data-inview]` que entra en pantalla, y la Task 6 lo reusa.
  - `qrPath(seed?: number): string`.

- [ ] **Step 1: Escribir `components/Pass.tsx`**

```tsx
import { CalendarClock, Check, Clock } from "lucide-react";

// QR decorativo de 21×21 módulos: tres patrones de posición y datos pseudoaleatorios fijos.
export function qrPath(seed = 7) {
  let s = seed;
  const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const inFinder = (x: number, y: number) => (x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12);
  let d = "";
  for (let y = 0; y < 21; y++)
    for (let x = 0; x < 21; x++) if (!inFinder(x, y) && rnd() > 0.52) d += `M${x} ${y}h1v1h-1z`;
  for (const [fx, fy] of [[0, 0], [14, 0], [0, 14]])
    d += `M${fx} ${fy}h7v7h-7zM${fx + 1} ${fy + 1}v5h5v-5zM${fx + 2} ${fy + 2}h3v3h-3z`;
  return d;
}
const QR = qrPath();

function Qr() {
  return (
    <svg className="pass-qr" viewBox="0 0 21 21" aria-hidden shapeRendering="crispEdges">
      <path d={QR} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

type Props = { className?: string; "data-inview"?: boolean };

export function Pass({ className = "", ...rest }: Props) {
  return (
    <div
      className={`pass ${className}`}
      role="img"
      aria-label="Pase de visita de Juan Pérez, plomero para la unidad 4°B, sábado 18 de 10 a 12 h. Estado: validado."
      {...rest}
    >
      <div className="pass-piece pass-body-wrap">
        <div className="pass-body">
          <span className="pass-chips">
            <span className="chip chip-inv pass-chip-a"><Clock strokeWidth={2} aria-hidden />Invitado</span>
            <span className="chip chip-ok pass-chip-b"><Check strokeWidth={2.5} aria-hidden />Validado</span>
          </span>
          <span className="pass-nombre">Juan Pérez</span>
          <span className="pass-motivo">Plomero para la unidad 4°B</span>
          <span className="pass-hora"><CalendarClock size={16} strokeWidth={2} aria-hidden />Sáb 18, de 10 a 12 h</span>
        </div>
        <svg className="pass-cut" viewBox="0 0 4 100" preserveAspectRatio="none" aria-hidden>
          <line className="pass-cut-base" x1="2" y1="2" x2="2" y2="98" />
          <line className="pass-cut-on" x1="2" y1="2" x2="2" y2="98" />
        </svg>
      </div>
      <div className="pass-piece pass-talon-wrap">
        <div className="pass-talon">
          <Qr />
          <span className="pass-talon-sol"><Qr /></span>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Escribir `components/PassHero.tsx`**

```tsx
"use client";
import { useEffect, useRef } from "react";
import { Pass } from "./Pass";

// La animación es CSS (.pass.is-playing). Esto solo la reinicia con hover o tap, y nunca a mitad de una corrida.
export function PassHero() {
  const ref = useRef<HTMLDivElement>(null);
  const running = useRef(true);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) running.current = false;
  }, []);

  function replay() {
    const el = ref.current?.querySelector<HTMLElement>(".pass");
    if (!el || running.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    running.current = true;
    el.classList.remove("is-playing");
    void el.offsetWidth; // fuerza reflow para que la animación arranque de nuevo
    el.classList.add("is-playing");
  }

  return (
    <div
      ref={ref}
      className="pass-hero"
      onPointerEnter={(e) => { if (e.pointerType === "mouse") replay(); }}
      onClick={replay}
      onAnimationEnd={(e) => { if (e.animationName === "pass-chip-in") running.current = false; }}
    >
      <Pass className="is-playing" data-inview />
    </div>
  );
}
```

- [ ] **Step 3: Escribir `components/InView.tsx`**

```tsx
"use client";
import { useEffect } from "react";

// Marca .is-in una sola vez cuando cada [data-inview] entra en pantalla. Sin JS, el CSS muestra el estado final.
export function InView() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-inview]");
    if (!("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("is-in")); return; }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.25 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
```

- [ ] **Step 4: Escribir `components/sections/HeroYProblema.tsx`**

```tsx
import { ArrowDown } from "lucide-react";
import { PassHero } from "@/components/PassHero";

const PROBLEMAS = [
  ["El cuaderno de la entrada que nadie lee.", "Nombres a mano, letra ilegible y nada para buscar cuando hace falta."],
  ["Una llamada al departamento por cada delivery.", "El portero llama, el vecino no atiende y la visita espera en la vereda."],
  ["«¿Quién dejó pasar a quién?»", "Reclamos sin respuesta, porque no queda registro de nada."],
];

export function HeroYProblema() {
  return (
    <div className="wrap hero-grid">
      <section aria-labelledby="hero-title" className="hero-text">
        <h1 id="hero-title" className="t-display-xl max-w-[12ch]">Tus visitas entran sin vueltas.</h1>
        <p className="t-lead mt-6 max-w-[38ch]">
          El vecino invita, la visita recibe su pase por WhatsApp y la portería lo valida con un escaneo. Sin cuaderno, sin llamadas, todo registrado.
        </p>
        <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
          <a className="btn btn-primary" href="#demo">Pedí una demo</a>
          <a className="btn btn-secondary" href="#como-funciona">
            Ver cómo funciona <ArrowDown className="btn-nudge" size={18} strokeWidth={2} aria-hidden />
          </a>
        </div>
      </section>

      <div className="hero-stage">
        <PassHero />
      </div>

      <section aria-labelledby="problema-title" className="problema">
        <h2 id="problema-title" className="t-display max-w-[16ch]">La entrada no tendría que ser un trámite.</h2>
        <div className="mt-8 flex flex-col gap-6 max-w-[46ch]">
          {PROBLEMAS.map(([a, b]) => (
            <p key={a} className="t-lead">
              <strong className="font-bold">{a}</strong> {b}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 5: Agregar el CSS del hero y del pase al final de `app/globals.css`**

```css
/* ---------- Hero en split stage ---------- */
.hero-grid { display: grid; grid-template-areas: "text" "stage" "problema"; row-gap: 32px; padding-top: 32px; }
.hero-text { grid-area: text; }
.hero-stage {
  grid-area: stage; display: grid; place-items: center;
  background: var(--azul); border-radius: var(--r-lg); padding: 40px 16px 40px 24px;
}
.problema { grid-area: problema; padding-block: 16px 48px; }
@media (min-width: 1024px) {
  .hero-grid {
    grid-template-columns: 45fr 55fr; grid-template-areas: "stage text" "stage problema";
    column-gap: 64px; padding-top: 16px;
  }
  .hero-stage {
    position: sticky; top: calc(var(--header-h) + 16px); align-self: start;
    height: calc(100svh - var(--header-h) - 32px); min-height: 520px; padding: 32px;
  }
  .hero-text {
    min-height: calc(100svh - var(--header-h) - 32px);
    display: flex; flex-direction: column; justify-content: center; padding-block: 48px;
  }
  .problema { padding-block: 48px 96px; min-height: 70svh; }
}
.pass-hero { width: min(100%, 500px); cursor: pointer; }

/* ---------- El pase ---------- */
.pass { --notch: 13px; display: flex; width: 100%; padding-right: 8px; container-type: inline-size; color: var(--text); }
.pass-piece { filter: var(--pass-shadow); }
.pass-body-wrap { position: relative; flex: 1 1 auto; min-width: 0; }
.pass-body {
  height: 100%; display: flex; flex-direction: column; gap: 4px;
  background: var(--surface); border-radius: var(--r-lg) 6px 6px var(--r-lg);
  padding: clamp(16px, 6cqw, 28px) clamp(16px, 5cqw, 24px) clamp(16px, 6cqw, 28px) clamp(24px, 7cqw, 36px);
  -webkit-mask: radial-gradient(circle var(--notch) at 0 50%, #0000 calc(var(--notch) - 0.5px), #000 var(--notch));
  mask: radial-gradient(circle var(--notch) at 0 50%, #0000 calc(var(--notch) - 0.5px), #000 var(--notch));
}
.pass-chips { display: grid; justify-items: start; margin-bottom: 10px; }
.pass-chips > * { grid-area: 1 / 1; }
.pass-chip-a { opacity: 0; transform: translateY(-4px); }
.pass-nombre { font-size: clamp(20px, 6.4cqw, 28px); line-height: 1.2; font-weight: 700; letter-spacing: -0.5px; }
.pass-motivo { font-size: clamp(14px, 3.6cqw, 16px); line-height: 1.5; color: var(--text-muted); }
.pass-hora { display: flex; align-items: center; gap: 6px; margin-top: 8px; font-size: 14px; line-height: 20px; font-weight: 600; }
.pass-hora svg { color: var(--azul-text); flex: none; }
.pass-cut { position: absolute; right: -1px; top: 14px; bottom: 14px; width: 4px; height: calc(100% - 28px); overflow: visible; }
.pass-cut line { stroke-width: 3; stroke-linecap: round; stroke-dasharray: 0.1 7; vector-effect: non-scaling-stroke; }
.pass-cut-base { stroke: var(--line); }
.pass-cut-on { stroke: var(--control-border); }
.pass-talon-wrap { flex: 0 0 auto; transform: translateX(8px); }
.pass-talon {
  position: relative; height: 100%; display: grid; place-items: center;
  padding: clamp(14px, 4.5cqw, 24px) clamp(20px, 6cqw, 30px) clamp(14px, 4.5cqw, 24px) clamp(14px, 4.5cqw, 24px);
  background: var(--surface); border-radius: 6px var(--r-lg) var(--r-lg) 6px; color: var(--text);
  -webkit-mask: radial-gradient(circle var(--notch) at 100% 50%, #0000 calc(var(--notch) - 0.5px), #000 var(--notch));
  mask: radial-gradient(circle var(--notch) at 100% 50%, #0000 calc(var(--notch) - 0.5px), #000 var(--notch));
}
.pass-qr { display: block; width: clamp(72px, 21cqw, 112px); height: auto; }
.pass-talon-sol {
  position: absolute; inset: 0; display: grid; place-items: center;
  padding: inherit; background: var(--sol); color: var(--navy);
}

/* Momento de marca: 1,4 s, una vez; el reposo es el estado final (validado). */
@media (prefers-reduced-motion: no-preference) {
  .pass.is-playing { animation: pass-in 380ms var(--ease-out) both; }
  .pass.is-playing .pass-cut-on { animation: pass-cut 420ms var(--ease-out) 300ms both; }
  .pass.is-playing .pass-talon-wrap { animation: pass-tear 420ms var(--ease-out) 700ms both; }
  .pass.is-playing .pass-talon-sol { animation: pass-fade 360ms var(--ease-out) 720ms both; }
  .pass.is-playing .pass-chip-a { animation: pass-chip-out 260ms var(--ease-out) 1000ms both; }
  .pass.is-playing .pass-chip-b { animation: pass-chip-in 360ms var(--ease-out) 1040ms both; }
  .js .pass[data-inview]:not(.is-in),
  .js .pass[data-inview]:not(.is-in) * { animation-play-state: paused !important; }
}
@keyframes pass-in { from { opacity: 0; transform: translateY(12px); } }
@keyframes pass-cut { from { clip-path: inset(0 0 100% 0); } }
@keyframes pass-tear { from { transform: none; } }
@keyframes pass-fade { from { opacity: 0; } }
@keyframes pass-chip-out { from { opacity: 1; transform: none; } to { opacity: 0; transform: translateY(-4px); } }
@keyframes pass-chip-in { from { opacity: 0; transform: translateY(4px); } }
```

- [ ] **Step 6: Montar en `app/page.tsx`**

```tsx
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
```

- [ ] **Step 7: Verificar a mano**

Run: `npm run dev`, 1280px y 360px.
Expected:
- Al cargar, el pase sube, la línea punteada se marca de arriba hacia abajo, el talón se pinta de sol con el QR navy y se corre 8px, y "Invitado" pasa a "Validado". Todo en unos 1,4 s.
- Al pasar el mouse se repite. Si ya está corriendo, no se reinicia.
- En desktop, al scrollear, el panel azul queda fijo mientras pasa el problema.
- Con DevTools → Rendering → prefers-reduced-motion: reduce, se ve directo el estado validado, sin movimiento.
- Con JS desactivado, el pase se ve en estado validado.
- Las muescas son transparentes: se ve el azul a través de ellas.

- [ ] **Step 8: Commit (si el repo existe)**

```bash
git add -A && git commit -m "feat: pase con animación de marca, hero en split stage y problema"
```

---

### Task 5: Cómo funciona (la cosa viva)

**Files:**
- Create: `components/sections/ComoFunciona.tsx`
- Modify: `app/globals.css` (bloque al final), `app/page.tsx`

**Interfaces:**
- Consumes: clases `.btn .chip .t-*`, el token `--sol` (el pulgar del slider es el acento sol de esta pantalla).
- Produces: `<ComoFunciona/>` con `id="como-funciona"`.

- [ ] **Step 1: Escribir `components/sections/ComoFunciona.tsx`**

```tsx
"use client";
import { useId, useState, type CSSProperties } from "react";
import { Bell, CalendarClock, Check } from "lucide-react";

const STEPS = [
  { titulo: "Invitá", texto: "Cargás nombre y horario. Tarda 15 segundos." },
  { titulo: "Llega el pase", texto: "Tu visita lo recibe por WhatsApp. No instala nada." },
  { titulo: "Pasá nomás", texto: "En la entrada lo escanean y te avisamos que llegó." },
];

export function ComoFunciona() {
  const [step, setStep] = useState(0);
  const [nombre, setNombre] = useState("Juan Pérez");
  const inputId = useId();
  const quien = nombre.trim() || "tu visita";
  const primer = nombre.trim().split(/\s+/)[0] || "";

  return (
    <section id="como-funciona" aria-labelledby="cf-title" className="cf">
      <div className="cf-head">
        <h2 id="cf-title" className="t-title">Cómo funciona</h2>
        <div aria-live="polite" className="mt-8">
          <p key={step} className="cf-clause t-display">
            <span className="cf-num" aria-hidden>{step + 1}</span>
            <span className="sr-only">Paso {step + 1}: </span>
            {STEPS[step].titulo}.
          </p>
          <p key={`t${step}`} className="cf-clause t-lead mt-4 max-w-[30ch]">{STEPS[step].texto}</p>
        </div>
      </div>

      <div className="cf-stage">
        <div className="cf-panels">
          <div className="cf-panel app" data-ui data-active={step === 0 || undefined}>
            <p className="app-label">Nueva visita</p>
            <label htmlFor={inputId} className="app-field-label">Nombre de tu visita</label>
            <input
              id={inputId}
              className="app-input"
              value={nombre}
              maxLength={40}
              autoComplete="off"
              onChange={(e) => setNombre(e.target.value)}
            />
            <p className="app-field-label">Horario</p>
            <p className="app-fake"><CalendarClock size={18} strokeWidth={2} aria-hidden />Sáb 18, de 10 a 12 h</p>
            <p className="app-field-label">Motivo</p>
            <p className="app-fake">Plomero para la unidad 4°B</p>
            <button type="button" className="btn btn-primary w-full mt-5" onClick={() => setStep(1)}>Invitar</button>
          </div>

          <div className="cf-panel app" data-ui data-active={step === 1 || undefined}>
            <p className="app-label">Mensaje de Pazzit</p>
            <div className="bubble-wrap">
              <span className="typing" aria-hidden><i /><i /><i /></span>
              <div className="bubble">
                <p>Hola{primer ? ` ${primer}` : ""}, te esperan el sáb 18 de 10 a 12 h en la unidad 4°B. Este es tu pase:</p>
                <p className="bubble-pass">
                  <span className="font-semibold truncate">Pase de {quien}</span>
                  <span className="chip chip-inv">Invitado</span>
                </p>
              </div>
            </div>
            <button type="button" className="btn btn-primary w-full mt-5" onClick={() => setStep(2)}>Mostrarlo en la entrada</button>
          </div>

          <div className="cf-panel app" data-ui data-active={step === 2 || undefined}>
            <p className="app-label">Portería · Entrada principal</p>
            <div className="scan-ok">
              <span className="chip chip-ok"><Check strokeWidth={2.5} aria-hidden />Validado</span>
              <p className="app-title mt-3 truncate">{quien}</p>
              <p className="t-small text-ink-muted">Unidad 4°B · Sáb 18, 10:04 h</p>
            </div>
            <p className="notif"><Bell size={18} strokeWidth={2} aria-hidden /><span>Le avisamos a la 4°B: <strong className="font-semibold">{quien} llegó.</strong></span></p>
            <button type="button" className="btn btn-secondary w-full mt-5" onClick={() => setStep(0)}>Invitar a otra persona</button>
          </div>
        </div>
      </div>

      <div className="cf-controls">
        <div className="cf-range" style={{ "--p": step / 2 } as CSSProperties}>
          <span className="cf-range-fill" aria-hidden />
          <input
            type="range" min={0} max={2} step={1} value={step}
            onChange={(e) => setStep(Number(e.target.value))}
            aria-label="Paso de cómo funciona"
            aria-valuetext={`Paso ${step + 1} de 3: ${STEPS[step].titulo}`}
          />
        </div>
        <ol className="cf-steps">
          {STEPS.map((s, i) => (
            <li key={s.titulo}>
              <button type="button" className="cf-step" aria-current={i === step ? "step" : undefined} onClick={() => setStep(i)}>
                <span className="cf-step-n" aria-hidden>{i + 1}</span>
                <span>{s.titulo}</span>
              </button>
              <p className="cf-step-text">{s.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Agregar el CSS al final de `app/globals.css`**

```css
/* ---------- Cómo funciona ---------- */
.cf { display: grid; grid-template-areas: "head" "stage" "controls"; background: var(--surface); margin-block: 48px; }
.cf-head { grid-area: head; padding: 48px 16px 24px; }
.cf-stage { grid-area: stage; display: grid; place-items: center; background: var(--azul); padding: 40px 16px; }
.cf-controls { grid-area: controls; padding: 24px 16px 48px; }
@media (min-width: 768px) {
  .cf-head { padding-inline: 32px; } .cf-controls { padding-inline: 32px; } .cf-stage { padding: 56px 32px; }
}
@media (min-width: 1024px) {
  .cf {
    grid-template-columns: 1fr 1fr; grid-template-rows: 1fr auto;
    grid-template-areas: "head stage" "controls stage";
    min-height: min(88svh, 880px); margin-block: 96px;
  }
  .cf-head { padding: 96px 64px 32px max(32px, calc((100vw - 1200px) / 2)); }
  .cf-controls { padding: 0 64px 72px max(32px, calc((100vw - 1200px) / 2)); }
}
.cf-clause { display: flex; align-items: baseline; gap: 16px; }
.cf-clause.t-lead { display: block; }
.cf-num {
  flex: none; display: inline-grid; place-items: center; width: 1.1em; height: 1.1em; align-self: center;
  border-radius: var(--r-md); background: var(--azul-tint); color: var(--text); font-size: 0.7em; line-height: 1;
}
@media (prefers-reduced-motion: no-preference) {
  .js .cf-clause { animation: clause-in var(--t-ui) var(--ease-out) both; }
}
@keyframes clause-in { from { opacity: 0; transform: translateY(6px); } }

/* Slider */
.cf-range { position: relative; height: 44px; display: flex; align-items: center; }
.cf-range::before, .cf-range-fill { content: ""; position: absolute; left: 0; right: 0; height: 8px; border-radius: 4px; }
.cf-range::before { background: var(--azul-tint); }
.cf-range-fill { background: var(--text); transform-origin: left center; transform: scaleX(var(--p, 0)); transition: transform 260ms var(--ease-out); }
.cf-range input { position: relative; width: 100%; height: 44px; margin: 0; background: transparent; -webkit-appearance: none; appearance: none; cursor: pointer; }
.cf-range input::-webkit-slider-runnable-track { height: 8px; background: transparent; }
.cf-range input::-webkit-slider-thumb {
  -webkit-appearance: none; width: 32px; height: 32px; margin-top: -12px; border-radius: var(--r-sm);
  background: var(--sol); border: 2px solid var(--navy); transition: transform var(--t-press) var(--ease-out);
}
.cf-range input::-moz-range-track { height: 8px; background: transparent; }
.cf-range input::-moz-range-thumb { width: 28px; height: 28px; border-radius: var(--r-sm); background: var(--sol); border: 2px solid var(--navy); }
.cf-range input:active::-webkit-slider-thumb { transform: scale(0.92); }
.cf-range input:focus-visible { outline: none; }
.cf-range input:focus-visible::-webkit-slider-thumb { outline: 2px solid var(--focus); outline-offset: 2px; }
.cf-range input:focus-visible::-moz-range-thumb { outline: 2px solid var(--focus); outline-offset: 2px; }
html:not(.js) .cf-range { display: none; }

.cf-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 12px; }
.cf-step {
  display: flex; align-items: center; gap: 8px; min-height: 44px; width: 100%; text-align: left;
  font-size: 15px; line-height: 20px; font-weight: 600; color: var(--text-muted); cursor: pointer;
  border-radius: var(--r-sm); transition: color var(--t-hover) ease;
}
.cf-step[aria-current="step"] { color: var(--text); }
.cf-step-n { flex: none; display: inline-grid; place-items: center; width: 24px; height: 24px; border-radius: 6px; background: var(--azul-tint); color: var(--text); font-size: 13px; }
.js .cf-step-text { display: none; }
.cf-step-text { font-size: 14px; line-height: 20px; color: var(--text); margin-top: 4px; }
@media (max-width: 479px) { .cf-steps { grid-template-columns: 1fr; gap: 0; } }

/* Paneles: sin JS se ven los tres apilados; con JS, uno a la vez con crossfade. */
.cf-panels { width: min(100%, 400px); display: grid; gap: 16px; }
.js .cf-panel {
  grid-area: 1 / 1; opacity: 0; visibility: hidden; transform: translateY(8px);
  transition: opacity var(--t-ui) var(--ease-out), transform 280ms var(--ease-out), visibility 0s 280ms;
}
.js .cf-panel[data-active] { opacity: 1; visibility: visible; transform: none; transition-delay: 0s; }
@media (prefers-reduced-motion: reduce) { .js .cf-panel { transform: none; } }

/* Fragmentos de la app (data-ui) */
.app { background: var(--surface); color: var(--text); border-radius: var(--r-lg); padding: 20px; min-width: 0; }
.app-label { font-size: 14px; line-height: 20px; font-weight: 600; color: var(--text-muted); margin-bottom: 12px; }
.app-title { font-size: 20px; line-height: 28px; font-weight: 700; }
.app-field-label { display: block; font-size: 14px; line-height: 20px; font-weight: 600; margin: 12px 0 6px; }
.app-input {
  width: 100%; height: 48px; padding: 0 12px; border-radius: var(--r-sm); font-size: 16px;
  background: var(--surface); color: var(--text); border: 2px solid var(--control-border);
  transition: border-color var(--t-hover) ease;
}
.app-input:focus-visible { border-color: var(--azul-text); }
.app-fake { display: flex; align-items: center; gap: 8px; min-height: 48px; padding: 0 12px; border-radius: var(--r-sm); background: var(--bg); font-size: 15px; }
.app-fake svg { color: var(--azul-text); }

.bubble-wrap { position: relative; min-height: 150px; }
.bubble { background: var(--bg); border-radius: var(--r-md) var(--r-md) var(--r-md) 4px; padding: 14px 16px; font-size: 15px; line-height: 22px; transform-origin: bottom left; }
.bubble-pass { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 12px; padding: 10px 12px; background: var(--surface); border-radius: var(--r-sm); }
.typing { position: absolute; left: 0; top: 0; display: inline-flex; gap: 4px; padding: 14px 16px; background: var(--bg); border-radius: var(--r-md); opacity: 0; }
.typing i { width: 6px; height: 6px; border-radius: 50%; background: var(--text-muted); }
.scan-ok { padding: 16px; border-radius: var(--r-md); background: var(--verde-tint); }
.scan-ok .chip { background: var(--surface); }
.notif { display: flex; gap: 10px; align-items: flex-start; margin-top: 12px; padding: 12px 14px; border-radius: var(--r-md); background: var(--bg); font-size: 15px; line-height: 22px; }
.notif svg { flex: none; margin-top: 2px; color: var(--azul-text); }

@media (prefers-reduced-motion: no-preference) {
  .js .cf-panel[data-active] .typing { animation: typing-life 900ms ease both; }
  .js .cf-panel[data-active] .typing i { animation: typing-dot 300ms ease-in-out 3 alternate; }
  .js .cf-panel[data-active] .typing i:nth-child(2) { animation-delay: 100ms; }
  .js .cf-panel[data-active] .typing i:nth-child(3) { animation-delay: 200ms; }
  .js .cf-panel[data-active] .bubble { animation: bubble-in 320ms var(--ease-out) 760ms both; }
  .js .cf-panel[data-active] .scan-ok .chip { animation: pass-chip-in 320ms var(--ease-out) 200ms both; }
  .js .cf-panel[data-active] .notif { animation: notif-in 360ms var(--ease-out) 620ms both; }
}
@keyframes typing-life { 0% { opacity: 0; } 15%, 80% { opacity: 1; } 100% { opacity: 0; } }
@keyframes typing-dot { to { transform: translateY(-3px); opacity: 0.5; } }
@keyframes bubble-in { from { opacity: 0; transform: translateY(6px) scale(0.97); } }
@keyframes notif-in { from { opacity: 0; transform: translateY(-8px); } }
```

- [ ] **Step 3: Montar en `app/page.tsx`, después de `<HeroYProblema />`**

```tsx
import { ComoFunciona } from "@/components/sections/ComoFunciona";
// …dentro de <main>:
<HeroYProblema />
<ComoFunciona />
```

- [ ] **Step 4: Verificar a mano**

Expected:
- Escribí "Marta Díaz" en el panel 1 y apretá "Invitar". El panel cambia con un crossfade, aparecen los puntos de "escribiendo" y después la burbuja "Hola Marta…".
- "Mostrarlo en la entrada" lleva al paso 3 con "Marta Díaz llegó".
- El slider con flechas del teclado cambia de paso y el lector anuncia "Paso 2 de 3: Llega el pase".
- Sin JS se ven los tres paneles apilados y el texto de cada paso.
- A 320px no hay scroll horizontal.

- [ ] **Step 5: Commit (si el repo existe)**

```bash
git add -A && git commit -m "feat: cómo funciona con slider y nombre en vivo"
```

---

### Task 6: Para quién y seguridad (fragmentos con ritual)

**Files:**
- Create: `components/sections/ParaQuien.tsx`, `components/sections/Seguridad.tsx`
- Modify: `app/globals.css` (bloque al final), `app/page.tsx`

**Interfaces:**
- Consumes: `<InView/>` (ya montado), `.chip-*`, `.app`, `site.datosAlojamiento`.
- Produces: `<ParaQuien/>` (`id="para-quien"`) y `<Seguridad/>` (`id="seguridad"`).

- [ ] **Step 1: Escribir `components/sections/ParaQuien.tsx`**

```tsx
import type { CSSProperties, ReactNode } from "react";
import { Bell, Check, Search } from "lucide-react";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

const REGISTRO = [
  { h: "11:15", v: "María Gómez", u: "7°C", e: "Esperando", c: "chip-wait" },
  { h: "10:40", v: "Delivery", u: "2°A", e: "Validado", c: "chip-ok" },
  { h: "10:04", v: "Juan Pérez", u: "4°B", e: "Validado", c: "chip-ok" },
  { h: "09:00", v: "Fumigación", u: "SUM", e: "Vencido", c: "chip-stop" },
];

function Registro() {
  return (
    <table className="reg" data-inview>
      <caption className="sr-only">Registro de ingresos del sábado 18 (datos de ejemplo)</caption>
      <thead>
        <tr><th scope="col">Hora</th><th scope="col">Visita</th><th scope="col">Unidad</th><th scope="col">Estado</th></tr>
      </thead>
      <tbody>
        {REGISTRO.map((r, n) => (
          <tr key={r.h} style={i(n)}>
            <td>{r.h}</td><td>{r.v}</td><td>{r.u}</td>
            <td><span className={`chip ${r.c}`}>{r.e}</span></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Busqueda() {
  return (
    <div className="srch" data-inview aria-hidden>
      <p className="srch-box"><Search size={18} strokeWidth={2} /><span className="srch-q">4°B</span></p>
      <ul className="srch-res">
        <li style={i(0)}><span>Sáb 18 · 10:04</span><span className="font-semibold">Juan Pérez</span><span className="chip chip-ok">Validado</span></li>
        <li style={i(1)}><span>Jue 16 · 19:30</span><span className="font-semibold">Laura Paz</span><span className="chip chip-ok">Validado</span></li>
      </ul>
    </div>
  );
}

function Detalle() {
  const rows = [["Ingreso", "Sáb 18, 10:04 h"], ["Visita", "Juan Pérez"], ["Autorizó", "Unidad 4°B"], ["Validó", "Portería, entrada principal"]];
  return (
    <dl className="detalle" data-inview aria-hidden>
      {rows.map(([k, v], n) => (
        <div key={k} style={i(n)}><dt>{k}</dt><dd>{v}</dd></div>
      ))}
    </dl>
  );
}

function AvisoVecino() {
  return (
    <div className="vnotif" data-inview aria-hidden>
      <div className="vnotif-card">
        <span className="vnotif-ic"><Bell size={18} strokeWidth={2} /></span>
        <div><p className="font-semibold">Juan Pérez llegó</p><p className="t-small text-ink-muted">Entrada principal · 10:04 h</p></div>
      </div>
    </div>
  );
}

function Escaneo() {
  return (
    <div className="scan" data-inview aria-hidden>
      <div className="scan-frame"><span /><span /><span /><span /></div>
      <div>
        <span className="chip chip-ok"><Check strokeWidth={2.5} />Validado</span>
        <p className="font-semibold mt-2">Juan Pérez</p>
        <p className="t-small text-ink-muted">Va a la unidad 4°B</p>
      </div>
    </div>
  );
}

function Modulo({ titulo, children, panel }: { titulo: string; children: ReactNode; panel: ReactNode }) {
  return (
    <div className="mod">
      <div className="mod-panel">{panel}</div>
      <div className="mod-text">
        <h4 className="t-heading">{titulo}</h4>
        <div className="t-body mt-2 flex flex-col gap-2">{children}</div>
      </div>
    </div>
  );
}

export function ParaQuien() {
  return (
    <section id="para-quien" aria-labelledby="pq-title" className="wrap sec">
      <h2 id="pq-title" className="t-display max-w-[18ch]">Hecho para los tres lados de la puerta.</h2>

      <div className="pq-group">
        <h3 className="t-title">Administración</h3>
        <p className="t-lead mt-2 max-w-[40ch]">Historial buscable, menos reclamos, todo en orden.</p>
        <div className="pq-mods">
          <Modulo titulo="Cada ingreso, anotado." panel={<Registro />}>
            <p>Fecha, hora, unidad y quién lo autorizó. Sin letra ilegible ni hojas arrancadas.</p>
          </Modulo>
          <Modulo titulo="Lo encontrás en segundos." panel={<Busqueda />}>
            <p>Buscás por unidad, por nombre o por día.</p>
          </Modulo>
          <Modulo titulo="Menos reclamos." panel={<Detalle />}>
            <p>Cuando alguien pregunta quién entró, tenés el dato en vez de una discusión.</p>
          </Modulo>
        </div>
      </div>

      <div className="pq-group">
        <h3 className="t-title">Vecinos</h3>
        <div className="pq-mods">
          <Modulo titulo="Invitás desde el celu y te enterás cuando llegan." panel={<AvisoVecino />}>
            <p>Sin llamadas a la portería. Tu visita no instala nada.</p>
          </Modulo>
        </div>
      </div>

      <div className="pq-group">
        <h3 className="t-title">Portería</h3>
        <div className="pq-mods">
          <Modulo titulo="Validás en un segundo, sin llamar a nadie." panel={<Escaneo />}>
            <p>Escaneás el QR y ves quién es y a dónde va. Todo queda anotado solo; chau cuaderno.</p>
          </Modulo>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Escribir `components/sections/Seguridad.tsx`**

```tsx
import { Check, TimerOff } from "lucide-react";
import { site } from "@/lib/site";

const PUNTOS = [
  ["Pases con vencimiento.", "Cada pase vale solo para el horario que cargaste. Después, deja de funcionar."],
  ["Registro de cada ingreso.", "Queda anotado quién invitó, quién entró y a qué hora."],
  ["Datos tratados según la Ley 25.326.", `Tratamos los datos personales según la Ley 25.326 de Protección de Datos Personales. ${site.datosAlojamiento}`],
];

export function Seguridad() {
  return (
    <section id="seguridad" aria-labelledby="seg-title" className="seg">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 id="seg-title" className="t-display">Seguridad sin vueltas.</h2>
          <p className="t-lead mt-4 max-w-[34ch]">Cuidamos el acceso a tu edificio y los datos de quienes entran.</p>
          <div className="venc app mt-8" data-ui data-inview aria-hidden>
            <p className="app-label">Pase de Fumigación · SUM</p>
            <p className="app-title">Sáb 18, de 8 a 9 h</p>
            <span className="venc-chips mt-3">
              <span className="chip chip-ok venc-a"><Check strokeWidth={2.5} />Válido</span>
              <span className="chip chip-stop venc-b"><TimerOff strokeWidth={2} />Vencido</span>
            </span>
            <p className="t-small text-ink-muted mt-3">Pasadas las 9 h, el QR ya no sirve para entrar.</p>
          </div>
        </div>
        <dl className="lg:col-span-7 flex flex-col gap-8 lg:pt-3">
          {PUNTOS.map(([t, d]) => (
            <div key={t}>
              <dt className="t-title">{t}</dt>
              <dd className="t-lead mt-2 max-w-[48ch]">{d}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Agregar el CSS al final de `app/globals.css`**

```css
/* ---------- Para quién ---------- */
.pq-group { margin-top: 56px; }
.pq-mods { display: flex; flex-direction: column; gap: 48px; margin-top: 32px; }
.mod { display: grid; gap: 16px; }
.mod-panel {
  background: var(--surface); border-radius: var(--r-md); padding: 16px;
  overflow: hidden; min-height: 120px; display: flex; align-items: center;
}
@media (min-width: 640px) {
  .mod { grid-template-columns: 380px minmax(0, 300px); gap: 24px; align-items: start; }
}
@media (min-width: 1024px) {
  .pq-group, .pq-mods { margin-left: 16.666%; }
  .pq-mods { margin-left: 0; gap: 72px; }
  .pq-group { margin-top: 96px; }
}

.reg { width: 100%; min-width: 340px; border-collapse: collapse; font-size: 14px; line-height: 20px; }
.reg th { text-align: left; font-size: 13px; font-weight: 600; color: var(--text-muted); padding: 0 8px 8px; }
.reg td { padding: 8px; border-top: 1px solid var(--line); white-space: nowrap; }
.reg td:first-child, .reg th:first-child { padding-left: 0; }

.srch { width: 100%; min-width: 300px; }
.srch-box { display: flex; align-items: center; gap: 8px; height: 44px; padding: 0 12px; border-radius: var(--r-sm); border: 2px solid var(--control-border); font-weight: 600; }
.srch-box svg { color: var(--text-muted); }
.srch-q { display: inline-block; }
.srch-res { margin-top: 10px; display: flex; flex-direction: column; gap: 6px; font-size: 14px; }
.srch-res li { display: grid; grid-template-columns: 110px 1fr auto; gap: 8px; align-items: center; padding: 8px 10px; border-radius: var(--r-sm); background: var(--bg); white-space: nowrap; }

.detalle { width: 100%; display: grid; gap: 8px; font-size: 14px; line-height: 20px; }
.detalle > div { display: grid; grid-template-columns: 84px 1fr; gap: 8px; }
.detalle dt { color: var(--text-muted); font-weight: 600; }

.vnotif { width: 100%; }
.vnotif-card { display: flex; gap: 12px; align-items: center; padding: 12px 14px; border-radius: var(--r-md); background: var(--bg); }
.vnotif-ic { display: grid; place-items: center; width: 36px; height: 36px; flex: none; border-radius: 10px; background: var(--azul); color: #fff; }

.scan { display: flex; gap: 16px; align-items: center; }
.scan-frame { position: relative; width: 88px; height: 88px; flex: none; }
.scan-frame span { position: absolute; width: 22px; height: 22px; border: 3px solid var(--azul-text); }
.scan-frame span:nth-child(1) { top: 0; left: 0; border-right: 0; border-bottom: 0; border-radius: 8px 0 0 0; }
.scan-frame span:nth-child(2) { top: 0; right: 0; border-left: 0; border-bottom: 0; border-radius: 0 8px 0 0; }
.scan-frame span:nth-child(3) { bottom: 0; left: 0; border-right: 0; border-top: 0; border-radius: 0 0 0 8px; }
.scan-frame span:nth-child(4) { bottom: 0; right: 0; border-left: 0; border-top: 0; border-radius: 0 0 8px 0; }

/* ---------- Seguridad ---------- */
.seg { background: var(--surface); padding-block: 48px; }
.seg .venc { background: var(--bg); max-width: 380px; }
@media (min-width: 1024px) { .seg { padding-block: 96px; } }
.venc-chips { display: grid; justify-items: start; }
.venc-chips > * { grid-area: 1 / 1; }
.venc-a { opacity: 0; transform: translateY(-4px); }

/* ---------- Rituales: corren una vez al entrar; el reposo es el estado final ---------- */
@media (prefers-reduced-motion: no-preference) {
  .reg tbody tr { transition: opacity 320ms var(--ease-out), transform 420ms var(--ease-out); transition-delay: calc(var(--i, 0) * 90ms + 150ms); }
  .js .reg:not(.is-in) tbody tr { opacity: 0; transform: translateY(-8px); }

  .srch-q { transition: clip-path 420ms steps(3, end) 200ms; }
  .js .srch:not(.is-in) .srch-q { clip-path: inset(0 100% 0 0); }
  .srch-res li { transition: opacity 300ms var(--ease-out), transform 380ms var(--ease-out); transition-delay: calc(var(--i, 0) * 90ms + 700ms); }
  .js .srch:not(.is-in) .srch-res li { opacity: 0; transform: translateY(6px); }

  .detalle > div { transition: opacity 360ms var(--ease-out); transition-delay: calc(var(--i, 0) * 80ms + 150ms); }
  .js .detalle:not(.is-in) > div { opacity: 0; }

  .vnotif-card { transition: opacity 320ms var(--ease-out) 200ms, transform 420ms var(--ease-out) 200ms; }
  .js .vnotif:not(.is-in) .vnotif-card { opacity: 0; transform: translateY(-12px); }

  .scan-frame { transition: opacity 300ms var(--ease-out), transform 500ms var(--ease-out); }
  .js .scan:not(.is-in) .scan-frame { opacity: 0; transform: scale(1.08); }
  .scan .chip { transition: opacity 260ms var(--ease-out) 500ms, transform 320ms var(--ease-out) 500ms; }
  .js .scan:not(.is-in) .chip { opacity: 0; transform: translateY(4px); }

  .venc-a, .venc-b { transition: opacity 260ms var(--ease-out) 800ms, transform 320ms var(--ease-out) 800ms; }
  .js .venc:not(.is-in) .venc-a { opacity: 1; transform: none; }
  .js .venc:not(.is-in) .venc-b { opacity: 0; transform: translateY(4px); }
}
```

- [ ] **Step 4: Montar en `app/page.tsx` después de `<ComoFunciona />`**

```tsx
import { ParaQuien } from "@/components/sections/ParaQuien";
import { Seguridad } from "@/components/sections/Seguridad";
// …
<ComoFunciona />
<ParaQuien />
<Seguridad />
```

- [ ] **Step 5: Verificar a mano**

Expected:
- Al scrollear, cada fragmento hace su ritual una sola vez: las filas llegan, "4°B" se tipea y salen los resultados, el detalle aparece, el aviso baja, el marco asienta y "Válido" pasa a "Vencido".
- Si volvés a pasar, no se repiten.
- Con reduced motion, todo está quieto en su estado final.
- A 320px la tabla se recorta dentro de su panel y la página no tiene scroll horizontal.

- [ ] **Step 6: Commit (si el repo existe)**

```bash
git add -A && git commit -m "feat: para quién y seguridad con fragmentos de la app"
```

---

### Task 7: Piloto y precio, y preguntas

**Files:**
- Create: `components/sections/Piloto.tsx`, `components/sections/Preguntas.tsx`
- Modify: `app/globals.css` (bloque al final), `app/page.tsx`

**Interfaces:**
- Consumes: `site.precio`, `site.precioIncluye`, `site.faq.*`.
- Produces: `<Piloto/>` (`id="piloto"`) y `<Preguntas/>` (`id="preguntas"`).

- [ ] **Step 1: Escribir `components/sections/Piloto.tsx`**

```tsx
import { site } from "@/lib/site";

export function Piloto() {
  return (
    <section id="piloto" aria-labelledby="piloto-title" className="piloto" data-inview>
      <div className="piloto-a">
        <h2 id="piloto-title" className="t-display max-w-[14ch]">Probalo gratis 30 días en un edificio.</h2>
        <p className="t-lead mt-4 max-w-[32ch]">Lo ponemos en marcha con tu portería y lo usan de verdad durante un mes.</p>
        <a className="btn btn-primary mt-8 lg:mt-auto self-start" href="#demo">Pedí el piloto</a>
        <svg className="piloto-seam piloto-seam-v" viewBox="0 0 4 100" preserveAspectRatio="none" aria-hidden><line x1="2" y1="2" x2="2" y2="98" /></svg>
        <svg className="piloto-seam piloto-seam-h" viewBox="0 0 100 4" preserveAspectRatio="none" aria-hidden><line x1="2" y1="2" x2="98" y2="2" /></svg>
      </div>
      <div className="piloto-b">
        <h3 className="t-title">Después del piloto</h3>
        <p className="mt-auto pt-10">
          <span className="t-display block break-words">{site.precio}</span>
          <span className="t-lead">por unidad por mes</span>
        </p>
        <p className="t-body mt-4 max-w-[40ch]">{site.precioIncluye}</p>
        <a className="btn btn-light mt-8 self-start" href="#demo">Pedí una demo</a>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Escribir `components/sections/Preguntas.tsx`**

```tsx
import { ChevronDown } from "lucide-react";
import { site } from "@/lib/site";

const FAQ = [
  ["¿La visita tiene que instalar algo?", "No. Recibe el pase por WhatsApp y lo muestra en la entrada. Solo necesita un celular con WhatsApp."],
  ["¿Qué pasa si se corta internet en la entrada?", site.faq.offline],
  ["¿Cómo se carga a los vecinos?", site.faq.altaVecinos],
  ["¿Qué datos se guardan y por cuánto tiempo?", `Guardamos lo necesario para registrar cada ingreso: nombre de la visita, unidad, horario y quién la invitó. ${site.faq.retencion}. Los datos se tratan según la Ley 25.326.`],
  ["¿Cuánto tarda la implementación?", site.faq.implementacion],
];

export function Preguntas() {
  return (
    <section id="preguntas" aria-labelledby="faq-title" className="wrap sec grid gap-8 lg:grid-cols-12">
      <h2 id="faq-title" className="t-display lg:col-span-4 max-w-[12ch]">Preguntas frecuentes.</h2>
      <div className="lg:col-span-8 flex flex-col gap-2">
        {FAQ.map(([q, a]) => (
          <details key={q} name="faq" className="faq">
            <summary>
              <h3 className="t-heading">{q}</h3>
              <ChevronDown className="faq-chev" size={22} strokeWidth={2} aria-hidden />
            </summary>
            <p className="faq-a t-body">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Agregar el CSS al final de `app/globals.css`**

```css
/* ---------- Piloto: dos campos con costura de ticket ---------- */
.piloto { display: grid; margin-block: 48px; }
.piloto-a, .piloto-b { position: relative; display: flex; flex-direction: column; padding: 48px 16px; }
.piloto-a { background: var(--azul-tint); color: var(--text); }
.piloto-b { background: var(--azul); color: #fff; }
.piloto-seam { position: absolute; overflow: visible; }
.piloto-seam line { stroke: var(--azul); stroke-width: 3; stroke-linecap: round; stroke-dasharray: 0.1 8; vector-effect: non-scaling-stroke; }
.piloto-seam-v { display: none; }
.piloto-seam-h { left: 24px; right: 24px; bottom: -2px; width: calc(100% - 48px); height: 4px; }
/* móvil: muescas en las esquinas inferiores de A y superiores de B */
.piloto-a {
  -webkit-mask: radial-gradient(circle 16px at 0 100%, #0000 15.5px, #000 16px) left / 51% 100% no-repeat,
    radial-gradient(circle 16px at 100% 100%, #0000 15.5px, #000 16px) right / 51% 100% no-repeat;
  mask: radial-gradient(circle 16px at 0 100%, #0000 15.5px, #000 16px) left / 51% 100% no-repeat,
    radial-gradient(circle 16px at 100% 100%, #0000 15.5px, #000 16px) right / 51% 100% no-repeat;
}
.piloto-b {
  -webkit-mask: radial-gradient(circle 16px at 0 0, #0000 15.5px, #000 16px) left / 51% 100% no-repeat,
    radial-gradient(circle 16px at 100% 0, #0000 15.5px, #000 16px) right / 51% 100% no-repeat;
  mask: radial-gradient(circle 16px at 0 0, #0000 15.5px, #000 16px) left / 51% 100% no-repeat,
    radial-gradient(circle 16px at 100% 0, #0000 15.5px, #000 16px) right / 51% 100% no-repeat;
}
@media (min-width: 768px) { .piloto-a, .piloto-b { padding: 56px 32px; } }
@media (min-width: 1024px) {
  .piloto { grid-template-columns: 5fr 7fr; min-height: 560px; margin-block: 96px; }
  .piloto-a { padding: 72px 64px 72px max(32px, calc((100vw - 1200px) / 2)); }
  .piloto-b { padding: 72px max(32px, calc((100vw - 1200px) / 2)) 72px 64px; }
  .piloto-seam-h { display: none; }
  .piloto-seam-v { display: block; top: 24px; bottom: 24px; right: -2px; width: 4px; height: calc(100% - 48px); }
  .piloto-a {
    -webkit-mask: radial-gradient(circle 16px at 100% 0, #0000 15.5px, #000 16px) top / 100% 51% no-repeat,
      radial-gradient(circle 16px at 100% 100%, #0000 15.5px, #000 16px) bottom / 100% 51% no-repeat;
    mask: radial-gradient(circle 16px at 100% 0, #0000 15.5px, #000 16px) top / 100% 51% no-repeat,
      radial-gradient(circle 16px at 100% 100%, #0000 15.5px, #000 16px) bottom / 100% 51% no-repeat;
  }
  .piloto-b {
    -webkit-mask: radial-gradient(circle 16px at 0 0, #0000 15.5px, #000 16px) top / 100% 51% no-repeat,
      radial-gradient(circle 16px at 0 100%, #0000 15.5px, #000 16px) bottom / 100% 51% no-repeat;
    mask: radial-gradient(circle 16px at 0 0, #0000 15.5px, #000 16px) top / 100% 51% no-repeat,
      radial-gradient(circle 16px at 0 100%, #0000 15.5px, #000 16px) bottom / 100% 51% no-repeat;
  }
}
@media (prefers-reduced-motion: no-preference) {
  .piloto-seam { transition: clip-path 800ms var(--ease-out) 200ms; }
  .js .piloto:not(.is-in) .piloto-seam-v { clip-path: inset(0 0 100% 0); }
  .js .piloto:not(.is-in) .piloto-seam-h { clip-path: inset(0 100% 0 0); }
}

/* ---------- Preguntas: acordeón nativo ---------- */
.faq { background: var(--surface); border-radius: var(--r-md); }
.faq summary {
  list-style: none; display: flex; align-items: center; justify-content: space-between; gap: 16px;
  min-height: 64px; padding: 16px 20px; cursor: pointer; border-radius: var(--r-md);
}
.faq summary::-webkit-details-marker { display: none; }
.faq summary h3 { transition: color var(--t-hover) ease; }
.faq-chev { flex: none; color: var(--azul-text); transition: transform var(--t-ui) var(--ease-out); }
.faq[open] .faq-chev { transform: rotate(180deg); }
.faq-a { padding: 0 20px 20px; max-width: 65ch; }
@media (hover: hover) and (pointer: fine) { .faq summary:hover h3 { color: var(--azul-text); } }
@supports (interpolate-size: allow-keywords) {
  @media (prefers-reduced-motion: no-preference) {
    .faq { interpolate-size: allow-keywords; }
    .faq::details-content { height: 0; overflow: clip; transition: height 280ms var(--ease-out), content-visibility 280ms allow-discrete; }
    .faq[open]::details-content { height: auto; }
  }
}
```

- [ ] **Step 4: Montar en `app/page.tsx` después de `<Seguridad />`**

```tsx
import { Piloto } from "@/components/sections/Piloto";
import { Preguntas } from "@/components/sections/Preguntas";
// …
<Seguridad />
<Piloto />
<Preguntas />
```

- [ ] **Step 5: Verificar a mano**

Expected:
- En desktop hay dos campos de color con borde duro, muescas transparentes arriba y abajo de la costura, y una línea punteada que se dibuja al entrar.
- En móvil los campos se apilan con la costura horizontal.
- En las preguntas, abrir una cierra la otra, la altura se anima en Chrome y el chevron rota.
- Se navega con Tab y se abre con Enter o Espacio.

- [ ] **Step 6: Commit (si el repo existe)**

```bash
git add -A && git commit -m "feat: piloto con costura de ticket y preguntas"
```

---

### Task 8: Banda final y formulario

**Files:**
- Create: `components/DemoForm.tsx`, `components/sections/BandaFinal.tsx`
- Modify: `app/globals.css` (bloque al final), `app/page.tsx`

**Interfaces:**
- Consumes: `validate`, `submit`, `FIELD_ORDER`, `ROLES`, `type Fields`, `type Errors`, `type FieldKey` de `@/lib/demo`; `site.plazoRespuesta`, `site.email`.
- Produces: `<BandaFinal/>` (`id="demo"`).

- [ ] **Step 1: Escribir `components/DemoForm.tsx`**

```tsx
"use client";
import { useRef, useState, type FormEvent } from "react";
import { Check, CircleAlert } from "lucide-react";
import { FIELD_ORDER, ROLES, submit, validate, type Errors, type FieldKey, type Fields } from "@/lib/demo";
import { site } from "@/lib/site";

const EMPTY: Fields = { nombre: "", rol: "", lugar: "", unidades: "", contacto: "", empresa: "" };

export function DemoForm() {
  const [f, setF] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [tried, setTried] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  function set(k: keyof Fields, v: string) {
    const next = { ...f, [k]: v };
    setF(next);
    if (tried) setErrors(validate(next));
  }
  const revalidate = () => { if (tried) setErrors(validate(f)); };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setTried(true);
    const errs = validate(f);
    setErrors(errs);
    const first = FIELD_ORDER.find((k) => errs[k]);
    if (first) { formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus(); return; }
    setStatus("sending");
    const r = await submit(f);
    setStatus(r);
    if (r === "ok") requestAnimationFrame(() => doneRef.current?.focus());
  }

  const a11y = (k: FieldKey) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `e-${k}` : undefined,
  });
  const text = (k: FieldKey) => ({
    id: `f-${k}`, name: k, value: f[k], onBlur: revalidate,
    onChange: (e: { target: { value: string } }) => set(k, e.target.value), ...a11y(k),
  });
  const Err = ({ k }: { k: FieldKey }) =>
    errors[k] ? <p id={`e-${k}`} className="field-error"><CircleAlert size={16} strokeWidth={2} aria-hidden />{errors[k]}</p> : null;

  if (status === "ok") {
    return (
      <div ref={doneRef} tabIndex={-1} role="status" className="form-done">
        <span className="form-done-ic" aria-hidden><Check size={22} strokeWidth={2.5} /></span>
        <p className="t-title text-white">Listo, te escribimos en menos de {site.plazoRespuesta}.</p>
      </div>
    );
  }

  const n = Object.keys(errors).length;
  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      action={process.env.NEXT_PUBLIC_DEMO_ENDPOINT}
      method="post"
      className="demo-form"
    >
      <div className="field">
        <label htmlFor="f-nombre">Tu nombre</label>
        <input {...text("nombre")} autoComplete="name" />
        <Err k="nombre" />
      </div>

      <fieldset className="field" aria-describedby={errors.rol ? "e-rol" : undefined}>
        <legend>Sos…</legend>
        <div className="rol-opts">
          {ROLES.map((r) => (
            <label key={r.value} className="rol-opt">
              <input type="radio" name="rol" value={r.value} checked={f.rol === r.value} onChange={() => set("rol", r.value)} {...a11y("rol")} />
              <span>{r.label}</span>
            </label>
          ))}
        </div>
        <Err k="rol" />
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-[1fr_200px]">
        <div className="field">
          <label htmlFor="f-lugar">Barrio o edificio</label>
          <input {...text("lugar")} autoComplete="organization" />
          <Err k="lugar" />
        </div>
        <div className="field">
          <label htmlFor="f-unidades">Unidades <span className="font-normal">(opcional)</span></label>
          <input {...text("unidades")} inputMode="numeric" autoComplete="off" />
          <Err k="unidades" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="f-contacto">WhatsApp o email</label>
        <input {...text("contacto")} autoComplete="email" spellCheck={false} />
        <Err k="contacto" />
      </div>

      <div className="hp" aria-hidden>
        <label htmlFor="f-empresa">Empresa</label>
        <input id="f-empresa" name="empresa" tabIndex={-1} autoComplete="off" value={f.empresa} onChange={(e) => set("empresa", e.target.value)} />
      </div>

      {tried && n > 0 && <p role="alert" className="form-summary">Revisá {n === 1 ? "1 campo" : `${n} campos`}.</p>}
      {status === "error" && (
        <p role="alert" className="form-summary">No pudimos enviarlo. Probá de nuevo o escribinos a {site.email}.</p>
      )}

      <button type="submit" className="btn btn-sol w-full sm:w-auto sm:px-8" style={{ minHeight: 52 }} disabled={status === "sending"} aria-busy={status === "sending" || undefined}>
        {status === "sending" ? "Enviando…" : "Pedí una demo"}
      </button>
    </form>
  );
}
```

- [ ] **Step 2: Escribir `components/sections/BandaFinal.tsx`**

```tsx
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
```

- [ ] **Step 3: Agregar el CSS al final de `app/globals.css`**

```css
/* ---------- Banda final (navy fijo en ambos temas) ---------- */
.on-navy { color: #E6ECFF; --focus: #FFC933; }
.on-navy :focus-visible { outline-color: #FFC933; }
.demo-form { display: flex; flex-direction: column; gap: 20px; }
.field { display: flex; flex-direction: column; min-width: 0; }
.field > label, .field > legend { font-size: 15px; line-height: 20px; font-weight: 600; color: #E6ECFF; margin-bottom: 8px; padding: 0; }
.demo-form input:not([type="radio"]) {
  width: 100%; height: 48px; padding: 0 14px; border-radius: var(--r-sm); font-size: 16px;
  background: #131B45; color: #E6ECFF; border: 2px solid #7480B8;
  transition: border-color var(--t-hover) ease;
}
@media (hover: hover) and (pointer: fine) { .demo-form input:not([type="radio"]):hover { border-color: #A6B0D6; } }
.demo-form input[aria-invalid="true"] { border-color: #FF8A7A; }
.rol-opts { display: flex; flex-wrap: wrap; gap: 8px; }
.rol-opt { position: relative; }
.rol-opt input { position: absolute; inset: 0; opacity: 0; margin: 0; cursor: pointer; }
.rol-opt span {
  display: inline-flex; align-items: center; min-height: 44px; padding: 0 16px; border-radius: var(--r-sm);
  border: 2px solid #7480B8; font-weight: 600; color: #E6ECFF;
  transition: background-color var(--t-hover) ease, color var(--t-hover) ease, border-color var(--t-hover) ease, transform var(--t-press) var(--ease-out);
}
.rol-opt input:checked + span { background: #E6ECFF; color: var(--navy); border-color: #E6ECFF; }
.rol-opt input:focus-visible + span { outline: 2px solid #FFC933; outline-offset: 2px; }
.rol-opt input[aria-invalid="true"] + span { border-color: #FF8A7A; }
.rol-opt input:active + span { transform: scale(0.97); }
.field-error { display: flex; gap: 6px; align-items: flex-start; margin-top: 8px; font-size: 14px; line-height: 20px; color: #FF8A7A; }
.field-error svg { flex: none; margin-top: 2px; }
.form-summary { font-size: 15px; line-height: 22px; font-weight: 600; color: #FF8A7A; }
.hp { position: absolute; left: -9999px; width: 1px; height: 1px; overflow: hidden; }
.form-done { display: flex; flex-direction: column; gap: 16px; padding-block: 24px; outline: none; }
.form-done-ic { display: grid; place-items: center; width: 48px; height: 48px; border-radius: var(--r-md); background: var(--sol); color: var(--navy); }
@media (prefers-reduced-motion: no-preference) {
  .field-error { animation: err-in 200ms var(--ease-out); }
  .form-done { animation: done-in 360ms var(--ease-out); }
}
@keyframes err-in { from { opacity: 0; transform: translateY(-4px); } }
@keyframes done-in { from { opacity: 0; transform: translateY(8px); } }
```

- [ ] **Step 4: Montar en `app/page.tsx` después de `<Preguntas />`**

```tsx
import { BandaFinal } from "@/components/sections/BandaFinal";
// …
<Preguntas />
<BandaFinal />
```

- [ ] **Step 5: Verificar a mano**

Run: `npm run dev`.
Expected:
- Enviar vacío muestra cuatro errores en voz de marca, el foco va a "Tu nombre" y el lector anuncia "Revisá 4 campos.".
- Al corregir, los errores se van mientras escribís.
- Un envío válido muestra "Enviando…" unos 600 ms (simulado en dev) y después "Listo, te escribimos en menos de [PLAZO]." con el foco en el mensaje.
- Con `NEXT_PUBLIC_DEMO_ENDPOINT=http://127.0.0.1:9` en `.env.local`, aparece el error con el email y los datos quedan cargados.

- [ ] **Step 6: Commit (si el repo existe)**

```bash
git add -A && git commit -m "feat: banda final con formulario de demo"
```

---

### Task 9: Íconos, imagen OG y servidor estático

**Files:**
- Create: `scripts/icons.mjs`, `scripts/serve.mjs`
- Output: `public/icon-32.png`, `public/icon-192.png`, `public/icon-512.png`, `public/apple-touch-icon.png`, `public/og.png`

**Interfaces:**
- Produces: `serve(port: number): Promise<import("node:http").Server>`, exportado desde `scripts/serve.mjs` y usado por `shots.mjs`.

- [ ] **Step 1: Escribir `scripts/icons.mjs`**

```js
import sharp from "sharp";
import { readFile } from "node:fs/promises";

const icon = await readFile("public/brand/pazzit-app-icon.svg");
for (const [name, size] of [["icon-32.png", 32], ["icon-192.png", 192], ["icon-512.png", 512]]) {
  await sharp(icon, { density: 384 }).resize(size, size).png().toFile(`public/${name}`);
}
// iOS pinta de negro las esquinas transparentes: se aplana sobre el azul de marca.
await sharp(icon, { density: 384 }).resize(180, 180).flatten({ background: "#2F5BFF" }).png().toFile("public/apple-touch-icon.png");

const lockup = await readFile("public/brand/pazzit-lockup-azul.svg");
const logo = await sharp(lockup, { density: 600 }).resize({ width: 720 }).png().toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: "#2F5BFF" } })
  .composite([{ input: logo, gravity: "center" }])
  .png()
  .toFile("public/og.png");
console.log("íconos y og.png generados en public/");
```

- [ ] **Step 2: Correrlo**

Run: `npm run icons`
Expected: `íconos y og.png generados en public/`. Abrí `public/og.png`: lockup blanco centrado sobre azul. Abrí `public/apple-touch-icon.png`: ticket blanco sobre azul con esquinas azules.

- [ ] **Step 3: Escribir `scripts/serve.mjs`**

```js
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, resolve, sep } from "node:path";

const root = resolve("out");
const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".json": "application/json",
  ".svg": "image/svg+xml", ".png": "image/png", ".ico": "image/x-icon", ".woff2": "font/woff2", ".txt": "text/plain",
};

export function serve(port = 3000) {
  return new Promise((done) => {
    const server = createServer(async (req, res) => {
      let path = decodeURIComponent(new URL(req.url ?? "/", "http://x").pathname);
      if (path.endsWith("/")) path += "index.html";
      const file = resolve(join(root, path));
      if (!file.startsWith(root + sep)) return res.writeHead(403).end();
      try {
        res.writeHead(200, { "Content-Type": TYPES[extname(file)] ?? "application/octet-stream" }).end(await readFile(file));
      } catch {
        try { res.writeHead(404, { "Content-Type": TYPES[".html"] }).end(await readFile(join(root, "404.html"))); }
        catch { res.writeHead(404).end(); }
      }
    });
    server.listen(port, () => done(server));
  });
}

if (process.argv[1]?.endsWith("serve.mjs")) {
  const port = Number(process.env.PORT) || 3000;
  await serve(port);
  console.log(`out/ en http://localhost:${port}`);
}
```

- [ ] **Step 4: Build y servir**

Run: `npm run build && npm start`
Expected: `out/ en http://localhost:3000`. La página carga completa, y `http://localhost:3000/og.png` y `/apple-touch-icon.png` responden 200.

- [ ] **Step 5: Commit (si el repo existe)**

```bash
git add -A && git commit -m "chore: íconos, imagen OG y servidor estático"
```

---

### Task 10: Capturas, gate de la skill, auditorías y Lighthouse

**Files:**
- Create: `scripts/shots.mjs`, `screenshots/*`
- Modify: lo que marquen las auditorías

- [ ] **Step 1: Escribir `scripts/shots.mjs`**

```js
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { serve } from "./serve.mjs";

const PORT = 4173;
const URL = `http://localhost:${PORT}/`;
const server = await serve(PORT);
const browser = await chromium.launch();
await mkdir("screenshots", { recursive: true });
let failed = false;

for (const width of [320, 360, 768, 1280, 1440]) {
  for (const colorScheme of ["light", "dark"]) {
    // reducedMotion: las capturas muestran el estado final de cada ritual.
    const page = await browser.newPage({ viewport: { width, height: 900 }, colorScheme, reducedMotion: "reduce" });
    await page.goto(URL, { waitUntil: "networkidle" });
    const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    if (over > 0) { failed = true; console.error(`✗ ${width}px ${colorScheme}: ${over}px de scroll horizontal`); }
    else console.log(`✓ ${width}px ${colorScheme}`);
    if (width !== 320) await page.screenshot({ path: `screenshots/${width}-${colorScheme}.png`, fullPage: true });
    await page.close();
  }
}

const nojs = await browser.newPage({ viewport: { width: 360, height: 900 }, javaScriptEnabled: false });
await nojs.goto(URL, { waitUntil: "networkidle" });
await nojs.screenshot({ path: "screenshots/360-light-sin-js.png", fullPage: true });

const zoom = await browser.newPage({ viewport: { width: 640, height: 900 }, deviceScaleFactor: 2 }); // 1280 al 200%
await zoom.goto(URL, { waitUntil: "networkidle" });
const overZoom = await zoom.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
if (overZoom > 0) { failed = true; console.error(`✗ zoom 200%: ${overZoom}px de scroll horizontal`); } else console.log("✓ zoom 200%");

await browser.close();
server.close();
process.exit(failed ? 1 : 0);
```

- [ ] **Step 2: Instalar el navegador y correr las capturas**

```bash
npx playwright install chromium
npm run build && npm run shots
```
Expected: 11 líneas `✓`, salida 0, y en `screenshots/` 9 PNG: 360, 768, 1280 y 1440, cada uno en claro y oscuro, más `360-light-sin-js.png`. Si aparece algún `✗`, abrí esa captura, encontrá el elemento que desborda (`document.querySelectorAll('*')` con `getBoundingClientRect().right > innerWidth`), corregilo y volvé a correr.

- [ ] **Step 3: Correr el gate de design-taste-frontend**

```bash
node .claude/skills/design-taste-frontend/scripts/lint.mjs app components
node .claude/skills/design-taste-frontend/scripts/inspect.mjs http://localhost:3000 --allow images
```
(con `npm start` corriendo en otra terminal)
Expected: sin `FAIL`. Cada `WARN` se corrige o se defiende en una línea en el reporte final. Las defensas previstas son tres:
- el h1 en 3 líneas a 360px (titular y tamaño fijados por la marca);
- el piso de imágenes (el brief prohíbe stock; las fotos son fragmentos `data-ui`);
- los radios de 14px (fijados por la marca).

- [ ] **Step 4: Mirar las capturas y criticarlas**

Abrí con Read las capturas de `.taste-skill/inspect/` y de `screenshots/` y criticalas con `.claude/skills/design-taste-frontend/references/critique.md`. Corregí los tres problemas principales, volvé a correr el Step 3 y mirá de nuevo. Son tres rondas como máximo.

- [ ] **Step 5: Auditorías con skills, en orden y corrigiendo todo lo que marquen**

1. Skill `high-end-visual-design`: pulido de espaciados y jerarquía.
2. Skills `emil-design-eng` y `apple-design`: estados hover, focus y pressed, y sensación táctil.
3. Skill `animation-performance`: confirmar que todo animado sea transform, opacity o clip-path. El único filtro es el `drop-shadow` estático del pase.
4. Skill `web-design-guidelines` sobre `app/` y `components/`.
5. Skill `break-ui`: textos largos (nombre de 40 caracteres en el slider, `[PRECIO]` largo), 320px, zoom 200%, sin JS, oscuro y reduced motion.
6. Skill `review-animations`, y después `improve-animations`: aplicar las mejoras de prioridad alta.

Después de cada corrección: `npm test && npm run build && npm run shots`, con salida 0.

- [ ] **Step 6: Lighthouse móvil**

```bash
npm start &
npx lighthouse http://localhost:3000 --preset=perf --form-factor=mobile --output=html --output-path=screenshots/lighthouse-perf.html --chrome-flags="--headless" --quiet
npx lighthouse http://localhost:3000 --form-factor=mobile --output=json --output-path=screenshots/lighthouse.json --chrome-flags="--headless" --quiet
node -e "const r=require('./screenshots/lighthouse.json').categories;for(const k in r)console.log(k, Math.round(r[k].score*100))"
```
Expected: performance, accessibility, best-practices y seo, todas en 90 o más. Si alguna queda por debajo, corregí lo que el informe marque y repetí.

- [ ] **Step 7: Commit (si el repo existe)**

```bash
git add -A && git commit -m "test: capturas, auditorías y correcciones"
```

---

### Task 11: README y lista de placeholders

**Files:**
- Create: `README.md`

- [ ] **Step 1: Escribir `README.md`**

````markdown
# Pazzit, landing

Landing estática de Pazzit (Next.js + Tailwind CSS). Todo el movimiento es CSS.

## Requisitos

- Node 22 o superior (probado con Node 24).

## Comandos

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # tests de validación del formulario
npm run build    # genera out/, el sitio estático listo para subir a cualquier hosting
npm start        # sirve out/ en http://localhost:3000
npm run icons    # regenera favicons, apple-touch-icon y og.png desde public/brand/
npm run shots    # capturas en screenshots/ y chequeo de scroll horizontal (antes: npm run build y npx playwright install chromium)
```

## Variables de entorno

Crealas en `.env.local`:

```
NEXT_PUBLIC_DEMO_ENDPOINT=https://tu-endpoint
NEXT_PUBLIC_SITE_URL=https://tu-dominio
```

- `NEXT_PUBLIC_DEMO_ENDPOINT` recibe un `POST` con JSON `{ nombre, rol, lugar, unidades, contacto, origen: "landing" }` y tiene que responder 2xx. Sirve cualquier servicio de formularios (Formspree, Getform, una función propia). Sin la variable, en `npm run dev` el envío se simula; en producción se muestra el mensaje de error con el email.
- `NEXT_PUBLIC_SITE_URL` es la URL pública, para la imagen de Open Graph.

Las dos se leen al compilar: después de cambiarlas, volvé a correr `npm run build`.

## Placeholders

Todos viven en `lib/site.ts`. Cambiá el valor y se actualiza en toda la página.

| clave | dónde aparece |
|---|---|
| `email` | footer y mensaje de error del formulario |
| `instagram`, `instagramUrl` | footer (con URL se vuelve link) |
| `precio`, `precioIncluye` | sección del piloto |
| `plazoRespuesta` | mensaje de éxito del formulario ("…en menos de [PLAZO].") |
| `terminosUrl`, `privacidadUrl` | footer (con URL se vuelven links) |
| `datosAlojamiento` | seguridad y privacidad |
| `faq.offline`, `faq.altaVecinos`, `faq.retencion`, `faq.implementacion` | preguntas frecuentes |

Los datos de ejemplo de las ilustraciones (Juan Pérez, la unidad 4°B, el registro del sábado 18) están en los componentes de `components/sections/` y son ficticios a propósito.

## Logos

`public/brand/` tiene los SVG originales del manual: no se editan ni se recolorean. Van siempre como `<img>`, porque todos comparten `mask id="m1"` y puestos inline en la misma página chocarían.
````

- [ ] **Step 2: Verificación final**

Run: `npm test && npm run build && npm run shots`
Expected: tests `# fail 0`, el build sin errores y las capturas con todo en `✓`.

- [ ] **Step 3: Reporte al usuario**

Incluí:
- la dirección (split stage, seed 1502073476) y los cambios respecto del spec;
- la frase de la idea y la cosa viva;
- los puntajes de la última crítica y de Lighthouse;
- las capturas (claro y oscuro, móvil y desktop);
- los WARN defendidos;
- la lista de placeholders de `lib/site.ts` con su valor actual.

- [ ] **Step 4: Commit (si el repo existe)**

```bash
git add -A && git commit -m "docs: README y placeholders"
```
