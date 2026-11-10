# Landing de Pazzit v2 — spec

Reemplaza a la landing del 16/10 (`2026-10-16-pazzit-landing-design.md`). Se rehace de cero:
otro lector, otra narrativa, y solo funciones que existen en `invitacionesQR` (rama `dev`).

## Objetivo

- **Lector:** la comisión directiva y la administración del barrio. Deciden y pagan.
  Vecinos y guardia aparecen como beneficio, no como público.
- **Narrativa:** la misma del brochure de noviembre (`documentacion/brochure/spec.md` y
  `paginas.js`): cuatro dolores con su "Hoy" y su "Con Pazzit", y una sección de **horas de guardia
  que se recuperan** según los ingresos por día del barrio, con la cuenta y los supuestos a la
  vista (no va en el hero).
- **Una acción:** "Pedí una demo" (ver *Decisiones*).

## 1. Auditoría: lo que la landing actual promete y no existe

Contrastado con el README de `invitacionesQR` y el código de `web/src/app`.

### Se saca

| Dónde | Qué dice | Por qué se saca |
|---|---|---|
| Hero, Cómo funciona, Para quién | "Te avisamos que llegó", "Le avisamos a la 4°B: Juan llegó", "te enterás cuando llegan" | **No existe.** Está en *Pendiente* del README ("Aviso al vecino cuando su invitado llega a la barrera"). El único aviso push es el de paquetes. |
| Cómo funciona | "Invitá: tarda 15 segundos" | No está medido. Los 15 s del brochure son del **ingreso en la garita**, no de crear la invitación. |
| Para quién · Registro | Estados "Esperando / Validado / Vencido", chip "Invitado" | No es el vocabulario de la app. La garita dice **PASA / NO PASA** con motivo, y las listas son **Por llegar / Adentro / Se fueron**. |
| Para quién · Detalle | "Validó: Portería, entrada principal" | No hay entradas múltiples en el modelo (no hay tabla de accesos). Lo que sí queda es **qué guardia** registró el movimiento, con su cuenta. |
| Para quién · Búsqueda | "Buscás por unidad, por nombre o por día" | El buscador real es por **nombre, DNI, patente o lote**. |
| Seguridad, FAQ | "Datos tratados según la Ley 25.326" | Pedido explícito. Además la retención y el aviso a la visita están pendientes. |
| Seguridad | `datosAlojamiento` (dónde se alojan los datos) | Placeholder sin respuesta; no prometer nada sobre datos ni backups. |
| Piloto | Precio por unidad y qué incluye | Sin precio en la landing. La prueba gratis de 30 días se queda (confirmada). |
| FAQ | "Qué pasa si se corta internet" | No hay modo sin conexión: la app necesita internet. No se pregunta lo que no se puede responder bien. |
| FAQ | "Por cuánto tiempo se guardan" | No hay job de retención. Se saca la pregunta. |
| FAQ | "Solo necesita un celular con WhatsApp" | La visita necesita un navegador; el link puede llegar por cualquier canal. |
| Footer | Instagram, Términos, Privacidad (placeholders) | No hay. Contacto: ver *Preguntas abiertas*. |

### Se corrige (existe, pero está mal contado)

- **Vertical equivocado en toda la página:** "edificio", "unidad 4°B", "departamento",
  "portería", "SUM", "Contanos de tu edificio o barrio", "Probalo en un edificio". Pazzit es
  para **barrios cerrados**: lote, garita, guardia, barrera.
- **"La visita recibe el pase por WhatsApp"**: el vecino comparte el link con el menú del
  celular (WhatsApp incluido). La visita abre el link, ve quién la invita y el plano con su
  lote marcado, carga su DNI y su patente si quiere, y se queda con el QR.
- **"Pases con vencimiento"**: es real, pero se cuenta con los tipos reales (visita del día,
  frecuente, proveedor con rubro y horario, delivery de una entrada por 2 h) y el cupo.
- **"Sin instalar nada"**: vale para invitar y para el link de la visita. El aviso de paquetes
  por push en iPhone necesita la app agregada a la pantalla de inicio: no prometer "sin
  instalar" en esa línea.
- **Piloto de 30 días gratis**: es una promesa comercial, no una función; confirmada el 9/11.
  Pasa de "en un edificio" a "en tu barrio".

## 2. Qué se puede mostrar (todo existe en `dev`)

