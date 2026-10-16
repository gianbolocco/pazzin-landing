# Pazzit — landing page · spec de diseño

Fecha: 2026-10-16 · Estado: aprobado

> **Enmiendas:** el plan `docs/superpowers/plans/2026-10-16-pazzit-landing.md` (sección "Cambios respecto del spec") aplica la dirección de arte "split stage" de design-taste-frontend y reemplaza Motion por CSS. Donde contradiga este spec, manda el plan.

## 1. Objetivo

Landing de Pazzit, app de acceso para visitas en barrios cerrados y edificios de Argentina. Dos trabajos, en este orden:

1. Que un administrador de consorcio o un consejo de barrio pida una demo o un piloto.
2. Que un vecino entienda en 10 segundos cómo funciona y se lo recomiende a su administración.

Idioma: español rioplatense con voseo. Toda la copy en sentence case. Tono: un buen portero de barrio (corto, cálido, resolutivo). Permiso, no control: nada de estética de vigilancia.

Criterios de éxito (todos verificables):

- Sin scroll horizontal desde 320px; capturas en 360, 768, 1280 y 1440, claro y oscuro.
- Lighthouse móvil ≥ 90 en Performance, Accessibility, Best Practices y SEO.
- WCAG AA: contraste según tokens, foco visible, navegación completa por teclado, labels reales, áreas táctiles ≥ 44px.
- La página es legible y usable sin JavaScript (salvo el envío asíncrono del form, que cae al `action` nativo).
- Con `prefers-reduced-motion: reduce` no hay movimiento: se ve el estado final del pase.
- Cero datos inventados: métricas, testimonios, logos de clientes, premios o prensa. Lo que falte va como placeholder `[ ]`.

## 2. Stack

Next.js 15 (App Router, `output: "export"`) + Tailwind CSS v4 + Motion (`motion/react`), con fuentes vía `next/font/google`.

- El export estático entrega HTML puro: hosting en cualquier CDN y Lighthouse alto sin pelearlo.
- Tailwind v4 lee los tokens desde CSS variables (`@theme`), así que el modo oscuro es solo cambiar variables.
- Motion se carga solo en la isla del pase del hero; el resto del movimiento es CSS.

Dependencias de producción: `next`, `react`, `react-dom`, `motion`, `lucide-react`. De desarrollo: `tailwindcss`, `@tailwindcss/postcss`, `typescript`, `@types/*`, `sharp` (generación de íconos), `@playwright/test` (capturas). Nada más.

Descartados: Astro (menos JS, pero sale del stack por defecto) y HTML plano (sin `next/font` ni componentes).

## 3. Marca (fija, no se reinterpreta)

### 3.1 Logo

