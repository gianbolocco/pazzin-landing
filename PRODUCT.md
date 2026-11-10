# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

La comisión directiva y la administración de barrios cerrados, countries y barrios privados de
Argentina: deciden y pagan. Llegan evaluando cómo ordenar la barrera (quién entra, con qué
reglas, con qué respaldo). Vecinos y guardia son beneficiarios, no el lector.

## Product Purpose

Pazzit son invitaciones con QR y control de acceso para un barrio cerrado: el vecino invita, la
visita recibe su pase con el plano y el lote marcado, la guardia escanea (lectora de QR y DNI o
cámara) y cada ingreso queda registrado con quién lo dejó pasar. Una instalación por barrio,
con su nombre, logo y color. La landing existe para que la comisión pida una demo.

## Positioning

Hecho para la barrera, no una app de administración con un módulo de accesos agregado: la
garita da un veredicto PASA / NO PASA con su motivo, aplica las reglas por rubro y horario
(con temporadas) y controla el seguro del proveedor y del auto en el momento del ingreso,
guardando cómo estaba cada seguro ese día.

## Operating Context

- La app vive en el repo hermano `../invitacionesQR` (rama `dev`): su README es la fuente de
  verdad de qué existe.
- Barrio ficticio de demostración: "Los Aromos" (`api/scripts/demo.sql`).
- Narrativa comercial validada en el brochure de noviembre 2026
  (`../documentacion/brochure/spec.md`, `paginas.js`): cuatro dolores (¿quién lo dejó pasar?,
  reglas que no se cumplen, proveedores sin seguro, guardia saturada) y las ≈ 52 horas de
  guardia por mes que vuelven a la vigilancia (60 ingresos/día, de 2 min a 15 s; supuestos a
  la vista).

## Capabilities and Constraints

- Funciones reales: invitaciones (visita, frecuente, proveedor, delivery), link de la visita
  con QR y plano, lectora QR/DNI, veredicto con motivo, Autorizar igual, alta exprés, rubros y
  franjas por temporada, seguros de proveedores y autos con avisos, alerta de permanencia,
  contactos del vecino, pase de delivery, aviso de paquetes por push, auditoría con Excel,
  tablero del admin, identidad del barrio.
- **No existe** (no mostrar): aviso al vecino cuando llega su visita, modo sin conexión,
  entradas múltiples, retención/anonimización de datos, ruta en el plano.
- Oferta confirmada: prueba gratis de 30 días, puesta en marcha en una semana, demo en vivo con
  datos ficticios.
- Stack: Next.js 16 export estático + Tailwind v4, desplegado en Coolify en `pazzit.com`.
- SEO es prioridad.

## Brand Commitments

- Nombre: Pazzit. Logos en `public/brand/` (no se editan ni recolorean).
- Navy `#0B1640`, azul `#2F5BFF`, sol `#FFC933` (una sola cosa por pantalla); letra Onest.
- El pase (ticket con talón y QR) es el motivo visual.
- Voseo rioplatense, frases cortas, hablándole a la comisión.
- No poner: precio, "cumple la Ley 25.326", barrios reales como clientes (Álamo Alto
  incluido), promesas sobre backups.

## Evidence on Hand

- Capturas reales de Los Aromos: `../documentacion/brochure/img/raw/`; composiciones en
  `../documentacion/brochure/img/`.
- Videos: `../documentacion/videos/` y https://www.youtube.com/@pazz-it.
- No hay clientes, testimonios, métricas de uso ni certificaciones: no se inventan.

## Product Principles

1. Solo lo que existe: cada promesa se puede mostrar en la app.
2. Orden en la barrera: la primera impresión es control y tranquilidad, no tecnología.
3. Mostrar, no afirmar: la app trabajando (veredicto, búsqueda, vencimiento) vale más que un
   adjetivo.
4. Cálido pero serio: ni SaaS genérico, ni corporativo frío, ni movimiento que tape el mensaje.

## Accessibility & Inclusion

Respetar `prefers-reduced-motion`; los veredictos se distinguen por luminancia y texto, no solo
por tono (como en la app).
