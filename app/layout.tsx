import type { Metadata, Viewport } from "next";
import { Onest } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";
import "./landing.css";
import "./secciones.css";

const onest = Onest({ subsets: ["latin"], weight: ["400", "600", "700", "800"], display: "swap", variable: "--font-onest" });

const title = "Pazzit · Control de acceso con QR para barrios cerrados";
const description =
  "Invitaciones con QR, horarios por rubro, seguros de proveedores controlados en la barrera y el registro de cada ingreso. Para barrios cerrados, countries y barrios privados.";

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
    { color: "#0B1640" },
  ],
};

// Antes del primer paint: marca que hay JS. Si en 3 s no hidrató (lib/progreso.ts pone .io), la saca y queda todo visible.
const JS_SCRIPT = `(function(){var d=document.documentElement;d.classList.add('js');setTimeout(function(){if(!d.classList.contains('io'))d.classList.remove('js')},3000)})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={onest.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: JS_SCRIPT }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