Fuente: `C:\Users\gianl\Downloads\pazzit-logos\`. Se copian tal cual a `public/brand/`, sin redibujar ni recolorear.

| archivo | uso en la landing |
|---|---|
| `pazzit-lockup-claro.svg` | header y footer en tema claro |
| `pazzit-lockup-oscuro.svg` | header y footer en tema oscuro; banda final navy |
| `pazzit-lockup-azul.svg` | sobre fondo azul de marca (si se usa) |
| `pazzit-mark-*.svg` | isotipo suelto (no se requiere en la v1) |
| `pazzit-app-icon.svg` | favicon claro, apple-touch-icon, base de la imagen OG |
| `pazzit-app-icon-noche.svg` | favicon en `prefers-color-scheme: dark` |

Todos los SVG usan `<mask id="m1">`. Si se insertan inline dos en el mismo documento, los ids colisionan. **Regla: los logos se insertan como `<img src="/brand/...svg">`, nunca inline.** El cambio claro/oscuro se hace renderizando ambos `<img>` y ocultando uno por CSS según el tema.

Reglas de uso: lockup ≥ 100px de ancho, isotipo ≥ 24px; margen libre alrededor igual a la altura de la "a"; sin estirar, sombras ni degradados. En texto la marca se escribe "Pazzit". El `alt` del lockup es `"Pazzit"`, y en el header va dentro del link a `/` con `aria-label="Pazzit, inicio"`.

### 3.2 Tokens de color

Se implementan en `app/globals.css` como CSS variables. El tema claro va en `:root`. El oscuro se aplica con `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) {…} }` y con `:root[data-theme="dark"] {…}`.

| token | claro | oscuro | uso |
|---|---|---|---|
| `--azul` | #2F5BFF | #2F5BFF | marca, botón principal (texto blanco 5.2:1) |
| `--azul-text` | #2F5BFF | #7D93FF | links y texto de marca |
| `--azul-tint` | #E3E9FF | #24306A | chips, bandas suaves, estado "invitado" |
| `--sol` | #FFC933 | #FFC933 | acento, una cosa por pantalla; texto encima siempre navy; nunca texto sol sobre fondo claro |
| `--navy` | #0B1640 | #0B1640 | tinta fija: bandas oscuras, texto sobre sol |
| `--bg` | #F3F6FF | #0A1030 | fondo de página |
| `--surface` | #FFFFFF | #131B45 | tarjetas y pase |
| `--text` | #0B1640 | #E6ECFF | texto principal |
| `--text-muted` | #4A5578 | #A6B0D6 | texto secundario |
| `--line` | #E1E6F5 | #24306A | divisores |
| `--control-border` | #7C86A8 | #7480B8 | bordes de inputs (≥ 3:1) |
| `--verde` / `--verde-tint` | #0E7A55 / #E2F6EC | #5BE0A8 / #0F2B26 | estado "validado" |
| `--espera` / `--espera-tint` | #8A5A00 / #FFF3D1 | #FFD166 / #2E2410 | estado "esperando" |
| `--alto` / `--alto-tint` | #B42318 / #FDE7E4 | #FF8A7A / #3A1620 | error o "vencido" |
| `--focus` | #2F5BFF | #FFC933 | anillo de foco: 2px, offset 2px |

Proporción: ~60% fondos y texto, ~30% azul, ≤ 10% sol. Verde, ámbar y rojo solo para estados, y siempre acompañados de su palabra.

**Dónde va el sol, una vez por pantalla:** el talón validado del pase (hero), el número activo o el badge del paso 3 (cómo funciona), el botón de envío (banda final). Ninguna otra sección usa sol.

En `@theme`, Tailwind expone los colores como `bg-bg`, `bg-surface`, `text-text`, `text-muted`, `border-line`, `bg-azul`, `text-azul-text`, `bg-azul-tint`, `bg-sol`, `text-navy`, `text-verde`, `bg-verde-tint`, etc. (`--color-*: var(--token)`).

`color-scheme: light` / `dark` se declara en `:root` según el tema, para que los controles nativos y las scrollbars acompañen.

### 3.3 Tipografía

- **Onest** (400/600/700/800, `display: swap`, subset latin) para todo el sitio. Variable `--font-onest`.
- **Bagel Fat One** (400, `display: swap`, `preload: false`) se usa una sola vez: la frase "pasá nomás" en la banda final. Nunca en párrafos, botones ni navegación.

Escala (utilidades en `@theme` como `--text-*` con line-height, letter-spacing y peso):

| nombre | desktop | móvil | peso | tracking |
|---|---|---|---|---|
| `display-xl` | 64/64 | 40/44 | 800 | -2px (móvil -1px) |
| `display` | 44/48 | 32/36 | 800 | -1px |
| `title` | 28/34 | 24/30 | 700 | -0.5px |
| `heading` | 20/28 | 20/28 | 700 | 0 |
| `lead` | 20/30 | 18/28 | 400 | 0 |
| `body` | 16/26 | 16/26 | 400 | 0 |
| `small` | 14/20 | 14/20 | 400 | 0 |
| `caption` | 12/16 | 12/16 | 600 | 0.2px |

Hay un solo `display-xl` en la página (el titular del hero). Los párrafos llevan `max-width: 65ch`. Los titulares usan `text-wrap: balance` y los párrafos `text-wrap: pretty`. No hay eyebrows en mayúsculas sobre los títulos.

### 3.4 Forma

- Radios: `--r-sm: 8px` (inputs, chips), `--r-md: 14px` (botones, tarjetas), `--r-lg: 24px` (pase y bloques destacados). Nada recto, nada todo píldora.
- Grilla de 4px. Secciones separadas por 96px en desktop (≥ 1024) y 48px en móvil. Gutter lateral: 16px en móvil, 32px en tablet, contenedor máximo de 1200px.
- Recurso propio: las muescas del ticket y la línea punteada. Se usan en el pase y en la banda de piloto, en ningún otro lado.
- Plano: **solo el pase lleva sombra** (`--shadow-pase: 0 14px 32px rgba(11,22,64,.14)`; en oscuro `0 14px 32px rgba(0,0,0,.35)`). Las tarjetas se separan con `--line` o con `--surface` sobre `--bg`.
- Íconos: `lucide-react`, `strokeWidth={2}`, puntas redondeadas, `aria-hidden` cuando son decorativos. Sin emojis.

## 4. Arquitectura

```
app/
  layout.tsx          fuentes, metadata/OG/íconos, lang="es-AR", script inline de tema
  page.tsx            compone las secciones en orden
  globals.css         tokens, @theme, base, utilidades propias (ticket, focus)
