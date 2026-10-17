# Pazzit, landing

Landing estática de Pazzit (Next.js + Tailwind CSS). Todo el movimiento es CSS; el JS marca cuándo entra cada bloque en pantalla (`components/InView.tsx`) y maneja el formulario, el slider con el nombre en vivo, el cambio de tema, el menú móvil, la repetición del pase y los rituales al entrar en pantalla.

## Requisitos

- Node 24 (probado con Node 24.12.0; no probé versiones anteriores). `npm test` corre `lib/demo.test.ts` directo con `node --test`, así que depende del soporte de TypeScript de Node.

## Comandos

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # tests de validación y envío del formulario
npm run build    # genera out/, el sitio estático listo para subir a cualquier hosting
npm start        # sirve out/ en http://localhost:3000 (PORT cambia el puerto). Necesita npm run build antes
npm run icons    # regenera icon-32, icon-192, icon-512, apple-touch-icon.png y og.png desde public/brand/
npm run shots    # sirve out/, chequea scroll horizontal y guarda capturas en screenshots/. Necesita npm run build antes y el chromium de Playwright (npx playwright install chromium)
```

`npm start` no es un servidor de desarrollo: sirve con gzip los archivos de texto y pone caché larga a `/_next/static/`, como un hosting estático.

## Variables de entorno

Crealas en `.env.local`:

```
NEXT_PUBLIC_DEMO_ENDPOINT=https://tu-endpoint
NEXT_PUBLIC_SITE_URL=https://tu-dominio
```

- `NEXT_PUBLIC_DEMO_ENDPOINT` recibe un `POST` con JSON `{ nombre, rol, lugar, unidades, contacto, origen: "landing" }` y tiene que responder 2xx. `unidades` va como número, o como `null` si el campo está vacío. Sirve cualquier servicio de formularios (Formspree, Getform, una función propia). Sin la variable, en `npm run dev` el envío se simula; en producción se muestra el mensaje de error con el email.
- El campo trampa (honeypot) se llama `website` en el HTML y no viaja en ese JSON. Si viene completado, el envío responde éxito sin hacer ningún request.
- Sin JavaScript, el formulario no usa ese JSON: el navegador hace el POST nativo del `<form>` al mismo endpoint, con los campos como formulario (`nombre`, `rol`, `lugar`, `unidades`, `contacto`, `website`).
- `NEXT_PUBLIC_SITE_URL` es la URL pública, para la imagen de Open Graph.

Las dos se leen al compilar: después de cambiarlas, volvé a correr `npm run build`.

## Antes de publicar

- [ ] Definir `NEXT_PUBLIC_SITE_URL`.
- [ ] Definir `NEXT_PUBLIC_DEMO_ENDPOINT`. Sin él, el formulario muestra error en producción y el fallback sin JS postea a la propia página.
- [ ] Completar todos los placeholders de `lib/site.ts`.

## Placeholders

Todos viven en `lib/site.ts`. Cambiá el valor y se actualiza en toda la página. Solo `email`: si empieza con `[` se considera sin completar y el footer lo muestra como texto, sin link. Instagram, Términos y Privacidad se vuelven links únicamente cuando su `*Url` no es `null`; si no, se muestran como texto.

| clave | dónde aparece |
|---|---|
| `url` | no es un placeholder: sale de `NEXT_PUBLIC_SITE_URL` y se usa como `metadataBase` (Open Graph) |
| `email` | footer y mensaje de error del formulario |
| `instagram`, `instagramUrl` | footer (con URL se vuelve link) |
| `precio`, `precioIncluye` | sección del piloto |
| `plazoRespuesta` | mensaje de éxito del formulario ("…en menos de [PLAZO].") |
| `terminosUrl`, `privacidadUrl` | footer (con URL se vuelven links) |
| `datosAlojamiento` | seguridad y privacidad |
| `faq.offline`, `faq.altaVecinos`, `faq.retencion`, `faq.implementacion` | preguntas frecuentes |

Los datos de ejemplo de las ilustraciones (Juan Pérez, la unidad 4°B, el registro del sábado 18) están en `components/Pass.tsx`, `components/sections/ComoFunciona.tsx`, `components/sections/ParaQuien.tsx` y `components/sections/Seguridad.tsx`, y son ficticios a propósito.

## Fuentes

- **Onest** (400, 600, 700, 800) se carga con `next/font/google` en `app/layout.tsx`.
- **Bagel Fat One** no sale de Google en tiempo de ejecución. Se usa un archivo local, `app/fonts/bagel-fat-one-pasa-nomas.woff2` (4 kB, licencia OFL), recortado a los glifos de "pasá nomás". Se carga con `next/font/local` y su único uso es la frase de la banda final (`components/sections/BandaFinal.tsx`).
- Si cambiás esa frase, los caracteres nuevos no salen en Bagel Fat One y hay que regenerar el archivo. No hay script en el repo. Los pasos: abrir `https://fonts.googleapis.com/css2?family=Bagel+Fat+One&text=pas%C3%A1%20nom%C3%A1s` con el texto de la frase nueva en `text=`, copiar la URL del `src` del `@font-face` (el `.woff2`), bajarla y guardarla en `app/fonts/` con el mismo nombre. Si cambiás el nombre del archivo, actualizá también la ruta en `app/layout.tsx`.

## Logos

`public/brand/` tiene los SVG originales del manual: no se editan ni se recolorean. Van siempre como `<img>`, porque todos comparten `mask id="m1"` y puestos inline en la misma página chocarían.