| Función | Para la comisión significa | Material |
|---|---|---|
| Invitaciones: visita, frecuente, proveedor, delivery | Nadie entra sin que alguien del barrio lo haya invitado | `vecino-nueva`, `vecino-creada`, video *Invitar* |
| Link de la visita con QR y plano, lote marcado | La visita llega sabiendo a dónde ir | `invitado-pase`, `invitado-plano` |
| Lectora de QR y DNI (HID) o cámara | Ingreso en segundos | `garita`, `garita-ingreso` |
| Veredicto PASA / NO PASA con motivo | La regla la aplica el sistema, no la discusión | `veredicto-pasa`, `veredicto-no-pasa` (retomar: la actual dice "Son las 02:22") |
| Autorizar igual | Las excepciones existen, pero quedan registradas | `fuera-horario` |
| Alta exprés (Autorizar sin invitación) | El que llega sin aviso también queda en orden | `garita-cargar` |
| Rubros con franjas por temporada | Las obras respetan la siesta | `horarios-admin`, `vecino-horario` |
| Seguros de proveedores (padrón por DNI) y de autos (por patente), avisos de vencimiento | Sin póliza vigente, no pasa; y el estado queda guardado en cada ingreso | `seguro-nopasa`, `seguros-admin`, `seguros-autos`, `seguro-link`, video *Seguros* |
| Alerta de permanencia | Se ve quién se quedó más de la cuenta | `garita-lista` |
| Contactos del vecino | Los de siempre, en dos toques | `vecino-contactos` |
| Pase de delivery y aviso de paquetes | Menos llamadas a la garita | `vecino-paquete`, video *Paquetes y delivery* |
| Auditoría con detalle y Excel | "¿Quién lo dejó pasar?" se responde con un archivo | `auditoria-lista`, `auditoria-detalle`, video *Auditoría* |
| Tablero del admin | Lo que importa hoy, apenas abrís | `tablero`, `tablero-alertas` |
| Identidad del barrio (nombre, logo, color de una paleta de 8) | Es la app *de tu barrio* | `color-*`, `config-barrio` |
| Una cuenta por guardia, sesiones revocables, una base por barrio | Trazabilidad real | (texto) |

Capturas en `documentacion/brochure/img/raw/` (barrio ficticio "Los Aromos"). Las que falten se
sacan con el stack local + `demo.sql` / `videos/fuente/reset.sh`, con backup de la base de
desarrollo antes y restauración al terminar.

## 3. Dirección visual: "la barrera"

La landing es **el recorrido de un pase por la barrera**. El pase (ticket con talón y QR,
como en la portada del brochure) es el hilo: aparece en el hero, se "escanea" en el medio y
termina sellado con la hora de ingreso y el guardia en el cierre.

- **Paleta:** navy `#0B1640` como fondo de las secciones fuertes, `#F3F6FF` de papel, azul
  `#2F5BFF` para acción y énfasis de texto. **Sol `#FFC933`: una sola cosa por pantalla**
  (el talón del QR en el hero, el resultado de la calculadora en su sección, el CTA en el
  cierre). Excepción aceptada: el hero repite la carátula del brochure, con "en orden." y el
  talón en sol.
- **Veredictos con los colores de la app**, no con los de marca: PASA y NO PASA se muestran
  como son (pantalla completa, bordó para NO PASA). Es lo más reconocible del producto.