public/
  brand/              SVG del zip, sin modificar
  og.png              generada por scripts/icons.mjs (1200×630)
  favicon.ico, icon-32.png, icon-192.png, apple-touch-icon.png  generadas
components/
  Logo.tsx            <img> claro + oscuro, alternados por CSS
  Pass.tsx            markup del pase (server, sin estado); prop `state: "invitado" | "validado"`
  PassHero.tsx        "use client": envuelve Pass con la animación de marca
  ThemeToggle.tsx     "use client": botón claro/oscuro/sistema
  MobileNav.tsx       "use client": menú colapsable
  DemoForm.tsx        "use client": formulario, validación y estados
  Button.tsx          estilos de botón (primary/secondary/sol) como <a> o <button>
  sections/
    Header.tsx  Hero.tsx  Problema.tsx  ComoFunciona.tsx  ParaQuien.tsx
    Seguridad.tsx  Piloto.tsx  Preguntas.tsx  BandaFinal.tsx  Footer.tsx
lib/
  demo.ts             validate() puro + submit(); mensajes en voz de marca
  demo.test.ts        node:test sobre validate()
  site.ts             placeholders centralizados (PRECIO, EMAIL, PLAZO, REDES, etc.)
scripts/
  icons.mjs           sharp: favicons PNG, apple-touch-icon, OG
  shots.mjs           Playwright: capturas + chequeo de overflow a 320px
```

Todo es Server Component por defecto. Islas cliente solo en: `ThemeToggle`, `MobileNav`, `PassHero` y `DemoForm`.

**Placeholders centralizados:** todos los `[ ]` viven en `lib/site.ts`. Para cambiar un placeholder se toca un solo archivo, y el README lo documenta.

## 5. Secciones y copy

Las anclas del header apuntan a ids de sección: `#como-funciona`, `#para-quien`, `#seguridad`, `#preguntas`, `#demo`. Cada sección es un `<section aria-labelledby>` con su `h2`. Las anclas compensan el header sticky con `scroll-margin-top`.

### 5.1 Header (sticky, `<header>` + `<nav aria-label="Principal">`)

- Izquierda: logo (link a `#top`).
- Desktop (≥ 1024): links "Cómo funciona", "Para quién", "Seguridad", "Preguntas"; toggle de tema; botón primario "Pedí una demo" → `#demo`.
- Móvil: logo, botón primario chico "Pedí una demo" (si entra en 360; en 320 se oculta y queda en el menú) y botón de menú (`aria-expanded`, `aria-controls`, ícono Menu/X, 44×44). El panel se despliega abajo con los links, el toggle de tema y el CTA. Se cierra con Escape, al tocar un link o al hacer clic fuera, y devuelve el foco al botón.
- El menú móvil es un `<details>` cuyo `<summary>` es el botón: abre y cierra sin JS. JS solo suma el cierre con Escape, con clic fuera y al tocar un link, y sincroniza `aria-expanded`.
- Fondo `--bg` al 85% con `backdrop-filter: blur(12px)` y borde inferior `--line` cuando hubo scroll. Sin sombra.
- Link "Saltar al contenido" como primer elemento enfocable.

### 5.2 Hero (`#top`)

- `h1` (display-xl): "Tus visitas entran sin vueltas."
- Bajada (lead, muted): "El vecino invita, la visita recibe su pase por WhatsApp y la portería lo valida con un escaneo. Sin cuaderno, sin llamadas, todo registrado."
- CTAs: "Pedí una demo" (primario azul → `#demo`) y "Ver cómo funciona" (secundario: texto `--azul-text` con borde `--control-border` → `#como-funciona`).
- Visual: `PassHero`. En desktop, dos columnas (texto 6/12, pase 6/12). En móvil, el pase va debajo de los CTAs a todo el ancho.
- Wireframe:

