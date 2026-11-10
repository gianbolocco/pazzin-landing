# Pazzit, landing

Landing estática de pazzit.com (Next.js 16 con export estático + Tailwind CSS v4). Le habla a la
comisión directiva y a la administración del barrio, con la narrativa del brochure: cuatro dolores y
cómo los resuelve Pazzit, con capturas reales de la app (barrio ficticio Los Aromos).

Qué se decidió y por qué: `docs/superpowers/specs/2026-11-09-landing-v2-design.md`. Solo se muestran
funciones que existen en la app (`../invitacionesQR`, rama `dev`).

## Comandos

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # validación del formulario (lib/demo) y la cuenta de horas (lib/horas)
npm run build      # genera out/, el sitio estático
npm start          # sirve out/ en http://localhost:3000 (PORT cambia el puerto). Necesita build
npm run capturas   # convierte las capturas del brochure a WebP en public/capturas/
npm run icons      # regenera los íconos y og.png desde public/brand/
npm run shots      # sirve out/, chequea scroll horizontal (320 a 1440 y zoom 200 %) y guarda capturas en screenshots/
```

Node 24: `npm test` corre los `.test.ts` directo con `node --test`.

## Variables de entorno

En `.env.local` y como build args en Coolify (se leen al compilar):

```
NEXT_PUBLIC_DEMO_ENDPOINT=https://formspree.io/f/xdeeqokv
NEXT_PUBLIC_SITE_URL=https://pazzit.com
```

- `NEXT_PUBLIC_DEMO_ENDPOINT` recibe un `POST` JSON `{ nombre, rol, lugar, lotes, contacto, origen: "landing" }`.
  El pedido corto del hero manda solo `lugar` y `contacto`. Sin JS, el `<form>` postea directo al endpoint.
  Ojo: con la variable puesta, también en `npm run dev` los envíos llegan de verdad.
- `NEXT_PUBLIC_SITE_URL` es la URL pública: canonical, Open Graph, sitemap y JSON-LD.

## Contacto

Por ahora no hay mail ni teléfono públicos: el contacto es el formulario. El link a YouTube está en `lib/site.ts`.

## Cómo está armado el movimiento

- `lib/progreso.ts`: un listener de scroll pasivo escribe `--p` (0→1) en cada escena. Nunca intercepta el scroll.
- Escenas fijas (sticky): *Reglas* (el reloj y el veredicto INGRESO → NO PASA) y `components/Pasos.tsx`
  (*Cómo funciona* y *Seguros*).
- El resto aparece con `animation-timeline: view()` dentro de `@supports`; sin soporte queda visible y quieto.
- El pase del hero (`components/Pase.tsx`) tiene su secuencia en CSS: escaneo, corte del talón y sello.
  `PaseVivo` la repite al pasar el mouse o tocarlo.
- Con `prefers-reduced-motion`, todo queda en su estado final; los cambios de estado siguen, sin desplazamientos.
- Sin JS, el contenido se ve completo: la clase `.js` (que activa los estados atenuados) la pone el script del
  `<head>` y se saca sola si la página no hidrata en 3 s.

## Capturas

Salen de `../documentacion/brochure/img/raw/`, que se regeneran con el brochure (ver su `spec.md`).
Después de regenerarlas, `npm run capturas`.

## Logos

`public/brand/` tiene los SVG del manual: no se editan ni se recolorean. Van como `<img>` (comparten
`mask id="m1"` y puestos inline en la misma página chocarían). Sobre navy va `pazzit-lockup-oscuro.svg`.