- **Tipografía:** solo Onest. Display en 800 muy apretado (como "La barrera de tu barrio, en
  orden."), texto en 400/500. Números tabulares en horas, patentes y DNI. Se saca Bagel Fat One.
- **Capturas reales** dentro de marcos simples (celular a 390 px, garita a 1280 px). Nada de
  mockups 3D ni pantallas inventadas: si se dibuja una UI en HTML (para animarla), copia
  textos y estados reales de la app.
- **Lo que evita lo genérico:** nada de grillas de 3 íconos con título y bajada, gradientes
  violetas, "trusted by" ni testimonios. El ritmo lo dan las escenas "Hoy / Con Pazzit" y
  piezas grandes (el veredicto a pantalla completa, el resultado de la calculadora a 200 px).
- Sin toggle de tema: las secciones navy y papel ya alternan; menos superficie que mantener.

## 4. Estructura

| # | Sección | Contenido | Movimiento |
|---|---|---|---|
| 1 | **Hero** (variante E, la carátula del brochure) | Navy con grilla suave · "La barrera de tu barrio, **en orden.**" (en sol) · bajada del brochure · demo con dos campos (barrio y contacto) · el pase de Rosa Benítez inclinado, con el talón sol y el QR cortándose en el borde derecho · franja inferior: "Control de acceso para barrios cerrados." y "Probalo gratis 30 días". **Sin las 52 h** (decisión del 9/11). | El pase entra, se marca la perforación, el talón se desprende y aparece el sello "Ingresó 18:42 · Ramón Sosa". Hover/tap lo repite. |
| 2 | **Lo que hoy pasa en la barrera** | Los 4 dolores en una frase cada uno, sobre el cuaderno | Las líneas del cuaderno se tachan a medida que se scrollea; cada dolor queda como ancla a su sección. |
| 3 | **Cómo funciona** | Invita → recibe su QR con el plano → la guardia escanea → queda registrado | Sección **pinned** en desktop: un celular y la pantalla de la garita; el pase "viaja" del celular a la lectora y aparece el veredicto PASA. En celular, pasos apilados sin pin. |
| 4 | **¿Quién lo dejó pasar?** | Auditoría: buscar por nombre, DNI, patente o lote; detalle con guardia, vecino, vehículo y seguro de ese día; Excel | Se tipea una patente en el buscador y se filtra la lista real; se abre el panel de detalle. |
| 5 | **Reglas que se cumplen** | Rubros y franjas por temporada; NO PASA · Fuera de horario; Autorizar igual con registro; alerta de permanencia | Un reloj avanza 16:59 → 17:01 y el veredicto pasa de PASA a NO PASA. |
| 6 | **Seguros** | Proveedor sin póliza vigente no pasa; la carga el proveedor desde su link o la guardia; auto por patente; pantalla de seguros y avisos; estado guardado en cada ingreso | Una póliza "vence" (barra de fecha) y la garita cambia sola; después se ve la lista ordenada por vencimiento. |
| 7 | **Guardia saturada → horas que vuelven** | Lectora QR/DNI, alta exprés, delivery anunciado, listas por estado. Después, la **sección de ahorro**: la comisión elige cuántos ingresos por día tiene su barrio y ve las horas de guardia por mes que se recuperan, con **la cuenta a la vista**: ingresos × (2 min − 15 s) × 30 días = horas por mes = jornadas de 8 h. Ejemplos: 30 → ≈ 26 h, 60 → ≈ 52 h, 120 → ≈ 105 h. | Calculadora con slider (30 / 60 / 120 y libre): el resultado y cada término de la cuenta se interpolan al moverlo. Supuestos debajo, en texto. Las 52 h solo aparecen acá, como resultado del ejemplo de 60. |
| 8 | **Para el vecino** | Contactos, delivery en un toque, aviso de paquetes, el plano con el lote | Tira horizontal de 4 capturas de celular que entran escalonadas. |
| 9 | **La administración, con todo a la vista** | Tablero, configuración (Barrio, Garita, Seguros), identidad del barrio | El color del barrio cambia entre los 8 de la paleta y la app se re-tiñe (`--marca-base`). |
| 10 | **Por qué Pazzit** | La comparativa de 3 columnas del brochure, y una cuenta por guardia / sesiones revocables / una base por barrio | Sin animación: es para leer. |
| 11 | **Cierre** | "Pasá nomás." · prueba gratis 30 días · puesta en marcha en una semana (línea de tiempo) · formulario de demo · mail y WhatsApp · link al canal de YouTube | El pase vuelve y queda sellado; la línea de tiempo se completa al entrar. |

Nav: Cómo funciona · Seguros · Horas de guardia · Pedí una demo.

## 5. Animación

**Prioridad: animaciones atractivas y sin cambios bruscos.** La página tiene que sentirse
cuidada y fluida; nada aparece, cambia de color o salta de golpe.

- **Con intención:** cada movimiento muestra una regla o un paso del producto (veredicto,
  vencimiento, búsqueda). Nada se mueve solo para decorar.
- **Sin cortes:** todo cambio de estado es una transición, nunca un reemplazo instantáneo.
  - El veredicto PASA → NO PASA no "flashea" de verde a bordó: el bordó entra como un barrido
    (`clip-path` o `scale` de una capa encima) de ~500 ms, y el texto hace crossfade con un
    leve desplazamiento vertical.
  - Los números (la calculadora, el reloj 16:59 → 17:01) se interpolan; los dígitos se
    deslizan en vez de reemplazarse.
  - Las capturas entran con opacidad + desplazamiento corto (12–24 px) + escala sutil
    (0,98 → 1). Nunca desde fuera de pantalla ni con rebote.
  - En las secciones ligadas al scroll, el progreso sigue al scroll de forma continua
    (scrubbing), sin saltos entre pasos; si un paso tiene que "cambiar", se cruza con el
    anterior.
- **Curvas y tiempos:** ease-out fuerte para entradas (`cubic-bezier(0.22, 1, 0.36, 1)`),
  ease-in-out para cambios de estado; 300–600 ms para entradas, 150–250 ms para
  microinteracciones, escalonado de 50–80 ms entre elementos de un grupo. Nada lineal
  salvo lo que va con el scroll.
- **Interrumpibles:** si el usuario scrollea o toca a mitad de una animación, sigue desde
  donde está (transiciones CSS, no keyframes que reinician). Hover que entra y sale rápido
  no deja la pieza a medio camino.
- **Sin saltos de layout:** cada pieza animada reserva su espacio desde el principio; lo que
  aparece no empuja al resto.
- **Técnica, de menor a mayor:** CSS + el `InView` que ya existe (IntersectionObserver que
  pone `data-inview`). Scroll-driven animations de CSS (`animation-timeline: view()`) donde
  hace falta progreso con scroll, con fallback a la aparición simple. Sin GSAP ni Framer
  Motion salvo que la sección pinned lo pida de verdad; se decide al prototiparla.
- **Solo transform y opacity** en lo que corre durante el scroll; nada de animar alto, blur
  ni sombras grandes.
- **Celular:** sin pin ni scroll-jacking; las secciones fijadas se convierten en pasos
  apilados que se animan al aparecer. El scroll nativo nunca se intercepta.
- **`prefers-reduced-motion`:** todo queda en su estado final, sin transiciones de entrada;
  la calculadora y los controles siguen andando.
- Microinteracciones: press en botones, el pase que responde al hover, el slider de la
  calculadora con números tabulares que no saltan.

## 6. Técnica

- Se queda el stack: Next.js 16 con export estático (`out/`), Tailwind v4, el `Dockerfile` y
  `scripts/serve.mjs`. Leer `AGENTS.md` y `node_modules/next/dist/docs/` antes de usar una API
  de Next.
- Se reusan `lib/demo.ts` (envío del formulario, con sus tests), `scripts/icons.mjs` y
  `scripts/shots.mjs`. El resto de `components/` se reescribe.
- `lib/site.ts` queda solo con lo que existe (URL, contacto, canal de YouTube).
- Capturas en `public/capturas/` como WebP con ancho fijo y `loading="lazy"` fuera del hero.
- Verificación: `npm test`, `npm run build`, `npm run shots` (sin scroll horizontal a 390,
  768, 1280 y 1440) y Lighthouse móvil ≥ 95 en performance.

## 7. SEO

El SEO manda sobre el efecto: si una animación compite con el contenido indexable o con las
Core Web Vitals, gana el contenido.

**Búsquedas objetivo** (español de Argentina; la gente busca "country" y "barrio privado"
tanto como "barrio cerrado"):

| Intención | Frases |
|---|---|
| Principal | control de acceso para barrios cerrados · sistema de ingreso para countries · invitaciones con QR para barrio privado |
| Por dolor | registro de visitas barrio cerrado · control de seguros de proveedores · horarios de proveedores en el barrio · software para la guardia / garita |
| Marca | Pazzit |

Van en el `title`, el `h1` o la bajada, los `h2` de cada sección y el `alt` de las capturas,
escritas como frases naturales: nada de relleno de palabras clave.

**Técnico:**
- HTML completo en el export estático: todo el texto está en el HTML y es texto, no imagen.
  Un solo `h1` y un `h2` por sección; `lang="es-AR"`.
- **Nada se oculta sin JS.** El estado inicial de las animaciones de entrada (opacidad 0,
  desplazamiento) se aplica solo bajo una clase que pone el JS; sin JS, o para un crawler que
  no ejecuta scripts, el contenido queda visible en su estado final.
- `metadata` de Next: `title` ("Pazzit · Control de acceso con QR para barrios cerrados"),
  `description` de ~150 caracteres, `alternates.canonical` a `https://pazzit.com`, Open Graph
  y Twitter con `og.png` (el pase de Los Aromos), `locale: es_AR`.
- `app/sitemap.ts` y `app/robots.ts` (rutas de metadata de Next, compatibles con el export).
- JSON-LD: `Organization` (nombre, logo, mail, teléfono, el canal de YouTube en `sameAs`) y
  `SoftwareApplication` (categoría `BusinessApplication`, sin precio ni ratings inventados).
- Core Web Vitals: el LCP es el titular (texto, con la fuente de `next/font`), no una imagen;
  imágenes con `width`/`height` y en WebP; las animaciones usan transform/opacity y no mueven
  el layout (CLS 0); sin JS de terceros al cargar. Objetivo Lighthouse móvil: 95+ en
  performance y 100 en SEO y accesibilidad.
- `www.pazzit.com` redirige con 301 a `pazzit.com`, siempre HTTPS.
- **qa no compite:** `qa.pazzit.com` con `X-Robots-Tag: noindex` (ya está en el Caddyfile por
  variable; confirmar que está activa en qa).
- Al publicar: Google Search Console con el dominio verificado y el sitemap enviado.

**Más páginas = más búsquedas.** Una sola página posiciona para un grupo de frases. Fase 2 (a
decidir después del prototipo): páginas propias por dolor, armadas con las mismas secciones y
textos más largos, por ejemplo `/control-de-seguros-de-proveedores`,
`/registro-de-ingresos` y `/horarios-de-proveedores`.

## 8. Proceso

1. **Este spec**, con las decisiones del 9/11.
2. **Prototipo:** el hero y la sección 5 (*Reglas*, el reloj que cambia el veredicto)
   funcionando en `npm run dev`, con la skill impeccable y las de animación. Se revisa con
   el dueño antes de seguir.
3. **Plan** (`docs/superpowers/plans/`, < 300 líneas) con el resto de las secciones.
4. Construcción por sección, capturas nuevas si faltan, revisión final con impeccable.

## Decisiones (9/11)

- **CTA:** "Pedí una demo" con el formulario actual (nombre, rol, barrio, lotes, contacto).
  Los pedidos van a **Formspree** por `NEXT_PUBLIC_DEMO_ENDPOINT`: `lib/demo.ts` ya manda JSON
  y el fallback sin JS hace el POST nativo, que es lo que Formspree acepta. No va a la API de
  Pazzit: cada despliegue es un barrio y la landing no es de ninguno.
- **Contacto:** mail y WhatsApp/teléfono en el cierre y el pie (valores pendientes).
- **Oferta:** prueba gratis de **30 días**, puesta en marcha en **una semana** (con la línea de
  tiempo del brochure) y demo en vivo con el barrio ficticio Los Aromos, en la reunión. No se
  publica un link a qa.
- **Deploy:** `pazzit.com` en Coolify, con el `Dockerfile` actual.
- **Videos:** solo un link al canal (https://www.youtube.com/@pazz-it) en el cierre; no se
  embeben.
- **Titular:** "La barrera de tu barrio, en orden."
- **Contacto:** sin mail ni teléfono públicos por ahora (pedido del dueño, 9/11): el único canal es el formulario de demo, más el link a YouTube. Cuando haya un mail de pazzit.com, se suma en `lib/site.ts`.
- **SEO es prioridad** (ver la sección 7).
- **Animaciones atractivas y sin cambios bruscos** (ver la sección 5).
- **Palabras del veredicto:** las de la app: **INGRESO** (verde claro) y **NO PASA** (bordó); "PASA" no existe en la garita. Donde este spec dice PASA, va INGRESO.
- **Animaciones con scroll** (pedido del 9/11): el hero y las escenas responden al scroll de forma continua (`lib/progreso.ts`, un listener pasivo que escribe `--p`). En celular también hay escenas fijas (sticky), más cortas; el scroll nunca se intercepta.
- **Prototipo:** hero (variante E) + Reglas en la rama `feat/landing-v2`.
- **Menos capturas y menos colores** (9/11): capturas solo en *Cómo funciona* (4 pasos) y la escena HTML de *Reglas*; *Quién lo dejó pasar*, *Seguros*, *Guardia*, *Vecino* y *Administración* son texto. Las secciones alternan solo navy y papel; el detalle visual está en el brochure.
- **Brochure descargable:** link en el hero a `/pazzit-brochure.pdf` (el PDF de noviembre con la carátula sin las 52 h).
- **Botón para volver arriba:** aparece después del hero.

## Pendiente

- Formspree: `https://formspree.io/f/xdeeqokv` en `.env.local` y como build arg en Coolify.
- El mail definitivo de pazzit.com.