```
┌──────────────────────────────────────────────────────────────────────┐
│ [lockup]   Cómo funciona  Para quién  Seguridad  Preguntas  ◐  [Pedí una demo] │
├──────────────────────────────────────────────────────────────────────┤
│  Tus visitas entran            ┌───────────────────────╮┊╭─────────┐  │
│  sin vueltas.                  │ (Invitado)             ┊          │  │
│                                ( Juan Pérez             ┊  ▓▓ ▓▓   )  │
│  El vecino invita, la visita   │ Plomero para la 4°B    ┊  ▓ ▓▓▓   │  │
│  recibe su pase por WhatsApp…  │ Sáb 18, de 10 a 12 h   ┊  ▓▓ ▓    │  │
│                                └───────────────────────╯┊╰─────────┘  │
│  [Pedí una demo]  Ver cómo funciona                                    │
└──────────────────────────────────────────────────────────────────────┘
```

### 5.3 El pase (`Pass.tsx`)

Ticket horizontal en HTML/CSS, no imagen, con `role="img"` y `aria-label` dinámico ("Pase de visita de Juan Pérez, plomero para la unidad 4°B, sábado 18 de 10 a 12 h. Estado: validado.").

- Contenedor `--surface`, radio 24px, `--shadow-pase`. Las muescas laterales se hacen con `mask` CSS (`radial-gradient` en los bordes izquierdo y derecho, a la altura del corte) para que sean transparentes de verdad sobre cualquier fondo. Fallback sin soporte de mask: círculos del color `--bg`.
- Cuerpo (izquierda, ~68%):
  - Chip de estado (caption, radio 8px): "Invitado" (`--azul-tint` / `--azul-text`, ícono `Clock`) o "Validado" (`--verde-tint` / `--verde`, ícono `Check`).
  - Nombre (title): "Juan Pérez".
  - Motivo (body, muted): "Plomero para la unidad 4°B".
  - Horario (small, con ícono `CalendarClock`): "Sáb 18, de 10 a 12 h".
- Corte: línea punteada vertical, un SVG `<line>` con `stroke-dasharray` y `stroke-linecap: round`, en `--line` (inactivo) o `--control-border` (marcado). Muescas superior e inferior sobre el corte (también por mask).
- Talón (derecha, ~32%): QR decorativo (SVG estático generado una vez, 21×21 módulos, `aria-hidden`), en `--text` sobre `--surface` cuando está invitado y en `--navy` sobre `--sol` cuando está validado. QR de 96px en desktop; nunca menos de 72px.
- En 320px: el pase mantiene la proporción con `container-type: inline-size`, la tipografía del nombre baja a heading y el QR queda en 72px.

### 5.4 Movimiento de marca (`PassHero.tsx`)

Es el único momento de marca. Arranca al montar, una sola vez, y dura en total 1,4 s. Curva `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-quint).

| t (ms) | qué pasa | propiedades |
|---|---|---|
| 0–350 | aparece el pase | `opacity` 0→1, `translateY` 12px→0 |
| 300–700 | se marca la línea del corte | `stroke-dashoffset` en el SVG del corte (elemento chico; costo de paint despreciable) |
| 700–1100 | el talón se pinta de sol y se corre 8px | capa sol encima del talón `opacity` 0→1; talón `translateX` 0→8px; QR navy en crossfade (`opacity`) |
| 1000–1400 | "Invitado" → "Validado" | crossfade de los dos chips (`opacity` + `translateY` 4px) |

- Repetible: `onPointerEnter` (solo `pointer: fine`) y tap (`onClick`) reinician la secuencia desde "invitado". No se reinicia si ya hay una secuencia en curso. Con teclado: el pase no es enfocable (es decorativo, ya está descrito por `aria-label`), así que no hay repetición con teclado.
- `prefers-reduced-motion: reduce` (con `useReducedMotion` de Motion) renderiza directo el estado "validado", sin animación ni repetición.
- Sin JS: el HTML del servidor es el estado "validado" final y se ve tal cual.
- Con JS: el script de `<head>` agrega la clase `js` a `<html>`. La regla `@media (prefers-reduced-motion: no-preference) { .js [data-pass-hero]:not([data-ready]) { opacity: 0 } }` oculta el pase hasta que `PassHero` monta. Al montar pasa a "invitado", marca `data-ready` y corre la secuencia. Resultado: no se ve el validado del SSR y después un salto a invitado.
- Solo `transform` y `opacity`, más `stroke-dashoffset` en un SVG de 1px de ancho. Nada de `left`, `width`, `background-color` animado ni `box-shadow` animado.

Fuera de ese momento: transiciones de 150–250 ms (`ease-out`) en hover, focus y pressed. Botones: hover cambia el fondo (transición de color, 150 ms) y pressed hace `scale(0.97)` (100 ms). Nada de fade-in por sección ni parallax.

### 5.5 El problema

- `h2` (display): "La entrada no tendría que ser un trámite."
- Tres puntos en una sola fila (desktop) o en columna (móvil), cada uno con ícono Lucide y texto. Sin tarjetas: separados por `--line`.
  1. `NotebookPen`: "El cuaderno de la entrada que nadie lee." / "Nombres a mano, letra ilegible y nada para buscar cuando hace falta."
  2. `PhoneCall`: "Una llamada al departamento por cada delivery." / "El portero llama, el vecino no atiende, la visita espera en la vereda."
  3. `MessageCircleQuestion`: "«¿Quién dejó pasar a quién?»" / "Reclamos sin respuesta porque no queda registro de nada."

### 5.6 Cómo funciona (`#como-funciona`)

