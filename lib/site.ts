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