- `h2` (display): "Cómo funciona."
- Tres pasos numerados (es una secuencia real). Cada paso: número grande en un círculo (`--azul-tint`; el paso 3 en `--sol` con texto navy, que es el acento sol de esta pantalla), título (heading), texto (body) y una mini UI distinta, hecha en HTML/CSS.
  1. "Invitá" — "Cargás nombre y horario. Tarda 15 segundos." · Mini UI: dos campos falsos (nombre: "Juan Pérez", horario: "Sáb 18, 10–12 h") y un botón "Invitar". Todo `aria-hidden`; es ilustración.
  2. "Llega el pase" — "Tu visita lo recibe por WhatsApp. No instala nada." · Mini UI: burbuja de chat genérica (sin logo ni verde de WhatsApp) con "Tu pase para entrar el sáb 18 →".
  3. "Pasá nomás" — "En la entrada lo escanean y te avisamos que llegó." · Mini UI: chip "Validado" verde con "Juan Pérez llegó · 10:04".
- Los pasos se conectan con una línea punteada: horizontal en desktop (pasa por detrás de los números) y vertical a la izquierda en móvil. Es decorativa.
- Es una `<ol>` semántica.

```
  ①── Invitá ──────────── ②── Llega el pase ──────── ③── Pasá nomás
  Cargás nombre y         Tu visita lo recibe        En la entrada lo
  horario. Tarda 15 s.    por WhatsApp. No           escanean y te
                          instala nada.              avisamos que llegó.
  ┌ Juan Pérez ┐          ╭ Tu pase para ╮           (✓ Validado)
  └ Sáb 18 …   ┘ [Invitar]╰ entrar… →    ╯           Juan Pérez llegó · 10:04

móvil:
  ① Invitá
  ┊  Cargás nombre…  [mini UI]
  ② Llega el pase
  ┊  …
  ③ Pasá nomás
```

### 5.7 Para quién (`#para-quien`)

- `h2` (display): "Hecho para los tres lados de la puerta."
- Tres bloques asimétricos, todos visibles y sin JS. Desktop: grilla de 12 columnas; Administración ocupa 7 columnas y 2 filas, Vecinos y Portería 5 columnas cada uno, apilados. Móvil: Administración primero, después Vecinos y Portería.
- **Administración** (`--surface`, radio 24px, el bloque más desarrollado):
  - `h3` (title): "Administración"
  - Lead: "Historial buscable, menos reclamos, todo en orden."
  - Lista con íconos `Check`: "Cada ingreso queda registrado con fecha, hora y quién lo autorizó." · "Buscás por unidad, por nombre o por día." · "Cuando hay un reclamo, tenés el dato en vez de una discusión."
  - Mini registro (tabla HTML real con `<caption class="sr-only">`, 3 filas de ejemplo con datos de muestra marcados como "ejemplo"): hora · visita · unidad · estado (chip con palabra: "Validado", "Esperando", "Vencido").
  - Link "Pedí una demo para tu administración" → `#demo`.
- **Vecinos** (`--surface`, radio 14px): `h3` "Vecinos" · "Invitás desde el celu y te enterás cuando llegan." · puntos: "Sin llamadas a la portería." · "Tu visita no instala nada."
- **Portería** (`--surface`, radio 14px): `h3` "Portería" · "Validás en un segundo, sin llamar a nadie." · dos puntos: "Escaneás el QR y ves quién es y a dónde va." · "Todo queda anotado solo; chau cuaderno."

Solo se afirman funciones descritas en el brief (invitar, pase por WhatsApp, validación por QR, aviso de llegada, registro buscable). Funciones como exportar, invitaciones recurrentes o alta masiva no se mencionan hasta que se confirmen.

### 5.8 Seguridad y privacidad (`#seguridad`)

- `h2` (display): "Seguridad sin vueltas."
- Intro (lead): "Cuidamos el acceso a tu edificio y los datos de quienes entran."
- Tres puntos (sin tarjetas, dos columnas en desktop: intro a la izquierda y lista a la derecha):
  - `TimerOff`: "Pases con vencimiento." / "Cada pase vale solo para el horario que cargaste. Después, deja de funcionar."
  - `ListChecks`: "Registro de cada ingreso." / "Queda anotado quién invitó, quién entró y a qué hora."
  - `ShieldCheck` (trazo fino, sin estética agresiva): "Datos tratados según la Ley 25.326." / "Tratamos los datos personales según la Ley 25.326 de Protección de Datos Personales. [COMPLETAR: dónde se alojan los datos y quién es el responsable registrado]"
- Sin promesas absolutas ("100% seguro", "imposible de falsificar" están prohibidas).

### 5.9 Piloto y precio

- Banda destacada `--azul-tint` con radio 24px, recortada con las muescas del ticket a los lados (mask CSS) y una línea punteada vertical que separa las dos mitades en desktop (horizontal en móvil).
- Izquierda: `h2` (display) "Probalo gratis 30 días en un edificio." · body: "Lo ponemos en marcha con tu portería y lo usan de verdad durante un mes."
- Derecha: precio (title) "[PRECIO] por unidad por mes" · small muted "[COMPLETAR: qué incluye el precio]". Botón primario "Pedí el piloto" → `#demo`.
- Bloque de prueba social (oculto por defecto): `site.ts` tiene `socialProof: null`. Si se completa, se renderiza debajo de la banda con el texto que se cargue. Mientras sea `null` no aparece nada.

### 5.10 Preguntas frecuentes (`#preguntas`)

- `h2` (display): "Preguntas frecuentes."
- Acordeón con `<details name="faq">` nativo (exclusivo en navegadores que lo soportan): accesible por teclado sin JS, ícono `ChevronDown` que rota 180° en 200 ms. Cada `<summary>` es heading (`h3` interno), con un área mínima de 44px.
  1. "¿La visita tiene que instalar algo?" → "No. Recibe el pase por WhatsApp y lo muestra en la entrada. Solo necesita un celular con WhatsApp."
  2. "¿Qué pasa si se corta internet en la entrada?" → "[COMPLETAR: comportamiento offline de la app de portería]"
  3. "¿Cómo se carga a los vecinos?" → "[COMPLETAR: proceso de alta de vecinos (planilla, invitación por link, etc.)]"
  4. "¿Qué datos se guardan y por cuánto tiempo?" → "Guardamos lo necesario para registrar cada ingreso: nombre de la visita, unidad, horario y quién la invitó. [COMPLETAR: plazo de retención] Los datos se tratan según la Ley 25.326."
  5. "¿Cuánto tarda la implementación?" → "[COMPLETAR: plazo típico de implementación]"

### 5.11 Banda final (`#demo`, fondo navy)

- Fondo `--navy` en ambos temas, texto `#E6ECFF` / muted `#A6B0D6`, radio 24px dentro del contenedor (no full-bleed). Sin logo dentro de la banda.
- Frase de campaña: "pasá nomás" en Bagel Fat One (es el único uso en la página), 56px desktop / 40px móvil, color `#FFFFFF`. Se marca como `<p aria-hidden="true">` decorativo, y el `h2` real es "Pedí una demo" (title, visible).
- Subtexto: "Contanos de tu edificio o barrio y te escribimos."
- Formulario (`DemoForm`), `noValidate` con validación propia:

| campo | tipo | requerido | label | error |
|---|---|---|---|---|
| nombre | `text`, `autocomplete="name"` | sí | "Tu nombre" | "Falta tu nombre para saber a quién escribirle." |
| rol | radios: Vecino / Administrador / Portería, en `<fieldset><legend>` | sí | "Sos…" | "Elegí qué rol tenés así te mostramos lo que te sirve." |
| lugar | `text`, `autocomplete="organization"` | sí | "Barrio o edificio" | "Falta el nombre del barrio o edificio." |
| unidades | `number`, `inputmode="numeric"`, min 1 | no | "Cantidad de unidades (opcional)" | "Poné un número de unidades, por ejemplo 40." (solo si no es un entero ≥ 1) |
| contacto | `text`, `autocomplete="email"` | sí | "WhatsApp o email" | vacío: "Falta tu WhatsApp o email para poder escribirte." · inválido: "Revisá el WhatsApp o el email; así no nos llega." |

- Contacto válido: email (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`) o teléfono (8–15 dígitos después de quitar espacios, guiones, paréntesis y `+`).
- Inputs: fondo `#131B45`, borde `#7480B8` (control-border oscuro, porque la banda es navy fija), texto `#E6ECFF`, radio 8px, alto 48px. En error: borde `#FF8A7A` y mensaje en `#FF8A7A` con ícono `CircleAlert`, ambos con la palabra.
- Botón de envío: `--sol` con texto navy, "Pedí una demo", alto 52px, ancho completo en móvil. Es el acento sol de esta pantalla.
- Comportamiento:
  - Se valida al enviar. Después del primer intento, cada campo se revalida en blur y en input.
  - Errores inline con `aria-invalid` y `aria-describedby`. El foco va al primer campo inválido. Un resumen `role="alert"` anuncia "Revisá N campos." en un solo mensaje.
  - Estados: `idle → enviando` (botón deshabilitado con `aria-busy`, texto "Enviando…") `→ éxito | error`.
  - Éxito: el form se reemplaza por un mensaje con foco programático (`tabIndex=-1`, `role="status"`): "Listo, te escribimos en menos de [PLAZO]." Si `PLAZO` se completa en `site.ts` se muestra; mientras tanto el placeholder queda visible.
  - Error de red o no-2xx: "No pudimos enviarlo. Probá de nuevo o escribinos a [EMAIL]." Los datos no se borran.
- Endpoint: `process.env.NEXT_PUBLIC_DEMO_ENDPOINT`. `submit()` hace `POST` con JSON `{nombre, rol, lugar, unidades, contacto, origen: "landing"}`. Si la variable no está definida: en `development` espera 600 ms y resuelve OK (simulación, con `console.info`); en producción muestra el estado de error con el email. El `<form>` lleva `action={endpoint}` y `method="post"` como fallback sin JS.
- Honeypot anti-spam: campo oculto `empresa`. Si viene completo, `submit()` simula éxito y no envía.

### 5.12 Footer

- Fondo `--bg` con borde superior `--line`.
- Lockup (según tema) + eslogan "Pasá nomás." (body, muted, Onest; no Bagel).
- Links: los mismos del header + "Pedí una demo".
- Contacto: "[EMAIL]" (como `mailto:` cuando se complete). Redes: "[@pazzit]" (link a Instagram cuando se complete).
- Legales: "Términos" y "Privacidad" → `[COMPLETAR: URL]` (si son `null`, se muestran como texto sin link). "© 2026 Pazzit."

## 6. Tema claro/oscuro

- Por defecto sigue `prefers-color-scheme`.
- `ThemeToggle`: un botón de 44×44 con ícono `Sun`/`Moon` que alterna entre claro y oscuro y guarda la elección en `localStorage["pazzit-theme"]` (try/catch en lectura y escritura). `aria-label` dinámico: "Cambiar a tema oscuro" / "Cambiar a tema claro". Sin JS no se ve (`hidden` hasta hidratar) y manda el sistema.
- Script inline en `<head>` (antes del CSS de la página, menos de 300 bytes): lee el localStorage con try/catch, pone `data-theme` en `<html>` y agrega la clase `js`. Evita el flash de tema.
- `<meta name="theme-color">` con dos entradas por media query (`#F3F6FF` / `#0A1030`).
- El logo cambia de versión por CSS: `[data-theme=dark] .logo-claro{display:none}`, más la regla equivalente con media query.

## 7. SEO y metadatos

- `title`: "Pazzit, el pase de tus visitas"
- `description`: "Tus visitas entran sin vueltas. El vecino invita, la visita recibe su pase por WhatsApp y la portería lo valida con un escaneo. Para barrios cerrados y edificios."
- `lang="es-AR"`, `og:locale="es_AR"`, `og:type="website"`, `og:site_name="Pazzit"`, `metadataBase` desde `NEXT_PUBLIC_SITE_URL` (placeholder `[URL]`, fallback `http://localhost:3000`).
- Imagen OG 1200×630 generada por `scripts/icons.mjs`: fondo `#2F5BFF`, `pazzit-lockup-azul.svg` centrado (60% de ancho), sin texto adicional. Twitter card `summary_large_image`.
- Íconos: `favicon.ico` (16/32/48 desde `pazzit-app-icon.svg`), `icon-32.png` y `icon-192.png`, `apple-touch-icon.png` 180×180, y dos `<link rel="icon" type="image/svg+xml">` con `media="(prefers-color-scheme: light|dark)"` que apuntan a `pazzit-app-icon.svg` y `pazzit-app-icon-noche.svg`. Se declaran en `metadata.icons`; no se usan los archivos-convención `app/icon.*` para no duplicar los links.
- Un `<h1>` único y jerarquía de headings sin saltos.

## 8. Accesibilidad (checklist del build)

- Foco: `:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }` en todo lo interactivo. En la banda navy el foco usa siempre `#FFC933`.
- Contrastes verificados con los tokens. El texto muted sobre `--azul-tint` se revisa: si da menos de 4.5:1 se usa `--text`.
- Áreas táctiles ≥ 44×44 (links del nav en móvil, toggle, summary del FAQ, radios del form con label clickeable).
- Landmarks: `header`, `nav`, `main#contenido`, `footer`. Link de salto al contenido.
- Zoom al 200% sin pérdida de contenido. Sin `user-scalable=no`.
- `prefers-reduced-motion`: además del pase, se desactivan las transiciones de transform (scale de los botones) y se mantienen solo los cambios de color.
- Ilustraciones (mini UIs, QR) con `aria-hidden`. El pase lleva `role="img"` + `aria-label`.

## 9. Rendimiento

- Export estático. Sin imágenes raster en la página (solo SVG). Fuentes con `next/font` (self-hosted, `display: swap`). Onest con preload; Bagel con `preload: false`.
- Motion: import directo de `motion/react` solo en `PassHero`. No se usa `LazyMotion` salvo que el bundle de la ruta supere 100 kB gz de first-load JS; en ese caso se usa `LazyMotion` + `m` + `domAnimation`.
- Lucide: imports nombrados (tree-shaking).
- Objetivo: LCP < 2,5 s y CLS < 0,05 en Lighthouse móvil. El pase reserva su alto con `aspect-ratio` para no generar CLS.

## 10. Verificación

1. `node --test lib/demo.test.ts` (con `--experimental-strip-types`, nativo en Node 24): casos de `validate()`, que son vacíos por campo, email válido/inválido, teléfono con formato argentino (`+54 9 11 1234-5678`), unidades no numéricas y honeypot.
2. `npm run build`, que tiene que terminar sin errores ni warnings de tipos.
3. `scripts/shots.mjs` (Playwright sobre `next start` / `out/` servido): capturas `full-page` en 360, 768, 1280 y 1440 × claro/oscuro en `screenshots/`, más la aserción `document.documentElement.scrollWidth <= innerWidth` a 320, 360, 768, 1280 y 1440.
4. Lighthouse móvil sobre el build (`npx lighthouse`) con un informe en `screenshots/lighthouse.html`.
5. Auditorías con skills, corrigiendo todo lo que marquen: `web-design-guidelines` → `break-ui` (textos largos, 320px, zoom 200%, sin JS, oscuro, reduced motion) → `review-animations` → `improve-animations`.

## 11. Entrega

- Proyecto completo.
- `README.md`: requisitos, `npm install`, `npm run dev`, `npm run build`, cómo generar íconos (`npm run icons`) y capturas (`npm run shots`), cómo configurar `NEXT_PUBLIC_DEMO_ENDPOINT` y `NEXT_PUBLIC_SITE_URL`, y la tabla de placeholders (todos en `lib/site.ts`).
- Capturas en `screenshots/`.
- Lista final de placeholders pendientes.

## 12. Fuera de alcance

- Backend del formulario, analytics, CMS e i18n.
- Páginas de términos y privacidad (solo los links con placeholder).
- Blog, pricing detallado y login.
- La skill `pick-ui-library` (no está instalada; la elección de stack ya queda justificada en §2).
